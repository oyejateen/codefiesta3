import React, { useState, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const PlatformRegistration: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  const [platformName, setPlatformName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods.registerPlatform(platformName).send({ from: account });
      alert('Platform registered successfully!');
      setPlatformName('');
    } catch (error) {
      console.error('Error registering platform:', error);
      alert('Failed to register platform. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Platform Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="platformName" className="block mb-1">Platform Name</label>
          <input
            type="text"
            id="platformName"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register Platform
        </button>
      </form>
    </div>
  );
};

export default PlatformRegistration;