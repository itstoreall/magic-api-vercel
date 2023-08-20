import dotenv from 'dotenv';
import { ICreateAdminArgs } from '../../interfaces/admin';
import * as adminService from '../../services/admin.service';

dotenv.config();

const masterCreds = process.env.CREDS_MASTER;
const astrCreds = process.env.CREDS_ASTR;
const nameMaster = process.env.AUTHOR_NAME_MASTER;
const nameAstr = process.env.CREDS_ASTR;

export const isMasterAdmin = (login: string, pass: string) =>
  login + pass === masterCreds;

export const isAstrAdmin = (login: string, pass: string) =>
  login + pass === astrCreds;

export const isGenAdmin = (login: string, pass: string) =>
  isMasterAdmin(login, pass) || isAstrAdmin(login, pass);

export const setAuthor = (login: string, pass: string) =>
  isMasterAdmin(login, pass)
    ? nameMaster
    : isAstrAdmin(login, pass)
    ? nameAstr
    : '';

export const getAdminByCreds = async (login: string, password: string) =>
  await adminService.getAdminByCreds(login, password);

export const getAdminByToken = async (token: string) =>
  await adminService.getAdminByToken(token);

export const createAdmin = async (args: ICreateAdminArgs) => {
  const newAdmin = await adminService.createAdmin(args);

  const successResponse = {
    token: newAdmin.token,
    author: newAdmin.name,
    blog: newAdmin.blogs[newAdmin.blogs.indexOf(args.blog)],
  };

  return successResponse;
};

export const updateAdmin = async (admin: any, accessInput: any, input: any) => {
  const { login, password, blog: title } = input;
  const updatedAccess = await adminService.updateAdmin(admin, accessInput);

  console.log('wasUpdated:', updatedAccess);

  if (updatedAccess) {
    const admin = await getAdminByCreds(login, password);
    const blog = admin[0].blogs[admin[0].blogs.indexOf(title)];

    return {
      token: admin[0].token,
      author: admin[0].name,
      blog: blog,
    };
  } else throw new Error('Admin update error!');
};
