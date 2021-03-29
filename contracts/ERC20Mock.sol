// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.7.0;

contract ERC20Mock {
    uint256 public totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping (address => uint256)) public allowance;
    event Transfer(address from, address to, uint256 amount);
    event Approval(address from, address to, uint256 amount);
    
    constructor (string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        balanceOf[msg.sender] = 1000000000000000000;
        totalSupply = 1000000000000000000;
    }
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    function transfer(address recipient, uint256 amount) external returns (bool) {
        uint256 currentBalance = balanceOf[msg.sender];
        require(currentBalance >= amount, "INSUFFICIENT_BALANCE");
        balanceOf[msg.sender] = currentBalance - amount;
        balanceOf[recipient] = balanceOf[recipient] + amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
        uint256 currentAllowance = allowance[sender][msg.sender];
        require(currentAllowance >= amount, "INSUFFICIENT_ALLOWANCE");
        uint256 currentBalance = balanceOf[sender];
        require(currentBalance >= amount, "INSUFFICIENT_BALANCE");
        balanceOf[sender] = currentBalance - amount;
        balanceOf[recipient] = balanceOf[recipient] + amount;
        allowance[sender][msg.sender] = allowance[sender][msg.sender] - amount;
        emit Transfer(sender, recipient, amount);
        emit Approval(sender, msg.sender, amount);
        return true;
    }
    function mint(address recipient, uint256 amount) external {
        totalSupply = totalSupply + amount;
        balanceOf[recipient] = balanceOf[recipient] + amount;
        emit Transfer(address(0), recipient, amount);
    }
}
