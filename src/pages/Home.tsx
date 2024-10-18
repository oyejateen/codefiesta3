import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroSvg from '../assets/hero.svg';

const Home: React.FC = () => {
  return (
    <div className="h-screen flex items-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 opacity-20"></div>
      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            Welcome to the Decentralized Reputation System
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            Empower your gig work journey with a portable, transparent reputation
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-purple-700 transition duration-300 inline-block"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <img src={heroSvg} alt="Hero" className="w-full h-auto" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-400 via-pink-500 to-transparent opacity-20"></div>
    </div>
  );
};

export default Home;
