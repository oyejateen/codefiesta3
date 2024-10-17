import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ReputationSystemABI from '../contracts/ReputationSystem.json';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  contract: any | null;
  connectWallet: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType>({
  web3: null,
  account: null,
  contract: null,
  connectWallet: async () => {},
});

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = (ReputationSystemABI as any).networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          ReputationSystemABI.abi as AbiItem[],
          deployedNetwork && deployedNetwork.address
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Failed to connect to wallet:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, contract, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};