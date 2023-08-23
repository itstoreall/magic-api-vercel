import dotenv from 'dotenv';
import { ICreateAdminArgs } from '../../interfaces/admin';
import * as adminService from '../../services/admin.service';

dotenv.config();

// const masterCreds = process.env.CREDS_MASTER;
// const astrCreds = process.env.CREDS_ASTR;
// const nameMaster = process.env.AUTHOR_NAME_MASTER;
// const nameAstr = process.env.CREDS_ASTR;
// const admins = process.env.ADMINS;
const adminsCreds = process.env.ADMIN_CREDS;

export const adminConfig = () =>
  adminsCreds.split(' ').map(el => {
    const admin = el.split('#');
    return {
      name: admin[0],
      login: admin[1],
      password: admin[2],
    };
  });

export const isMasterAdmin = (login: string, pass: string) =>
  adminConfig().find((adm, idx) =>
    adm.login === login && adm.password === pass && idx === 0 ? true : false
  );

export const isGenAdmin = (login: string, pass: string) =>
  adminConfig().find(adm =>
    adm.login === login && adm.password === pass ? true : false
  );

export const setAuthor = (login: string, pass: string) =>
  adminConfig().find(adm => adm.login === login && adm.password === pass);

export const isAdminByToken = async (token: string) =>
  await adminService.isAdminByToken(token);

export const getAdminByCreds = async (login: string, password: string) =>
  await adminService.getAdminByCreds(login, password);

export const getAdminByToken = async (token: string) =>
  await adminService.getAdminByToken(token);

export const createAdmin = async (args: ICreateAdminArgs) => {
  const newAdmin = await adminService.createAdmin(args);

  const successResponse = {
    token: newAdmin.token,
    name: newAdmin.name,
    blogs: newAdmin.blogs,
  };

  return successResponse;
};

export const updateAdmin = async (admin: any, accessInput: any, input: any) => {
  const { login, password } = input;
  const updatedAccess = await adminService.updateAdmin(admin, accessInput);

  console.log('wasUpdated:', updatedAccess);

  if (updatedAccess) {
    const admin = await getAdminByCreds(login, password);

    const successResponse = {
      token: admin[0].token,
      name: admin[0].name,
      blogs: admin[0].blogs,
    };

    return successResponse;
  } else throw new Error('Admin update error!');
};
