import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

interface Proposal {
  id: number;
  platformAddress: string;
  yesVotes: number;
  noVotes: number;
  endTime: number;
  executed: boolean;
}

const GovernanceDashboard: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [newPlatformAddress, setNewPlatformAddress] = useState('');

  useEffect(() => {
    if (contract) {
      fetchProposals();
    }
  }, [contract]);

  const fetchProposals = async () => {
    try {
      const proposalCount = await contract.methods.getProposalCount().call();
      const fetchedProposals: Proposal[] = [];
      for (let i = 1; i <= proposalCount; i++) {
        const proposal = await contract.methods.proposals(i).call();
        fetchedProposals.push(proposal);
      }
      setProposals(fetchedProposals);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const handleProposePlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods.proposePlatform(newPlatformAddress).send({ from: account });
      alert('Platform proposed successfully!');
      setNewPlatformAddress('');
      fetchProposals();
    } catch (error) {
      console.error('Error proposing platform:', error);
      alert('Failed to propose platform. Please try again.');
    }
  };

  const handleVote = async (proposalId: number, inFavor: boolean) => {
    if (!contract || !account) return;

    try {
      await contract.methods.vote(proposalId, inFavor).send({ from: account });
      alert('Vote submitted successfully!');
      fetchProposals();
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Governance Dashboard</h2>
      <form onSubmit={handleProposePlatform} className="mb-8">
        <input
          type="text"
          value={newPlatformAddress}
          onChange={(e) => setNewPlatformAddress(e.target.value)}
          placeholder="Enter platform address"
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Propose New Platform
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-2">Active Proposals</h3>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id} className="mb-4 p-4 border rounded">
            <p>Platform: {proposal.platformAddress}</p>
            <p>Yes Votes: {proposal.yesVotes}</p>
            <p>No Votes: {proposal.noVotes}</p>
            <p>Ends: {new Date(proposal.endTime * 1000).toLocaleString()}</p>
            {!proposal.executed && (
              <div className="mt-2">
                <button
                  onClick={() => handleVote(proposal.id, true)}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                >
                  Vote Yes
                </button>
                <button
                  onClick={() => handleVote(proposal.id, false)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Vote No
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GovernanceDashboard;
