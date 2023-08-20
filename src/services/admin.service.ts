import { ICreateAdminArgs } from '../interfaces/admin';
import db from '../db';

const { Admin } = db;

export const getAdminByCreds = async (login: string, pass: string) => {
  try {
    const admin = await Admin.find({ login, password: pass });
    return admin;
  } catch (e) {
    console.error(`Error in getAdminByCreds: ${e.message}`);
  }
};

export const getAdminByToken = async (token: string) => {
  try {
    const admin = await Admin.findOne({ token });
    return admin;
  } catch (e) {
    console.error(`Error in getAdminByToken: ${e.message}`);
  }
};

export const createAdmin = async (args: ICreateAdminArgs) => {
  const { login, password, token, name, blog } = args;
  const config = { login, password, token, name, blogs: [blog] };

  try {
    const newAdmin = new db.Admin(config);
    const admin = await newAdmin.save();
    return admin;
  } catch (e) {
    console.error(`Error in createAdmin: ${e.message}`);
  }
};

export const updateAdmin = async (admin: any, accessInput: any) => {
  try {
    const updatedAccess = (
      await db.Admin.updateOne({ _id: admin[0]._id }, { ...accessInput })
    ).modifiedCount;
    return updatedAccess;
  } catch (e) {
    console.error(`Error in createAdmin: ${e.message}`);
  }
};
