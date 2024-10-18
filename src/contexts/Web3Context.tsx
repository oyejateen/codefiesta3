import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  isAuthenticated: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  contract: any | null; // Add this line
}

export const Web3Context = createContext<Web3ContextType>({
  web3: null,
  account: null,
  isAuthenticated: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  contract: null, // Add this line
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contract, setContract] = useState<any | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        console.log('Requesting account access...');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Account access granted');

        console.log('Creating Web3 instance...');
        const web3Instance = new Web3(window.ethereum);

        console.log('Getting accounts...');
        const accounts = await web3Instance.eth.getAccounts();
        console.log('Accounts:', accounts);
        
        if (accounts.length === 0) {
          throw new Error('No accounts found. Please make sure MetaMask is unlocked and connected to the correct network.');
        }
        
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setIsAuthenticated(true);
        
        console.log('Wallet connected successfully');
      } catch (error) {
        console.error('Failed to connect to MetaMask:', error);
        if (error instanceof Error) {
          alert(`Failed to connect wallet: ${error.message}`);
        } else {
          alert('An unknown error occurred while connecting to the wallet');
        }
        throw error;
      }
    } else {
      console.error('MetaMask is not installed');
      alert('MetaMask is not installed. Please install MetaMask and refresh the page.');
      window.open('https://metamask.io/download.html', '_blank');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsAuthenticated(false);
  };

  return (
    <Web3Context.Provider value={{ web3, account, isAuthenticated, connectWallet, disconnectWallet, contract }}>
      {children}
    </Web3Context.Provider>
  );
};
