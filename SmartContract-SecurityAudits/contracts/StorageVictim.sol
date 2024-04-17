// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// The StorageVictim contract allows users to store and retrieve value-based information securely.
contract StorageVictim {
    // State variable to hold the contract owner's address.
    address owner;

    // Defines a structure to hold user-specific storage data.
    struct Storage {
        address user;  
        uint256 amount;  
    }

    // Mapping to associate user addresses with their respective storage data.
    mapping(address => Storage) storages;

    // Constructor sets the initial owner of the contract to the address deploying it.
    constructor() {
        owner = msg.sender;
    }

    // Allows users to store an amount associated with their address.
    function store(uint256 _amount) public {
        Storage memory str;  
        str.user = msg.sender;  
        str.amount = _amount;  
        storages[msg.sender] = str;  
    }

    // Retrieves the stored data for the caller, returning the user's address and stored amount.
    function getStore() public view returns (address, uint256) {
        Storage memory str = storages[msg.sender];  
        return (str.user, str.amount);  
    }

    // Returns the contract owner's address.
    function getOwner() public view returns (address) {
        return owner;
    }
}
