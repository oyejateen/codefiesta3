import { create } from 'ipfs-http-client';

const projectId = 'YOUR_INFURA_PROJECT_ID';
const projectSecret = 'YOUR_INFURA_PROJECT_SECRET';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const uploadToIPFS = async (content: string): Promise<string> => {
  try {
    const added = await client.add(content);
    return added.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export const getFromIPFS = async (cid: string): Promise<string> => {
  try {
    const stream = client.cat(cid);
    let data = '';

    for await (const chunk of stream) {
      data += chunk.toString();
    }

    return data;
  } catch (error) {
    console.error('Error getting from IPFS:', error);
    throw error;
  }
};