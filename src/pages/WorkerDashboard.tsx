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
  const [workerName, setWorkerName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [unifiedScore, setUnifiedScore] = useState<number>(0);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    setError(null);
    try {
      const worker = await contract.methods.getWorker(account).call();
      setWorkerName(worker.name);
      setSkills(worker.skills);
    } catch (err) {
      console.error('Error fetching worker details:', err);
      setError('Failed to fetch worker details');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkerRatings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ratingsList = await contract.methods.getWorkerRatings(account).call();
      setRatings(ratingsList);
    } catch (err) {
      console.error('Error fetching worker ratings:', err);
      setError('Failed to fetch worker ratings');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnifiedScore = async () => {
    try {
      const score = await contract.methods.getUnifiedScore(account).call();
      setUnifiedScore(Number(score) / 100);
    } catch (err) {
      console.error('Error fetching unified score:', err);
      setError('Failed to fetch unified score');
    }
  };

  const fetchPrivacySettings = async () => {
    try {
      const privacy = await contract.methods.getPrivacySettings(account).call();
      setIsPublic(privacy);
    } catch (err) {
      console.error('Error fetching privacy settings:', err);
      setError('Failed to fetch privacy settings');
    }
  };

  const togglePrivacy = async () => {
    try {
      await contract.methods.togglePrivacy().send({ from: account });
      setIsPublic(!isPublic);
    } catch (err) {
      console.error('Error toggling privacy:', err);
      setError('Failed to toggle privacy settings');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
