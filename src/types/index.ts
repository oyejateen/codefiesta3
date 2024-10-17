export interface Worker {
    name: string;
    skills: string[];
    averageRating: number;
  }
  
  export interface Platform {
    name: string;
    isRegistered: boolean;
  }
  
  export interface Rating {
    platform: string;
    rating: number;
    review: string;
  }
  
  export interface Web3ContextType {
    web3: any;
    account: string | null;
    contract: any | null;
    connectWallet: () => Promise<void>;
  }