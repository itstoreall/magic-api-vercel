import path from 'path';
import process from 'process';
import { DEFAULT_IPFS_CID } from '../constants';
import { Web3Storage, File, Filelike } from 'web3.storage';
// import { IPFS_TEMP_IMAGE_PATH } from '../constants';
// import fs from 'fs';

const defaultCid = DEFAULT_IPFS_CID;
// const tempImagePath = IPFS_TEMP_IMAGE_PATH;
// const tempFolderPath = IPFS_TEMP_FOLDER_PATH;

// Client
const getStorage = () => {
  const token = process.env.WEB3_STORAGE_API_TOKEN;

  if (!token) {
    console.error('ERROR: failed to get web3.storage API token');
    return;
  }

  return new Web3Storage({ token: token });
};

// Preparation
const prepareFiles = (base64Data: string) => {
  const base64 = base64Data.split(';base64,').pop();
  const buffer = Buffer.from(base64, 'base64');
  return [new File([buffer], 'astraia-image.jpg')];
};

// Uploader
export const upload = async (base64Img: string) => {
  try {
    // /*
    const files = prepareFiles(base64Img);
    const storage = getStorage();
    const cid = await storage.put(files as Iterable<Filelike>);

    console.log('web3.storage CID:', cid);

    return cid || defaultCid;
    // */
  } catch (e) {
    console.error('Error web3.storage upload:', e);
  }
};

// Retrieve
export const retrieve = async (cid: string) => {
  const retrievedFiles = [];

  try {
    const storage = getStorage();
    const res = await storage.get(cid);

    if (!res.ok) {
      console.error(`failed to get web3.storage ${cid}`);
      return;
    }

    const files = await res.files();

    for (const file of files) {
      retrievedFiles.push(file);
    }

    return { status: res.status, files: retrievedFiles };
  } catch (e) {
    console.error('Error web3.storage retrieve:', e);
  }
};

// Status
export const checkStatus = async (cid: string) => {
  try {
    const storage = getStorage();
    return await storage.status(cid);
  } catch (e) {
    console.error('Error web3.storage checkStatus:', e);
  }
};

// List
export const list = async () => {
  const imageList = [];

  try {
    const storage = getStorage();
    for await (const upload of storage.list()) {
      imageList.push(upload);
    }
    return imageList;
  } catch (e) {
    console.error('Error web3.storage list:', e);
  }
};

/*
const base64 = fs.readFileSync('src/temp/astraia-image.jpg', 'base64');
const base64 = fs.readFileSync('src/temp/astraia-image.txt', 'utf8');
*/
