import React, { useState, useContext  } from 'react';
import { Web3Context } from '../contexts/Web3Context';

interface OAuthIntegrationProps {
  platformAddress: string;
}

const OAuthIntegration: React.FC<OAuthIntegrationProps> = ({ platformAddress }) => {
  const { contract, account } = useContext(Web3Context);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleOAuthConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulating OAuth flow
      const authWindow = window.open('https://example-oauth-provider.com/auth', '_blank');
      
      // Listen for a message from the OAuth provider
      window.addEventListener('message', async (event) => {
        if (event.origin === 'https://example-oauth-provider.com') {
          const { accessToken } = event.data;
          
          // Close the auth window
          authWindow?.close();
          
          // Send the access token to the smart contract
          await contract.methods.connectOAuth(platformAddress, accessToken).send({ from: account });
          
          alert('OAuth connection successful!');
          setIsConnecting(false);
        }
      }, { once: true });
    } catch (error) {
      console.error('Error connecting OAuth:', error);
      alert('Failed to connect OAuth. Please try again.');
      setIsConnecting(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleOAuthConnect}
        disabled={isConnecting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isConnecting ? 'Connecting...' : 'Connect OAuth'}
      </button>
    </div>
  );
};

export default OAuthIntegration;