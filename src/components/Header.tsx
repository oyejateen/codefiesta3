import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Web3Context } from '../contexts/Web3Context';

const Header: React.FC = () => {
  const { account, connectWallet } = useContext(Web3Context);

  return (
    <header className="bg-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold">
          DRS
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/worker-registration">Worker Registration</Link></li>
            <li><Link to="/platform-dashboard">Platform Dashboard</Link></li>
            <li><Link to="/worker-dashboard">Worker Dashboard</Link></li>
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
          </ul>
        </nav>
        {account ? (
          <span className="text-sm">Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-white text-blue-600 px-4 py-2 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
