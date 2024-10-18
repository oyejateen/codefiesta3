import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  isAuthenticated: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  contract: any | null;
}

export const Web3Context = createContext<Web3ContextType>({
  web3: null,
  account: null,
  isAuthenticated: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  contract: null,
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contract, setContract] = useState<any | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setIsAuthenticated(true);
        
        // Initialize contract here
        // const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        // const contractABI = YOUR_CONTRACT_ABI;
        // const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        // setContract(contractInstance);
      } catch (error) {
        console.error('Failed to connect to wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    setIsAuthenticated(false);
    setContract(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
        setIsAuthenticated(!!accounts[0]);
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, isAuthenticated, connectWallet, disconnectWallet, contract }}>
      {children}
    </Web3Context.Provider>
  );
};
