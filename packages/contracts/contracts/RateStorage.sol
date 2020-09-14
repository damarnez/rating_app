pragma solidity >=0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RateStorage is Ownable {
    address admin;

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    struct Vote {
        uint256 rate;
        uint256 timestamp;
    }
    mapping(address => mapping(address => Vote)) vote;

    function setAdmin(address newAdmin) public onlyOwner {
        admin = newAdmin;
    }

    function setRecord(
        address from,
        address to,
        uint256 rate,
        uint256 timestamp
    ) public onlyAdmin {
        vote[to][from] = Vote({rate: rate, timestamp: timestamp});
    }

    function getRecord(address from, address to)
        public
        view
        onlyAdmin
        returns (uint256 rate, uint256 timestamp)
    {
        Vote memory v = vote[to][from];
        return (v.rate, v.timestamp);
    }

    function existRecord(address from, address to)
        public
        view
        onlyAdmin
        returns (bool)
    {
        return vote[to][from].timestamp != 0;
    }
}
