import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

interface WorkerProfileProps {
  workerAddress: string;
}

const WorkerProfile: React.FC<WorkerProfileProps> = ({ workerAddress }) => {
  const { contract } = useContext(Web3Context);
  const [name, setName] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (contract) {
      fetchWorkerProfile();
    }
  }, [contract, workerAddress]);

  const fetchWorkerProfile = async () => {
    try {
      const worker = await contract.methods.getWorker(workerAddress).call();
      setName(worker.name);
      setSkills(worker.skills);

      const reputation = await contract.methods.getWorkerReputation(workerAddress).call();
      setAverageRating(Number(reputation.averageRating) / 100); // Assuming the rating is stored as an integer
    } catch (error) {
      console.error('Error fetching worker profile:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="mb-2"><strong>Address:</strong> {workerAddress}</p>
      <p className="mb-2"><strong>Skills:</strong> {skills.join(', ')}</p>
      <p className="mb-2"><strong>Average Rating:</strong> {averageRating.toFixed(2)} / 5</p>
    </div>
  );
};

export default WorkerProfile;