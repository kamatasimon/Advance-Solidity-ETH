// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StorageVictimAudited {
    // Defines a structure to hold an address and an associated numeric value.
    struct Storage {
        address user;   
        uint256 amount; 
    }

    // A private mapping that associates each user's address with their Storage data.
    mapping(address => Storage) private storages;

    // Allows a user to store a specified numeric value associated with their Ethereum address.
    function store(uint256 _amount) public {
        Storage storage str = storages[msg.sender]; 
        str.user = msg.sender;  
        str.amount = _amount;   
    }

    // Retrieves the stored information (user address and amount) for the calling address.
    function getStore() public view returns (address, uint256) {
        Storage memory str = storages[msg.sender]; 
        return (str.user, str.amount); 
    }
}
