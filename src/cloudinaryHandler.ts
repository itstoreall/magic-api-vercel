import { v2 as cloudinary } from 'cloudinary';
// import path from 'path';
// import getImg from './base64';
require('dotenv').config();

cloudinary.config({
  cloud_name: 'astraia',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const cloudinaryHandler = async (image: string) => {
  // const imagePath = path.join(__dirname, 'base64.ts');

  try {
    // const result = await cloudinary.uploader.upload(imagePath, {
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'astraia_uploads',
    });

    return result.secure_url;
  } catch (e) {
    console.error(e);
  }

  // console.log(111, '-------------');
};

export default cloudinaryHandler;
