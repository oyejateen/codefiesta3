// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    struct Worker {
        string name;
        string[] skills;
        uint256 totalRating;
        uint256 ratingCount;
        mapping(address => bool) ratedBy;
    }

    struct Platform {
        string name;
        bool isRegistered;
    }

    mapping(address => Worker) public workers;
    mapping(address => Platform) public platforms;
    address[] public workerList;
    address[] public platformList;

    event WorkerRegistered(address indexed workerAddress, string name);
    event PlatformRegistered(address indexed platformAddress, string name);
    event RatingSubmitted(address indexed workerAddress, address indexed platformAddress, uint256 rating);

    modifier onlyRegisteredPlatform() {
        require(platforms[msg.sender].isRegistered, "Only registered platforms can perform this action");
        _;
    }

    function registerWorker(string memory _name, string[] memory _skills) public {
        require(bytes(workers[msg.sender].name).length == 0, "Worker already registered");
        workers[msg.sender].name = _name;
        workers[msg.sender].skills = _skills;
        workerList.push(msg.sender);
        emit WorkerRegistered(msg.sender, _name);
    }

    function registerPlatform(string memory _name) public {
        require(!platforms[msg.sender].isRegistered, "Platform already registered");
        platforms[msg.sender] = Platform(_name, true);
        platformList.push(msg.sender);
        emit PlatformRegistered(msg.sender, _name);
    }

    function submitRating(address _workerAddress, uint256 _rating) public onlyRegisteredPlatform {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        require(!workers[_workerAddress].ratedBy[msg.sender], "Platform has already rated this worker");

        Worker storage worker = workers[_workerAddress];
        worker.totalRating += _rating;
        worker.ratingCount++;
        worker.ratedBy[msg.sender] = true;

        emit RatingSubmitted(_workerAddress, msg.sender, _rating);
    }

    function getWorkerReputation(address _workerAddress) public view returns (uint256) {
        Worker storage worker = workers[_workerAddress];
        if (worker.ratingCount == 0) return 0;
        return (worker.totalRating * 100) / worker.ratingCount;
    }

    function getWorker(address _workerAddress) public view returns (string memory, string[] memory, uint256) {
        Worker storage worker = workers[_workerAddress];
        return (worker.name, worker.skills, getWorkerReputation(_workerAddress));
    }

    function getPlatform(address _platformAddress) public view returns (string memory, bool) {
        Platform storage platform = platforms[_platformAddress];
        return (platform.name, platform.isRegistered);
    }

    function getWorkers() public view returns (address[] memory) {
        return workerList;
    }

    function getPlatforms() public view returns (address[] memory) {
        return platformList;
    }
}