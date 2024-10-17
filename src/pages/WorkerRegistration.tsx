import React, { useState, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const WorkerRegistration: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods.registerWorker(name, skills.split(',')).send({ from: account });
      alert('Worker registered successfully!');
    } catch (error) {
      console.error('Error registering worker:', error);
      alert('Failed to register worker. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Worker Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="skills" className="block mb-1">Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default WorkerRegistration;