// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "./base.sol"; // Base contracts (Chained, Owned)
import "./common.sol"; // Common interface for retro compatibility
import "./lib.sol"; // Helpers
import "./ERC20Mock.sol";

contract Processes is IProcessStore, Chained {
    using SafeUint8 for uint8;

    // CONSTANTS AND ENUMS
    enum CensusOrigin {
        __, // 0
        OFF_CHAIN_TREE, // 1
        OFF_CHAIN_TREE_WEIGHTED, // 2
        OFF_CHAIN_CA, // 3
        __4,
        __5,
        __6,
        __7,
        __8,
        __9,
        __10,
        ERC20, // 11
        ERC721, // 12
        ERC1155, // 13
        ERC777, // 14
        MINI_ME // 15
    } // 256 items max

    /*
    Process Mode flags
    The process mode defines how the process behaves externally. It affects both the Vochain, the contract itself, the metadata and the census origin.

    0b00001111
          ||||
          |||`- autoStart
          ||`-- interruptible
          |`--- dynamicCensus
          `---- encryptedMetadata
    */
    uint8 internal constant MODE_AUTO_START = 1 << 0;
    uint8 internal constant MODE_INTERRUPTIBLE = 1 << 1;
    uint8 internal constant MODE_DYNAMIC_CENSUS = 1 << 2;
    uint8 internal constant MODE_ENCRYPTED_METADATA = 1 << 3;

    /*
    Envelope Type flags
    The envelope type tells how the vote envelope will be formatted and handled. Its value is generated by combining the flags below.

    0b00001111
          ||||
          |||`- serial
          ||`-- anonymous
          |`--- encryptedVote
          `---- uniqueValues
    */
    uint8 internal constant ENV_TYPE_SERIAL = 1 << 0; // Questions are submitted one by one
    uint8 internal constant ENV_TYPE_ANONYMOUS = 1 << 1; // ZK Snarks are used
    uint8 internal constant ENV_TYPE_ENCRYPTED_VOTES = 1 << 2; // Votes are encrypted with the process public key
    uint8 internal constant ENV_TYPE_UNIQUE_VALUES = 1 << 3; // Choices for a question cannot appear twice or more

    // GLOBAL DATA

    uint32 public ethChainId; // Used to salt the process ID's so they don't collide within the same entity on another chain. Could be computed, but not all development tools support that yet.
    uint32 public namespaceId; // Index of the namespace where this contract has been assigned to
    address public namespaceAddress; // Address of the namespace contract instance that holds the current state
    address public resultsAddress; // The address of the contract that will hold the results of the processes from the current instance
    address public tokenStorageProofAddress; // Address of the storage proof contract, used to query ERC token balances and proofs
    uint256 public processPrice; // Price for creating a voting process

    // DATA STRUCTS
    struct Process {
        uint8 mode; // The selected process mode. See: https://vocdoni.io/docs/#/architecture/smart-contracts/process?id=flags
        uint8 envelopeType; // One of valid envelope types, see: https://vocdoni.io/docs/#/architecture/smart-contracts/process?id=flags
        CensusOrigin censusOrigin; // How the census proofs are computed (Off-chain vs EVM Merkle Tree)
        address entity; // The address of the Entity (or contract) holding the process
        uint32 startBlock; // Vochain block number on which the voting process starts
        uint32 blockCount; // Amount of Vochain blocks during which the voting process should be active
        string metadata; // Content Hashed URI of the JSON meta data (See Data Origins)
        string censusRoot; // Hex string with the Census Root. Depending on the census origin, it will be a Merkle Root or a public key.
        string censusUri; // Content Hashed URI of the exported Merkle Tree (not including the public keys)
        Status status; // One of 0 [ready], 1 [ended], 2 [canceled], 3 [paused], 4 [results]
        uint8 questionIndex; // The index of the currently active question (only assembly processes)
        // How many questions are available to vote
        // questionCount >= 1
        uint8 questionCount;
        // How many choices can be made for each question.
        // 1 <= maxCount <= 100
        uint8 maxCount;
        // Determines the acceptable value range.
        // N => valid votes will range from 0 to N (inclusive)
        uint8 maxValue;
        uint8 maxVoteOverwrites; // How many times a vote can be replaced (only the last one counts)
        // Limits up to how much cost, the values of a vote can add up to (if applicable).
        // 0 => No limit / Not applicable
        uint16 maxTotalCost;
        // Defines the exponent that will be used to compute the "cost" of the options voted and compare it against `maxTotalCost`.
        // totalCost = Σ (value[i] ** costExponent) <= maxTotalCost
        //
        // Exponent range:
        // - 0 => 0.0000
        // - 10000 => 1.0000
        // - 65535 => 6.5535
        uint16 costExponent;
        uint256 evmBlockHeight; // EVM block number to use as a snapshot for the on-chain census
        bytes32 paramsSignature; // entity.sign({...}) // fields that the oracle uses to authentify process creation
    }

    /// @notice An entry for each process created by an Entity.
    /// @notice Keeps track of when it was created and what index this process has within the entire history of the Entity.
    /// @notice Use this to determine whether a process index belongs to the current instance or to a predecessor one.
    struct ProcessCheckpoint {
        uint256 index; // The index of this process within the entity's history, including predecessor instances
    }

    // PER-PROCESS DATA

    mapping(address => ProcessCheckpoint[]) internal entityCheckpoints; // Array of ProcessCheckpoint indexed by entity address
    mapping(bytes32 => Process) internal processes; // Mapping of all processes indexed by the Process ID

    // HELPERS

    function getEntityProcessCount(address entityAddress)
        public
        view
        override
        returns (uint256)
    {
        if (entityCheckpoints[entityAddress].length == 0) {
            // Not found locally
            if (predecessorAddress == address(0x0)) return 0; // No predecessor to ask

            // Ask the predecessor
            // Note: The predecessor's method needs to follow the old version's signature
            IProcessStore predecessor = IProcessStore(predecessorAddress);
            return predecessor.getEntityProcessCount(entityAddress);
        }

        return
            entityCheckpoints[entityAddress][
                entityCheckpoints[entityAddress].length - 1
            ]
                .index + 1;
    }

    /// @notice Get the next process ID to use for an entity
    function getNextProcessId(address entityAddress)
        public
        view
        override
        returns (bytes32)
    {
        // From 0 to N-1, the next index is N
        uint256 processCount = getEntityProcessCount(entityAddress);
        return
            getProcessId(entityAddress, processCount, namespaceId, ethChainId);
    }

    /// @notice Compute the process ID from the given parameters, salted with the contract chain ID
    function getProcessId(
        address entityAddress,
        uint256 processCountIndex,
        uint32 namespaceIdNum,
        uint32 ethereumChainId
    ) public pure override returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    entityAddress,
                    processCountIndex,
                    namespaceIdNum,
                    ethereumChainId
                )
            );
    }

    // GLOBAL METHODS

    /// @notice Creates a new instance of the contract and sets the contract owner (see Owned).
    /// @param predecessor The address of the predecessor instance (if any). `0x0` means no predecessor (see Chained).
    constructor(
        address predecessor,
        address namespace,
        address resultsAddr,
        address tokenStorageProof,
        uint32 ethereumChainId,
        uint256 procPrice
    ) {
        Chained.setUp(predecessor);

        require(ContractSupport.isContract(namespace), "Invalid namespace");
        require(ContractSupport.isContract(resultsAddr), "Invalid results");
        require(
            ContractSupport.isContract(tokenStorageProof),
            "Invalid tokenStorageProof"
        );

        namespaceId = INamespaceStore(namespace).register();
        namespaceAddress = namespace;
        resultsAddress = resultsAddr;
        tokenStorageProofAddress = tokenStorageProof;
        ethChainId = ethereumChainId;
        processPrice = procPrice;
    }

    // GETTERS

    /// @notice Retrieves all the stored fields for the given processId
    function get(bytes32 processId)
        public
        view
        override
        returns (
            uint8[3] memory mode_envelopeType_censusOrigin, // [mode, envelopeType, censusOrigin]
            address entityAddress,
            string[3] memory metadata_censusRoot_censusUri, // [metadata, censusRoot, censusUri]
            uint32[2] memory startBlock_blockCount, // [startBlock, blockCount]
            Status status, // status
            uint8[5]
                memory questionIndex_questionCount_maxCount_maxValue_maxVoteOverwrites, // [questionIndex, questionCount, maxCount, maxValue, maxVoteOverwrites]
            uint16[2] memory maxTotalCost_costExponent,
            uint256 evmBlockHeight
        )
    {
        if (processes[processId].entity == address(0x0)) {
            // Not found locally
            if (predecessorAddress == address(0x0)) revert("Not found"); // No predecessor to ask

            // Ask the predecessor
            // Note: The predecessor's method needs to follow the old version's signature
            IProcessStore predecessor = IProcessStore(predecessorAddress);
            return predecessor.get(processId);
        }

        Process storage proc = processes[processId];
        mode_envelopeType_censusOrigin = [
            proc.mode,
            proc.envelopeType,
            uint8(proc.censusOrigin)
        ];
        entityAddress = proc.entity;
        metadata_censusRoot_censusUri = [
            proc.metadata,
            proc.censusRoot,
            proc.censusUri
        ];
        startBlock_blockCount = [proc.startBlock, proc.blockCount];
        status = proc.status;
        questionIndex_questionCount_maxCount_maxValue_maxVoteOverwrites = [
            proc.questionIndex,
            proc.questionCount,
            proc.maxCount,
            proc.maxValue,
            proc.maxVoteOverwrites
        ];
        maxTotalCost_costExponent = [proc.maxTotalCost, proc.costExponent];
        evmBlockHeight = proc.evmBlockHeight;
    }

    /// @notice Gets the signature of the process parameters, so that authentication can be performed on the Vochain as well
    function getParamsSignature(bytes32 processId)
        public
        view
        override
        returns (bytes32)
    {
        if (processes[processId].entity == address(0x0)) {
            // Not found locally
            if (predecessorAddress == address(0x0)) revert("Not found"); // No predecessor to ask

            // Ask the predecessor
            // Note: The predecessor's method needs to follow the old version's signature
            IProcessStore predecessor = IProcessStore(predecessorAddress);
            return predecessor.getParamsSignature(processId);
        }
        Process storage proc = processes[processId];
        return proc.paramsSignature;
    }

    /// @notice Gets the address of the process instance where the given processId was originally created.
    /// @notice This allows to know where to send update transactions, after a fork has occurred.
    function getCreationInstance(bytes32 processId)
        public
        view
        override
        returns (address)
    {
        if (processes[processId].entity == address(0x0)) {
            // Not found locally
            if (predecessorAddress == address(0x0)) revert("Not found"); // No predecessor to ask

            // Ask the predecessor
            // Note: The predecessor's method needs to follow the old version's signature
            IProcessStore predecessor = IProcessStore(predecessorAddress);
            return predecessor.getCreationInstance(processId);
        }

        // Found locally
        return address(this);
    }

    // ENTITY METHODS

    function newProcess(
        uint8[3] memory mode_envelopeType_censusOrigin, // [mode, envelopeType, censusOrigin]
        address tokenContractAddress,
        string[3] memory metadata_censusRoot_censusUri, //  [metadata, censusRoot, censusUri]
        uint32[2] memory startBlock_blockCount,
        uint8[4] memory questionCount_maxCount_maxValue_maxVoteOverwrites, // [questionCount, maxCount, maxValue, maxVoteOverwrites]
        uint16[2] memory maxTotalCost_costExponent, // [maxTotalCost, costExponent]
        uint256 evmBlockHeight, // EVM only
        bytes32 paramsSignature
    ) public override payable onlyIfActive {
        require (msg.value >= processPrice, "Insufficient funds");

        CensusOrigin origin = CensusOrigin(mode_envelopeType_censusOrigin[2]);
        if (
            origin == CensusOrigin.OFF_CHAIN_TREE ||
            origin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
            origin == CensusOrigin.OFF_CHAIN_CA
        ) {
            newProcessStd(
                mode_envelopeType_censusOrigin,
                metadata_censusRoot_censusUri,
                startBlock_blockCount,
                questionCount_maxCount_maxValue_maxVoteOverwrites,
                maxTotalCost_costExponent,
                paramsSignature
            );
        } else if (origin == CensusOrigin.ERC20) {
            newProcessEvm(
                mode_envelopeType_censusOrigin,
                metadata_censusRoot_censusUri,
                tokenContractAddress,
                startBlock_blockCount,
                questionCount_maxCount_maxValue_maxVoteOverwrites,
                maxTotalCost_costExponent,
                evmBlockHeight,
                paramsSignature
            );
        } else {
            revert("Unsupported census origin");
        }
    }

    // Creates a new process using an external census
    function newProcessStd(
        uint8[3] memory mode_envelopeType_censusOrigin, // [mode, envelopeType, censusOrigin]
        string[3] memory metadata_censusRoot_censusUri, //  [metadata, censusRoot, censusUri]
        uint32[2] memory startBlock_blockCount,
        uint8[4] memory questionCount_maxCount_maxValue_maxVoteOverwrites, // [questionCount, maxCount, maxValue, maxVoteOverwrites]
        uint16[2] memory maxTotalCost_costExponent, // [maxTotalCost, costExponent]
        bytes32 paramsSignature
    ) internal {
        uint8 mode = mode_envelopeType_censusOrigin[0];

        // Sanity checks

        if (mode & MODE_AUTO_START != 0) {
            require(
                startBlock_blockCount[0] > 0,
                "Auto start requires a start block"
            );
        }
        if (mode & MODE_INTERRUPTIBLE == 0) {
            require(
                startBlock_blockCount[1] > 0,
                "Uninterruptible needs blockCount"
            );
        }
        require(
            bytes(metadata_censusRoot_censusUri[0]).length > 0,
            "No metadata"
        );
        require(
            bytes(metadata_censusRoot_censusUri[1]).length > 0,
            "No censusRoot"
        );
        require(
            bytes(metadata_censusRoot_censusUri[2]).length > 0,
            "No censusUri"
        );
        require(
            questionCount_maxCount_maxValue_maxVoteOverwrites[0] > 0,
            "No questionCount"
        );
        require(
            questionCount_maxCount_maxValue_maxVoteOverwrites[1] > 0 &&
                questionCount_maxCount_maxValue_maxVoteOverwrites[1] <= 100,
            "Invalid maxCount"
        );
        require(
            questionCount_maxCount_maxValue_maxVoteOverwrites[2] > 0,
            "No maxValue"
        );

        // Process creation

        // Index the process for the entity
        uint256 prevCount = getEntityProcessCount(msg.sender);

        entityCheckpoints[msg.sender].push();
        uint256 cIdx = entityCheckpoints[msg.sender].length - 1;
        ProcessCheckpoint storage checkpoint;
        checkpoint = entityCheckpoints[msg.sender][cIdx];
        checkpoint.index = prevCount;

        Status status;
        if (mode & MODE_AUTO_START != 0) {
            // Auto-start enabled processes start in READY state
            status = Status.READY;
        } else {
            // By default, processes start PAUSED (auto start disabled)
            status = Status.PAUSED;
        }

        // Store the new process
        bytes32 processId =
            getProcessId(msg.sender, prevCount, namespaceId, ethChainId);
        Process storage processData = processes[processId];

        processData.mode = mode_envelopeType_censusOrigin[0];
        processData.envelopeType = mode_envelopeType_censusOrigin[1];
        processData.censusOrigin = CensusOrigin(
            mode_envelopeType_censusOrigin[2]
        );

        processData.entity = msg.sender;
        processData.startBlock = startBlock_blockCount[0];
        processData.blockCount = startBlock_blockCount[1];
        processData.metadata = metadata_censusRoot_censusUri[0];

        processData.censusRoot = metadata_censusRoot_censusUri[1];
        processData.censusUri = metadata_censusRoot_censusUri[2];

        processData.status = status;
        // processData.questionIndex = 0;
        processData
            .questionCount = questionCount_maxCount_maxValue_maxVoteOverwrites[
            0
        ];
        processData
            .maxCount = questionCount_maxCount_maxValue_maxVoteOverwrites[1];
        processData
            .maxValue = questionCount_maxCount_maxValue_maxVoteOverwrites[2];
        processData
            .maxVoteOverwrites = questionCount_maxCount_maxValue_maxVoteOverwrites[
            3
        ];
        processData.maxTotalCost = maxTotalCost_costExponent[0];
        processData.costExponent = maxTotalCost_costExponent[1];
        processData.paramsSignature = paramsSignature;

        emit NewProcess(processId, namespaceId);
    }

    function newProcessEvm(
        uint8[3] memory mode_envelopeType_censusOrigin, // [mode, envelopeType, censusOrigin]
        string[3] memory metadata_censusRoot_censusUri, //  [metadata, censusRoot, censusUri]
        address tokenContractAddress,
        uint32[2] memory startBlock_blockCount,
        uint8[4] memory questionCount_maxCount_maxValue_maxVoteOverwrites, // [questionCount, maxCount, maxValue, maxVoteOverwrites]
        uint16[2] memory maxTotalCost_costExponent, // [maxTotalCost, costExponent]
        uint256 evmBlockHeight, // Ethereum block height at which the census will be considered
        bytes32 paramsSignature
    ) internal {
        uint8 mode = mode_envelopeType_censusOrigin[0];

        // Sanity checks

        require(
            mode & MODE_AUTO_START != 0,
            "Auto start is needed on EVM processes"
        );
        require(
            mode & MODE_INTERRUPTIBLE == 0,
            "Interruptible not allowed on EVM processes"
        );
        require(startBlock_blockCount[0] > 0, "Invalid start block");
        require(startBlock_blockCount[1] > 0, "Invalid blockCount");

        require(
            mode_envelopeType_censusOrigin[2] <= uint8(CensusOrigin.MINI_ME),
            "Invalid census origin value"
        );
        require(
            mode & MODE_DYNAMIC_CENSUS == 0,
            "Dynamic census not allowed on EVM processes"
        );
        require(
            tokenContractAddress != msg.sender &&
                tokenContractAddress != address(0x0),
            "Invalid token address"
        );

        // Check the token contract
        require(
            ITokenStorageProof(tokenStorageProofAddress).isRegistered(
                tokenContractAddress
            ),
            "Token not registered"
        );

        // Check that the sender holds tokens
        uint256 balance = ERC20Mock(tokenContractAddress).balanceOf(msg.sender);
        require(balance > 0, "Insufficient funds");

        require(
            bytes(metadata_censusRoot_censusUri[0]).length > 0,
            "No metadata"
        );
        require(
            bytes(metadata_censusRoot_censusUri[1]).length > 0,
            "No censusRoot"
        );
        require(
            questionCount_maxCount_maxValue_maxVoteOverwrites[0] > 0,
            "No questionCount"
        );
        require(
            questionCount_maxCount_maxValue_maxVoteOverwrites[1] > 0 &&
                questionCount_maxCount_maxValue_maxVoteOverwrites[1] <= 100,
            "Invalid maxCount"
        );
        require(
            questionCount_maxCount_maxValue_maxVoteOverwrites[2] > 0,
            "No maxValue"
        );

        // Process creation

        // Index the process for the entity
        uint256 prevCount = getEntityProcessCount(tokenContractAddress);

        entityCheckpoints[tokenContractAddress].push();
        uint256 cIdx = entityCheckpoints[tokenContractAddress].length - 1;
        ProcessCheckpoint storage checkpoint;
        checkpoint = entityCheckpoints[tokenContractAddress][cIdx];
        checkpoint.index = prevCount;

        // Store the new process
        bytes32 processId =
            getProcessId(
                tokenContractAddress,
                prevCount,
                namespaceId,
                ethChainId
            );
        Process storage processData = processes[processId];

        processData.mode = mode_envelopeType_censusOrigin[0];
        processData.envelopeType = mode_envelopeType_censusOrigin[1];
        processData.censusOrigin = CensusOrigin(
            mode_envelopeType_censusOrigin[2]
        );

        processData.censusRoot = metadata_censusRoot_censusUri[1];
        // processData.censusUri = "";

        processData.entity = tokenContractAddress;
        processData.startBlock = startBlock_blockCount[0];
        processData.blockCount = startBlock_blockCount[1];
        processData.metadata = metadata_censusRoot_censusUri[0];

        processData.status = Status.READY;
        // processData.questionIndex = 0;
        processData
            .questionCount = questionCount_maxCount_maxValue_maxVoteOverwrites[
            0
        ];
        processData
            .maxCount = questionCount_maxCount_maxValue_maxVoteOverwrites[1];
        processData
            .maxValue = questionCount_maxCount_maxValue_maxVoteOverwrites[2];
        processData
            .maxVoteOverwrites = questionCount_maxCount_maxValue_maxVoteOverwrites[
            3
        ];
        processData.maxTotalCost = maxTotalCost_costExponent[0];
        processData.costExponent = maxTotalCost_costExponent[1];

        processData.evmBlockHeight = evmBlockHeight;
        processData.paramsSignature = paramsSignature;

        emit NewProcess(processId, namespaceId);
    }

    function setStatus(bytes32 processId, Status newStatus) public override {
        if (processes[processId].entity == address(0x0)) {
            // Not found locally
            if (predecessorAddress == address(0x0)) revert("Not found"); // No predecessor to ask
            revert("Not found: Try on predecessor");
        }

        Status currentStatus = processes[processId].status;

        // Only the results contract can set to RESULTS
        if (msg.sender == resultsAddress) {
            require(currentStatus != Status.CANCELED, "Canceled");
            require(currentStatus != Status.RESULTS, "Already set");
            require(newStatus == Status.RESULTS, "Not results contract");
            processes[processId].status = newStatus;
            emit StatusUpdated(processId, namespaceId, newStatus);
            return;
        }

        // Only the process creator
        require(processes[processId].entity == msg.sender, "Invalid entity");
        require(
            uint8(newStatus) <= uint8(Status.PAUSED), // [READY 0..3 PAUSED] => RESULTS (4) is not allowed
            "Invalid status code"
        );

        // Only processes managed by entities (with an off-chain census) can be updated
        CensusOrigin origin = CensusOrigin(processes[processId].censusOrigin);
        require(
            origin == CensusOrigin.OFF_CHAIN_TREE ||
                origin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
                origin == CensusOrigin.OFF_CHAIN_CA,
            "Not off-chain"
        );

        if (currentStatus != Status.READY && currentStatus != Status.PAUSED) {
            // When currentStatus is [ENDED, CANCELED, RESULTS], no update is allowed
            revert("Process terminated");
        } else if (currentStatus == Status.PAUSED) {
            // newStatus can only be [READY, ENDED, CANCELED, PAUSED] (see the require above)

            if (processes[processId].mode & MODE_INTERRUPTIBLE == 0) {
                // Is not interruptible, we can only go from PAUSED to READY, the first time
                require(newStatus == Status.READY, "Not interruptible");
            }
        } else {
            // currentStatus is READY

            if (processes[processId].mode & MODE_INTERRUPTIBLE == 0) {
                // If not interruptible, no status update is allowed
                revert("Not interruptible");
            }

            // newStatus can only be [READY, ENDED, CANCELED, PAUSED] (see require above).
        }

        // If currentStatus is READY => Can go to [ENDED, CANCELED, PAUSED].
        // If currentStatus is PAUSED => Can go to [READY, ENDED, CANCELED].
        require(newStatus != currentStatus, "Must differ");

        // Note: the process can also be ended from incrementQuestionIndex
        // If questionIndex is already at the last one
        processes[processId].status = newStatus;

        emit StatusUpdated(processId, namespaceId, newStatus);
    }

    function incrementQuestionIndex(bytes32 processId) public override {
        if (processes[processId].entity == address(0x0)) {
            // Not found locally
            if (predecessorAddress == address(0x0)) revert("Not found"); // No predecessor to ask
            revert("Not found: Try on predecessor");
        }

        // Only the process creator
        require(processes[processId].entity == msg.sender, "Invalid entity");
        // Only if READY
        require(
            processes[processId].status == Status.READY,
            "Process not ready"
        );
        // Only when the envelope is in serial mode
        require(
            processes[processId].envelopeType & ENV_TYPE_SERIAL != 0,
            "Process not serial"
        );

        // Only processes managed by entities (with an off-chain census) can be updated
        CensusOrigin origin = CensusOrigin(processes[processId].censusOrigin);
        require(
            origin == CensusOrigin.OFF_CHAIN_TREE ||
                origin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
                origin == CensusOrigin.OFF_CHAIN_CA,
            "Not off-chain"
        );

        uint8 nextIdx = processes[processId].questionIndex.add8(1);

        if (nextIdx < processes[processId].questionCount) {
            processes[processId].questionIndex = nextIdx;

            // Not at the last question yet
            emit QuestionIndexUpdated(processId, namespaceId, nextIdx);
        } else {
            // The last question was currently active => End the process
            processes[processId].status = Status.ENDED;

            emit StatusUpdated(processId, namespaceId, Status.ENDED);
        }
    }

    function setCensus(
        bytes32 processId,
        string memory censusRoot,
        string memory censusUri
    ) public override onlyIfActive {
        require(bytes(censusRoot).length > 0, "No Census Root");
        require(bytes(censusUri).length > 0, "No Census URI");

        if (processes[processId].entity == address(0x0)) {
            // Not found locally
            if (predecessorAddress == address(0x0)) revert("Not found"); // No predecessor to ask
            revert("Not found: Try on predecessor");
        }

        // Only the process creator
        require(processes[processId].entity == msg.sender, "Invalid entity");
        // Only if the process is ongoing
        require(
            processes[processId].status == Status.READY ||
                processes[processId].status == Status.PAUSED,
            "Process terminated"
        );
        // Only when the census is dynamic
        require(
            processes[processId].mode & MODE_DYNAMIC_CENSUS != 0,
            "Read-only census"
        );

        // Only processes managed by entities (with an off-chain census) can be updated
        CensusOrigin origin = CensusOrigin(processes[processId].censusOrigin);
        require(
            origin == CensusOrigin.OFF_CHAIN_TREE ||
                origin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
                origin == CensusOrigin.OFF_CHAIN_CA,
            "Not off-chain"
        );

        processes[processId].censusRoot = censusRoot;
        processes[processId].censusUri = censusUri;

        emit CensusUpdated(processId, namespaceId);
    }

    function setProcessPrice(uint256 newPrice) public override onlyContractOwner {
        if (newPrice == processPrice) return;

        processPrice = newPrice;
        emit ProcessPriceUpdated(newPrice);
    }

    function withdraw(address payable to, uint256 amount) public override onlyContractOwner {
        if (amount == 0) return;
        require(address(this).balance > amount, "Not enough funds");
        require(to != address(0x0), "Invalid address");

        payable(to).transfer(amount);
        emit Withdraw(to, amount);
    }
}
