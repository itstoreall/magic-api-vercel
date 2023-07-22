/*
import Moralis from 'moralis';
require('dotenv').config();

export const uploadToIpfs = async (base64: string) => {
  console.log(111, 'ipfs', process.env.IPFS_API_KEY);

  Moralis.start({
    apiKey: process.env.IPFS_API_KEY,
  });

  const uploads = [
    { path: 'blablabla2.jpeg', content: base64 },
    { path: 'blablabla3.jpeg', content: base64 },
  ];

  const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi: uploads });

  console.log(111, 'response', response);

  return 'ipfs-link';
};
// */

/*

111 response ResponseAdapter {
  jsonResponse: [
    {
      path: 'https://ipfs.moralis.io:2053/ipfs/QmcbwapMMXU9fE14atjbYKroPQcDZG6EUrpoQYRFu7QNFy/blablabla1.jpeg'
    }
  ],
  getResponse: [Function (anonymous)]
}

*/
