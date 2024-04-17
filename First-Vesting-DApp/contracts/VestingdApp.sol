// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Vesting {
    address public owner;
    uint256 public totalSupply;

    // Structure to store organization details
    struct Organization {
        string name;
        uint256 tokenAmount;
    }

    // Structure to store stakeholder details
    struct Stakeholder {
        string position;
        uint256 vestingPeriod;
        uint256 startTime;
        uint256 tokenAmount;
        uint256 claimedToken;
    }

    mapping(address => Stakeholder) public stakeholders;
    mapping(address => bool) public whitelistedAddresses;
    mapping(address => Organization) public organizations;
    mapping(address => uint256) public balances;

    event NewStakeholder(address indexed stakeholder, uint256 startTime, uint256 vestingPeriod);
    event Whitelisted(address indexed stakeholder, uint256 time);
    event TokensClaimed(address indexed stakeholder, uint256 amount);

    // Modifier to restrict access to only the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    // Sets the deploying address as the owner of the contract.
    constructor() {
        owner = msg.sender;
    }

    // Creates a new organization and allocates tokens to it
    function createOrganization(string memory _name, address _organizationAddress, uint256 _token) external onlyOwner {
        organizations[_organizationAddress] = Organization(_name, _token);
        totalSupply += _token;
    }

    // Adds a new stakeholder to the system with their vesting details
    function newStakeholder(address _stakeholderAddress, string memory _position, uint256 _vestingPeriod, uint256 _token) external onlyOwner {
        require(_token <= organizations[msg.sender].tokenAmount, "Token amount exceeds organization balance.");
        stakeholders[_stakeholderAddress] = Stakeholder(_position, _vestingPeriod, block.timestamp, _token, 0);
        emit NewStakeholder(_stakeholderAddress, block.timestamp, _vestingPeriod);
    }

    // Whitelists an address, enabling it to claim vested tokens
    function whitelistAddress(address _stakeholder) external onlyOwner {
        whitelistedAddresses[_stakeholder] = true;
        emit Whitelisted(_stakeholder, block.timestamp);
    }

    // Allows whitelisted stakeholders to claim their vested tokens after the vesting period
    function claimToken() external {
        require(whitelistedAddresses[msg.sender], "Address not whitelisted.");
        Stakeholder storage stakeholder = stakeholders[msg.sender];
        require(block.timestamp >= stakeholder.startTime + stakeholder.vestingPeriod, "Vesting period not yet over.");
        uint256 claimableTokens = stakeholder.tokenAmount - stakeholder.claimedToken;
        require(claimableTokens > 0, "No tokens available to claim.");
        stakeholder.claimedToken += claimableTokens;
        balances[msg.sender] += claimableTokens;
        emit TokensClaimed(msg.sender, claimableTokens);
    }

    // Returns the amount of tokens claimed by the caller
    function getClaimedToken() external view returns (uint256) {
        return balances[msg.sender];
    }

    // Retrieves the position of a stakeholder
    function getStakeholderPosition(address _address) external view returns (string memory) {
        return stakeholders[_address].position;
    }
}
