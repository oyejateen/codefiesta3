// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ReputationSystem.sol";

contract Governance {
    ReputationSystem public reputationSystem;
    mapping(address => bool) public approvedPlatforms;
    uint256 public constant MINIMUM_VOTES = 3;
    uint256 public votingPeriod = 7 days;

    struct PlatformProposal {
        address platformAddress;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 endTime;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => PlatformProposal) public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 proposalId, address platformAddress);
    event Voted(uint256 proposalId, address voter, bool inFavor);
    event ProposalExecuted(uint256 proposalId, bool approved);

    constructor(address _reputationSystem) {
        reputationSystem = ReputationSystem(_reputationSystem);
    }

    function proposePlatform(address _platformAddress) external {
        require(!approvedPlatforms[_platformAddress], "Platform already approved");
        
        proposalCount++;
        PlatformProposal storage proposal = proposals[proposalCount];
        proposal.platformAddress = _platformAddress;
        proposal.endTime = block.timestamp + votingPeriod;

        emit ProposalCreated(proposalCount, _platformAddress);
    }

    function vote(uint256 _proposalId, bool _inFavor) external {
        PlatformProposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.endTime, "Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        proposal.hasVoted[msg.sender] = true;
        if (_inFavor) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        emit Voted(_proposalId, msg.sender, _inFavor);
    }

    function executeProposal(uint256 _proposalId) external {
        PlatformProposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.endTime, "Voting period not ended");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;

        if (proposal.yesVotes > proposal.noVotes && proposal.yesVotes >= MINIMUM_VOTES) {
            approvedPlatforms[proposal.platformAddress] = true;
            emit ProposalExecuted(_proposalId, true);
        } else {
            emit ProposalExecuted(_proposalId, false);
        }
    }

    function isPlatformApproved(address _platformAddress) public view returns (bool) {
        return approvedPlatforms[_platformAddress];
    }
}