pragma solidity >=0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RateStorage.sol";

contract Rate is Ownable {
    RateStorage store;
    event NewRate(address from, address to, uint256 rate, uint256 timestamp);

    constructor(address newStorage) public {
        store = RateStorage(newStorage);
    }

    function updateStore(address newStorage) public onlyOwner {
        store = RateStorage(newStorage);
    }

    function getStorage(address newStorage) public onlyOwner {
        store = RateStorage(newStorage);
    }

    function vote(address to, uint256 rate) public {
        require(to != address(0), "Param to required");
        require(rate > 0, "Param rate need to be grater than 0");
        require(rate <= 5, "Param rate need to be 5 or less than 5");
        require(!store.existRecord(msg.sender, to), "One time by user");
        address from = msg.sender;
        uint256 time = block.timestamp;
        store.setRecord(from, to, rate, time);
        emit NewRate(from, to, rate, time);
    }

    function getRecord(address from, address to)
        public
        view
        returns (uint256 rate, uint256 timestamp)
    {
        return store.getRecord(from, to);
    }
}
