import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

interface Rating {
  platform: string;
  rating: number;
  review: string;
}

const WorkerDashboard: React.FC = () => {
  const { contract, account } = useContext(Web3Context);
  const [workerName, setWorkerName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    if (contract && account) {
      fetchWorkerDetails();
      fetchWorkerRatings();
    }
  }, [contract, account]);

  const fetchWorkerDetails = async () => {
    try {
      const worker = await contract.methods.getWorker(account).call();
      setWorkerName(worker.name);
      setSkills(worker.skills);
    } catch (error) {
      console.error('Error fetching worker details:', error);
    }
  };

  const fetchWorkerRatings = async () => {
    try {
      const ratingCount = await contract.methods.getWorkerRatingCount(account).call();
      const fetchedRatings: Rating[] = [];
      for (let i = 0; i < ratingCount; i++) {
        const rating = await contract.methods.getWorkerRating(account, i).call();
        fetchedRatings.push({
          platform: rating.platform,
          rating: parseInt(rating.rating),
          review: rating.review
        });
      }
      setRatings(fetchedRatings);
    } catch (error) {
      console.error('Error fetching worker ratings:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Worker Dashboard</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Profile</h3>
        <p>Name: {workerName}</p>
        <p>Skills: {skills.join(', ')}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Ratings & Reviews</h3>
        {ratings.map((rating, index) => (
          <div key={index} className="mb-2 p-2 border rounded">
            <p>Platform: {rating.platform}</p>
            <p>Rating: {rating.rating}/5</p>
            <p>Review: {rating.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerDashboard;