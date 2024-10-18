import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';
import RatingSubmission from '../components/RatingSubmission';
import WorkerProfile from '../components/WorkerProfile';
import OAuthIntegration from '../components/OAuthIntegration';

const PlatformDashboard: React.FC = () => {
  const { account } = useContext(Web3Context);
  const [platformName, setPlatformName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [workers, setWorkers] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [isOAuthConnected, setIsOAuthConnected] = useState(false);

  useEffect(() => {
    if ( account) {
      checkPlatformRegistration();
      fetchWorkers();
      checkOAuthConnection();
    }
  }, [account]);

  const checkPlatformRegistration = async () => {
    try {
      const result = await contract.methods.isPlatformRegistered(account).call();
      setIsRegistered(result);
      if (result) {
        const name = await contract.methods.getPlatformName(account).call();
        setPlatformName(name);
      }
    } catch (error) {
      console.error('Error checking platform registration:', error);
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

  const handleRegister = async () => {
    try {
      await contract.methods.registerPlatform(platformName).send({ from: account });
      setIsRegistered(true);
      alert('Platform registered successfully!');
    } catch (error) {
      console.error('Error registering platform:', error);
      alert('Failed to register platform. Please try again.');
    }
  };

  const checkOAuthConnection = async () => {
    try {
      const connected = await contract.methods.isOAuthConnected(account).call();
      setIsOAuthConnected(connected);
    } catch (error) {
      console.error('Error checking OAuth connection:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Platform Dashboard</h2>
      {!isRegistered ? (
        <div className="mb-4">
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            placeholder="Enter platform name"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register Platform
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p>Welcome, {platformName}!</p>
          {!isOAuthConnected && <OAuthIntegration platformAddress={account!} />}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 mt-4">Worker Information</h3>
      <select
        value={selectedWorker}
        onChange={(e) => setSelectedWorker(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-2"
      >
        <option value="">Select a worker</option>
        {workers.map((worker, index) => (
          <option key={index} value={worker}>{worker}</option>
        ))}
      </select>
      {selectedWorker && (
        <>
          <WorkerProfile workerAddress={selectedWorker} />
          <h3 className="text-xl font-semibold mb-2 mt-4">Submit Rating</h3>
          <RatingSubmission workerAddress={selectedWorker} />
        </>
      )}
    </div>
  );
};

export default PlatformDashboard;
