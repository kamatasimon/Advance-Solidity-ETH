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

/*
contract SimpleAccountFactory {
    address public admin;

    constructor(address _admin) {
        admin = _admin;
    }
    


    
    function createAccount(address owner, uint256 salt) public returns (SimpleAccount) {
        address addr = getCreatedAddress(owner, salt);
        uint256 codeSize = addr.code.length;
        if (codeSize > 0) {
            return SimpleAccount(payable(addr));
        }

        address proxyAddress = address(new ERC1967Proxy{salt: bytes32(salt)}(
            address(accountImplementation),
            abi.encodeWithSignature("initialize(address)", owner)
        ));
        return SimpleAccount(payable(proxyAddress));
    }

    
 
    function fundWallet(address account) public payable {
        balance[account] += msg.value;
    }

    function getCreatedAddress(address newaddress, uint256  newsalt) public view returns (address) {
        return Create2.computeAddress(
            bytes32(newsalt),
            keccak256(
                abi.encodePacked(
                    type(ERC1967Proxy).creationCode,
                    abi.encode(address(accountImplementation), abi.encodeWithSignature("initialize(address)", newaddress))
                )
            )
        );
    }


    function balanceOf(address account) public view returns (uint256) {
        return balance[account];
    }
}    
*/