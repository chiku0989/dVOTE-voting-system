// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Voting {

    address public owner;
    uint256 public startVote;
    uint256 public endVote;

    event CandidateAdded(address candidateAdd);
    event VoterAdded(address voterAdd);
    event CandidateApproved(address candidateAdd);
    event VoterApproved(address voterAdd);
    event VotingTimeSet(uint256 startVote, uint256 endVote);
    event Voted(address voterAdd, address candidateAdd);
    event ElectionsReset();

    constructor() {
        owner = msg.sender;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Only Owner can call this function");
        _;
    }

    modifier votingWindow() {
        require(block.timestamp >= startVote && block.timestamp <= endVote, "Voting is not allowed at this time");
        _;
    }

    struct location {
        string state;
        string city;
    }

    struct candidate {
        string name;
        string img;
        string party;
        location loc;
        uint256 aadharNo;
        bool approved;
        address candidateAdd;
        uint256 voteCount;
    }

    struct voter {
        string name;
        string img;
        location loc;
        bool approved;
        uint256 aadharNo;
        address voterAdd;
        bool canVote;
    }

    mapping(address => candidate) public candidates;
    mapping(address => voter) public voters;
    address[] public candidateList;
    address[] public voterList; 

    function addCandidate(
        string memory _name,
        string memory _img,
        string memory _party,
        string memory _state,
        string memory _city,
        uint256 _aadharNo,
        address _candidateAdd
    ) public {
        location memory _loc = location({
            state: _state,
            city: _city
        });

        candidates[_candidateAdd] = candidate({
            name: _name,
            img: _img,
            party: _party,
            loc: _loc,
            approved: false,
            aadharNo: _aadharNo,
            candidateAdd: _candidateAdd,
            voteCount: 0
        });
        candidateList.push(_candidateAdd);

        emit CandidateAdded(_candidateAdd);
    }

    function addVoter(
        string memory _name,
        string memory _img,
        string memory _state,
        string memory _city,
        uint256 _aadharNo,
        address _voterAdd
    ) public {
        location memory _loc = location({
            state: _state,
            city: _city
        });

        voters[_voterAdd] = voter({
            name: _name,
            img: _img,
            loc: _loc,
            approved: false,
            aadharNo: _aadharNo,
            voterAdd: _voterAdd,
            canVote: false
        });
        voterList.push(_voterAdd);
        emit VoterAdded(_voterAdd);
    }

    function approveCandidate(address _candidateAdd) public ownerOnly {
        candidates[_candidateAdd].approved = true;

        emit CandidateApproved(_candidateAdd);
    }

    function approveVoter(address _voterAdd) public ownerOnly {
        voters[_voterAdd].approved = true;
        voters[_voterAdd].canVote = true;
        emit VoterApproved(_voterAdd);
    }

    function setVotingTime(uint256 _startVote, uint256 _endVote) public ownerOnly {
        require(_startVote < _endVote, "Start time must be < end time");
        startVote = _startVote;
        endVote = _endVote;
        emit VotingTimeSet(_startVote, _endVote);
    }

    function getVoteCount(address _candidateAdd) public view returns (uint256) {
        return candidates[_candidateAdd].voteCount;
    }

    function vote(address _candidateAddress) public votingWindow {
        address voterAddress = msg.sender;
        require(voters[voterAddress].approved == true, "Voter must be verified to cast vote");
        require(voters[voterAddress].canVote == true, "Voter can only vote once");
        require(candidates[_candidateAddress].approved == true, "Candidate must be verified");

        candidates[_candidateAddress].voteCount += 1;
        voters[voterAddress].canVote = false;

        emit Voted(voterAddress, _candidateAddress);
    }

    function getCandidate(address _candidateAdd) public view returns (candidate memory) {
        return candidates[_candidateAdd];
    }

    function getVoter(address _voterAdd) public view returns (voter memory) {
        return voters[_voterAdd];
    }

    function getAllCandidates() public view returns (address[] memory) {
        return candidateList;
    }

    function getAllVoters() public view returns (address[] memory) {
        return voterList;
    }

    function getVotingTime() public view returns (uint256, uint256) {
        return (startVote, endVote);
    }

    function resetElections() public ownerOnly {
        for (uint256 i = 0; i < candidateList.length; i += 1) {
            candidates[candidateList[i]].approved = false;
            candidates[candidateList[i]].voteCount = 0;
        }

        for (uint256 i = 0; i < voterList.length; i += 1) {
            voters[voterList[i]].canVote = true;
        }

        startVote = 0;
        endVote = 0;

        emit ElectionsReset();
    }

    function getApprovedVoters() public view returns (address[] memory) {
        uint256 count;
        for (uint256 i = 0; i < voterList.length; i++) {
            if (voters[voterList[i]].approved) {
                count++;
            }
        }
        address[] memory approvedVoters = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < voterList.length; i++) {
            if (voters[voterList[i]].approved) {
                approvedVoters[index] = voterList[i];
                index++;
            }
        }
        return approvedVoters;
    }

    function getApprovedCandidates() public view returns (address[] memory) {
        uint256 count;
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidates[candidateList[i]].approved) {
                count++;
            }
        }
        address[] memory approvedCandidates = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidates[candidateList[i]].approved) {
                approvedCandidates[index] = candidateList[i];
                index++;
            }
        }
        return approvedCandidates;
    }

    function getNonApprovedVoters() public view returns (address[] memory) {
        uint256 count;
        for (uint256 i = 0; i < voterList.length; i++) {
            if (!voters[voterList[i]].approved) {
                count++;
            }
        }
        address[] memory nonApprovedVoters = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < voterList.length; i++) {
            if (!voters[voterList[i]].approved) {
                nonApprovedVoters[index] = voterList[i];
                index++;
            }
        }
        return nonApprovedVoters;
    }

    function getNonApprovedCandidates() public view returns (address[] memory) {
        uint256 count;
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (!candidates[candidateList[i]].approved) {
                count++;
            }
        }
        address[] memory nonApprovedCandidates = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (!candidates[candidateList[i]].approved) {
                nonApprovedCandidates[index] = candidateList[i];
                index++;
            }
        }
        return nonApprovedCandidates;
    }
}
