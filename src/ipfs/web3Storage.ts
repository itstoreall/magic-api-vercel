import process from 'process';
import {
  Web3Storage,
  getFilesFromPath,
  filesFromPath,
  File,
  Filelike,
} from 'web3.storage';
import { IPFS_TEMP_FOLDER_PATH, IPFS_TEMP_IMAGE_PATH } from '../constants';
import fs from 'fs';

const tempImagePath = IPFS_TEMP_IMAGE_PATH;
const tempFolderPath = IPFS_TEMP_FOLDER_PATH;

// Client
const getStorage = () => {
  const token = process.env.WEB3_STORAGE_API_TOKEN;

  if (!token) {
    console.error('ERROR: failed to get web3.storage API token');
    return;
  }

  return new Web3Storage({ token: token });
};

// ---

// Converter
const convertFromBase64TiImg = (base64Data: string) => {
  const base64 = base64Data.split(',')[1];
  const buffer = Buffer.from(base64, 'base64');
  fs.writeFileSync(tempImagePath, buffer);
};

// Uploader
export const upload = async (base64Img: string) => {
  try {
    convertFromBase64TiImg(base64Img);

    const storage = getStorage();
    const files = await getFilesFromPath(tempImagePath);
    const cid = await storage.put(files as Iterable<Filelike>);

    console.log('web3.storage CID:', cid);

    return cid;
  } catch (e) {
    console.error('Error web3.storage upload:', e);
  }
};
// // Uploader
// export const upload = async (base64Img: any) => {
//   try {
//     convertFromBase64TiImg(base64Img);

//     // /*
//     const storage = getStorage();
//     // const files = [];

//     const pathFiles = await getFilesFromPath('src/ipfs/temp/astraia-image.jpg');
//     // files.push(...pathFiles);

//     const cid = await storage.put(pathFiles);
//     console.log('web3.storage CID:', cid);

//     return cid;
//     // */
//   } catch (e) {
//     console.error('Error web3.storage upload:', e);
//   }
// };

// ---

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
