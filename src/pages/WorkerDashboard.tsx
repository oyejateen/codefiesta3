import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';
import ExternalProfileLink from '../components/ExternalProfileLink';
import DisputeResolution from '../components/DisputeResolution';

interface Rating {
  platform: string;
  rating: number;
  review: string;
  id: string;
}

const WorkerDashboard: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [workerName, setWorkerName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skills, setSkills] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [unifiedScore, setUnifiedScore] = useState<number>(0);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contract && account) {
      fetchWorkerDetails();
      fetchWorkerRatings();
      fetchUnifiedScore();
      fetchPrivacySettings();
    }
  }, [contract, account]);

  const fetchWorkerDetails = async () => {
    // ... (keep existing implementation)
  };

  const fetchWorkerRatings = async () => {
    // ... (keep existing implementation)
  };

  const fetchUnifiedScore = async () => {
    try {
      const score = await contract.methods.getUnifiedScore(account).call();
      setUnifiedScore(Number(score) / 100);
    } catch (error) {
      console.error('Error fetching unified score:', error);
    }
  };

  const fetchPrivacySettings = async () => {
    try {
      const privacy = await contract.methods.getPrivacySettings(account).call();
      setIsPublic(privacy);
    } catch (error) {
      console.error('Error fetching privacy settings:', error);
    }
  };

  const togglePrivacy = async () => {
    try {
      await contract.methods.togglePrivacy().send({ from: account });
      setIsPublic(!isPublic);
    } catch (error) {
      console.error('Error toggling privacy:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Worker Dashboard</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Profile</h3>
        <p>Name: {workerName}</p>
        <p>Skills: {skills.join(', ')}</p>
        <p>Unified Reputation Score: {unifiedScore.toFixed(2)}</p>
        <button
          onClick={togglePrivacy}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isPublic ? 'Make Profile Private' : 'Make Profile Public'}
        </button>
      </div>
      <ExternalProfileLink workerAddress={account!} />
      <div>
        <h3 className="text-xl font-semibold mb-2">Ratings & Reviews</h3>
        {ratings.map((rating, index) => (
          <div key={index} className="mb-2 p-2 border rounded">
            <p>Platform: {rating.platform}</p>
            <p>Rating: {rating.rating}/5</p>
            <p>Review: {rating.review}</p>
            <DisputeResolution reviewId={rating.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerDashboard;
