import { ethers } from 'ethers';
import ReputationSystemABI from '../contracts/ReputationSystem.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';

export const getReputationContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, ReputationSystemABI.abi, signer);
  }
  throw new Error('Please install MetaMask!');
};

export const registerWorker = async (name: string, skills: string[]) => {
  const contract = await getReputationContract();
  return contract.registerWorker(name, skills);
};

export const registerPlatform = async (name: string) => {
  const contract = await getReputationContract();
  return contract.registerPlatform(name);
};

export const submitRating = async (workerAddress: string, rating: number, review: string) => {
  const contract = await getReputationContract();
  return contract.submitRating(workerAddress, rating, review);
};

export const getWorkerReputation = async (workerAddress: string) => {
  const contract = await getReputationContract();
  return contract.getWorkerReputation(workerAddress);
};