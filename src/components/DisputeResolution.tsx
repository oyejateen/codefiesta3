import React, { useState, useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

interface DisputeResolutionProps {
  reviewId: string;
}

const DisputeResolution: React.FC<DisputeResolutionProps> = ({ reviewId }) => {
  const { contract, account } = useContext(Web3Context);
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods.disputeReview(reviewId, reason).send({ from: account });
      alert('Dispute submitted successfully!');
      setReason('');
    } catch (error) {
      console.error('Error submitting dispute:', error);
      alert('Failed to submit dispute. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="reason" className="block mb-1">Dispute Reason</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          rows={4}
        />
      </div>
      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
        Submit Dispute
      </button>
    </form>
  );
};

export default DisputeResolution;