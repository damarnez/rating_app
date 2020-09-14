pragma solidity >=0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RateStorage.sol";

contract Rate is Ownable {
    RateStorage store;

    constructor(address newStorage) public {
        store = RateStorage(newStorage);
    }

    function updateStore(address newStorage) public onlyOwner {
        store = RateStorage(newStorage);
    }

    function vote(address to, uint256 rate) public {
        address from = msg.sender;
        uint256 time = block.timestamp;
        store.setRecord(from, to, rate, time);
    }

    function getRecord(address from, address to)
        public
        view
        returns (uint256 rate, uint256 timestamp)
    {
        return store.getRecord(from, to);
    }
}
