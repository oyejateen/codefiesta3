import React, { useState, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

interface RatingSubmissionProps {
  workerAddress: string;
}

const RatingSubmission: React.FC<RatingSubmissionProps> = ({ workerAddress }) => {
  const { contract, account } = useContext(Web3Context);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods.submitRating(workerAddress, rating, review).send({ from: account });
      alert('Rating submitted successfully!');
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block mb-1">Rating (1-5)</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="review" className="block mb-1">Review</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          rows={4}
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit Rating
      </button>
    </form>
  );
};

export default RatingSubmission;