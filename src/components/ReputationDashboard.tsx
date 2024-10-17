import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';
import WorkerProfile from './WorkerProfile';
import RatingSubmission from './RatingSubmission';

const ReputationDashboard: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  const [workers, setWorkers] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

  useEffect(() => {
    if (contract) {
      fetchWorkers();
    }
  }, [contract]);

  const fetchWorkers = async () => {
    try {
      const workerList = await contract.methods.getWorkers().call();
      setWorkers(workerList);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reputation Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Worker List</h3>
          <ul className="bg-white shadow-md rounded-lg p-4">
            {workers.map((worker) => (
              <li
                key={worker}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => setSelectedWorker(worker)}
              >
                {worker}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedWorker && (
            <>
              <WorkerProfile workerAddress={selectedWorker} />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Submit Rating</h3>
                <RatingSubmission workerAddress={selectedWorker} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReputationDashboard;