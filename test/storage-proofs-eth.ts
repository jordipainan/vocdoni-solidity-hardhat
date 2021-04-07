import blockHeaderFromRpc from "@ethereumjs/block/dist/header-from-rpc"
import { rlp } from "ethereumjs-util"
import { providers } from "ethers"
import { ConnectionInfo } from "ethers/lib/utils"
import { ethers } from "hardhat"
import { BaseTrie } from "merkle-patricia-tree"
import { Proof } from "merkle-patricia-tree/dist/baseTrie"
import { BlockData, StorageProof } from "../node_modules/@vocdoni/storage-proofs-eth/src/types"

// TODO: For browsers to work, using Buffer from NPM is required
// import { Buffer } from "buffer/"

export class ERC20Prover {
    provider: providers.JsonRpcProvider

    constructor() {
        let connection: ConnectionInfo = {
            url: "http://0.0.0.0:8545",
            headers: {
                "Content-Type": "application/json"
            },
            allowInsecureAuthentication: true
        }
        
        this.provider = new ethers.providers.JsonRpcProvider(connection)
    }

    async getProof(address: string, storageKeys: string[] = [], blockNumber: number | string, verify?: boolean) {
        const proof = await this.fetchStorageProof(address, storageKeys, ethers.BigNumber.from(blockNumber).toHexString())
        const block = await this.fetchBlock(ethers.BigNumber.from(blockNumber).toHexString())

        if (verify) {
            await this.verify(block.stateRoot, address, proof)
        }

        const blockHeaderRLP = this.getHeaderRLP(block)
        const accountProofRLP = this.encodeProof(proof.accountProof)
        const storageProofsRLP = proof.storageProof.map(p => this.encodeProof(p.proof))

        return {
            proof,
            block,
            blockHeaderRLP,
            accountProofRLP,
            storageProofsRLP
        }
    }

    public static getHolderBalanceSlot(holderAddress: string, balanceMappingSlot: number): string {
        // Equivalent to keccak256(abi.encodePacked(bytes32(holder), balanceMappingPosition));
        return ethers.utils.solidityKeccak256(["bytes32", "uint256"], [ethers.utils.hexZeroPad(holderAddress.toLowerCase(), 32), balanceMappingSlot])
    }

    public async verify(stateRoot: string, address: string, proof: StorageProof) {
        // Verify account proof locally
        const isAccountProofValid = await this.verifyAccountProof(stateRoot, address, proof)
        if (!isAccountProofValid) {
            throw new Error("Local verification of account proof failed")
        }

        // Verify storage proofs locally
        const storageProofs = await Promise.all(proof.storageProof.map(
            storageProof => this.verifyStorageProof(proof.storageHash, storageProof)
        ))

        const failedProofs = storageProofs.filter(result => !result)

        if (failedProofs.length > 0) {
            throw new Error(`Proof failed for storage proofs ${JSON.stringify(failedProofs)}`)
        }
    }

    private verifyAccountProof(stateRoot: string, address: string, proof: StorageProof): Promise<boolean> {
        const path = ethers.utils.keccak256(address).slice(2)

        return this.verifyProof(stateRoot, path, proof.accountProof)
            .then(proofAccountRLP => {
                const stateAccountRlp = this.encodeAccountRlp(proof)
                return Buffer.compare(stateAccountRlp, proofAccountRLP) === 0
            })
    }

    private verifyStorageProof(storageRoot: string, storageProof: { key: string, proof: string[], value: string }): Promise<boolean> {
        const path = ethers.utils.solidityKeccak256(["uint256",], [storageProof.key]).slice(2)

        return this.verifyProof(storageRoot, path, storageProof.proof)
            .then(proofStorageValue => {
                if (!proofStorageValue) throw new Error("Could not verify the proof")

                const stateValueRLP = rlp.encode(storageProof.value)
                return Buffer.compare(proofStorageValue, stateValueRLP) === 0
            })
    }

    private verifyProof(rootHash: string, path: string, proof: string[]): Promise<Buffer> {
        // Note: crashing when the account is not used???
        // Error: Key does not match with the proof one (extention|leaf)

        const rootHashBuff = Buffer.from(rootHash.replace("0x", ""), "hex")
        const pathBuff = Buffer.from(path.replace("0x", ""), "hex")
        const proofBuffers: Proof = proof.map(p => Buffer.from(p.replace("0x", ""), "hex"))

        return BaseTrie.verifyProof(rootHashBuff, pathBuff, proofBuffers)
    }

    private encodeProof(proof): string {
        return "0x" + rlp.encode(proof.map(part => rlp.decode(part))).toString("hex")
    }

    private encodeAccountRlp({ nonce, balance, storageHash, codeHash }: { nonce: string, balance: string, storageHash: string, codeHash: string }) {
        if (balance === "0x0") {
            balance = null // account RLP sets a null value if the balance is 0
        }

        return rlp.encode([nonce, balance, storageHash, codeHash])
    }

    private async fetchStorageProof(address: string, storageKeys: string[], blockNumber: number | string): Promise<StorageProof> {
        //console.log(this.provider)
        //await this.provider.detectNetwork()
        console.log(blockNumber)
        return await this.provider.send("eth_getProof", [address, storageKeys, blockNumber])
    }

    private async fetchBlock(blockNumber: number | string): Promise<BlockData> {
        return await this.provider.send("eth_getBlockByNumber", [blockNumber, false])
    }

    private getHeaderRLP(rpcBlock: BlockData): string {
        const header = blockHeaderFromRpc(rpcBlock)
        const blockHeaderRLP = "0x" + header.serialize().toString("hex")
        const solidityBlockHash = "0x" + header.hash().toString("hex")

        if (solidityBlockHash !== rpcBlock.hash) {
            throw new Error(`Block header RLP hash (${solidityBlockHash}) doesn't match block hash (${rpcBlock.hash})`)
        }

        return blockHeaderRLP
    }
}
