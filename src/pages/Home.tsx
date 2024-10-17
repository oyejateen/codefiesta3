import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Decentralized Reputation System</h1>
      <p className="text-xl mb-8">
        Empowering gig workers with portable, transparent, and fair reputation across multiple platforms.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/worker-registration"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Register as a Worker
        </Link>
        <Link
          to="/platform-dashboard"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
        >
          Platform Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;

