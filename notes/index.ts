/*

--------- initial server

import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel');
});

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});


--------- web3Storage (test fns)

import base64Img from './base64';

web3Storage.upload(base64Img);

const list = async () => {
  const res = await web3Storage.list();
  console.log('list:', res);
};

const retrieve = async () => {
  const res = await web3Storage.retrieve(defaultCid);
  console.log('retrieved cid:', res);
};

const checkStatus = async () => {
  const res = await web3Storage.checkStatus(defaultCid);
  console.log('status:', res);
};

list();
retrieve();
checkStatus();

*/
