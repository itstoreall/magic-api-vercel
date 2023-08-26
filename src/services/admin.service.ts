import { IAccessInput, IAdmin, ICreateAdminArgs } from '../interfaces/admin';
import db from '../db';

const { Admin } = db;

export const isAdminByToken = async (token: string) => {
  const config = { token };
  try {
    const admin = await Admin.find(config).select('-__v').exec();
    return Boolean(admin?.length);
  } catch (e) {
    console.error(`Error in isAdminByToken: ${e.message}`);
  }
};

export const getAdminByCreds = async (login: string, pass: string) => {
  const config = { login, password: pass };
  try {
    const admin = await Admin.find(config).select('-__v').exec();
    return admin;
  } catch (e) {
    console.error(`Error in getAdminByCreds: ${e.message}`);
  }
};

export const getAdminByToken = async (token: string) => {
  const config = { token };
  try {
    const admin = await Admin.findOne(config).select('-__v').exec();
    return admin;
  } catch (e) {
    console.error(`Error in getAdminByToken: ${e.message}`);
  }
};

export const createAdmin = async (args: ICreateAdminArgs) => {
  const { login, password, token, name, blog } = args;
  const config = { login, password, token, name, blogs: [blog] };
  try {
    const newAdmin = new Admin(config);
    const admin = await newAdmin.save();
    return admin;
  } catch (e) {
    console.error(`Error in createAdmin: ${e.message}`);
  }
};

export const updateAdmin = async (admin: IAdmin, accessInput: IAccessInput) => {
  try {
    const updatedAccess = (
      await Admin.updateOne({ _id: admin._id }, { ...accessInput })
    ).modifiedCount;
    return updatedAccess;
  } catch (e) {
    console.error(`Error in createAdmin: ${e.message}`);
  }
};
