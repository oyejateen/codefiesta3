import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const AdminDashboard: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [workers, setWorkers] = useState<string[]>([]);

  useEffect(() => {
    if (contract && account) {
      fetchPlatforms();
      fetchWorkers();
    }
  }, [contract, account]);

  const fetchPlatforms = async () => {
    try {
      const platformList = await contract.methods.getPlatforms().call();
      setPlatforms(platformList);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  const fetchWorkers = async () => {
    try {
      const workerList = await contract.methods.getWorkers().call();
      setWorkers(workerList);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Registered Platforms</h3>
        <ul className="list-disc pl-5">
          {platforms.map((platform, index) => (
            <li key={index}>{platform}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Registered Workers</h3>
        <ul className="list-disc pl-5">
          {workers.map((worker, index) => (
            <li key={index}>{worker}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;