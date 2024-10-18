import React, { useContext, useState } from 'react';
import { Web3Context } from '../contexts/Web3Context';

interface ExternalProfileLinkProps {
  workerAddress: string;
}

const ExternalProfileLink: React.FC<ExternalProfileLinkProps> = ({ workerAddress }) => {
  const { contract, account } = useContext(Web3Context);
  const [platformName, setPlatformName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods.linkExternalProfile(workerAddress, platformName, profileUrl).send({ from: account });
      alert('External profile linked successfully!');
      setPlatformName('');
      setProfileUrl('');
    } catch (error) {
      console.error('Error linking external profile:', error);
      alert('Failed to link external profile. Please try again.');
    }
  };

  return (
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
      <div>
        <label htmlFor="profileUrl" className="block mb-1">Profile URL</label>
        <input
          type="url"
          id="profileUrl"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Link External Profile
      </button>
    </form>
  );
};

export default ExternalProfileLink;