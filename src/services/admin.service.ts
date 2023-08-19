import db from '../db';

const { Admin } = db;

export const getAdminByToken = async (token: string) => {
  try {
    const admin = await Admin.findOne({ token });
    return admin;
  } catch (e) {
    console.error(`Error in getAdminByToken: ${e.message}`);
  }
};
