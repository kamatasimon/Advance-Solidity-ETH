// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "./SimpleAccount.sol";

/**
 * A sample factory contract for SimpleAccount
 * A UserOperations "initCode" holds the address of the factory, and a method call (to createAccount, in this sample factory).
 * The factory's createAccount returns the target account address even if it is already installed.
 * This way, the entryPoint.getSenderAddress() can be called either before or after the account is created.
 */
contract SimpleAccountFactory {
    address public accountImplementation; // Declare accountImplementation
    mapping(address => uint) public balance; // Declare balance mapping

    constructor(address _accountImplementation) {
        accountImplementation = _accountImplementation; // Initialize accountImplementation
    }

    function deposit(address account) public payable {
        balance[account] += msg.value; // Now 'balance' is declared
    }

    function getBalance(address account) public view returns (uint) {
        return balance[account]; // 'balance' is correctly used here
    }

    function someFunction(address newaddress) public {
        // Example of correctly encoding with a declared variable
        bytes memory data = abi.encode(address(accountImplementation), abi.encodeWithSignature("initialize(address)", newaddress));
    }
}

