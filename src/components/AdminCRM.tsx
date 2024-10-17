import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const AdminCRM: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [newPlatform, setNewPlatform] = useState<string>('');

  useEffect(() => {
    if (contract) {
      fetchPlatforms();
    }
  }, [contract]);

  const fetchPlatforms = async () => {
    try {
      const platformList = await contract.methods.getPlatforms().call();
      setPlatforms(platformList);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  const handleAddPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods.addPlatform(newPlatform).send({ from: account });
      alert('Platform added successfully!');
      setNewPlatform('');
      fetchPlatforms();
    } catch (error) {
      console.error('Error adding platform:', error);
      alert('Failed to add platform. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin CRM</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Registered Platforms</h3>
        <ul className="bg-white shadow-md rounded-lg p-4">
          {platforms.map((platform, index) => (
            <li key={index} className="mb-2">{platform}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Add New Platform</h3>
        <form onSubmit={handleAddPlatform} className="space-y-4">
          <input
            type="text"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            placeholder="Enter platform name"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Platform
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCRM;