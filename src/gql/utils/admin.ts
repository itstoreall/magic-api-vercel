import dotenv from 'dotenv';
import * as ia from '../../interfaces/admin';
import * as adminService from '../../services/admin.service';

dotenv.config();

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

export const createAdmin = async (args: ia.ICreateAdminArgs) => {
  const newAdmin = await adminService.createAdmin(args);

  if (newAdmin) {
    console.log('+ new admin has been creater:', Boolean(newAdmin));

    const successResponse = {
      token: newAdmin.token,
      name: newAdmin.name,
      blogs: newAdmin.blogs,
    };

    return successResponse;
  }
};

export const updateAdmin = async (
  admin: ia.IAdmin,
  accessInput: ia.IAccessInput,
  input: ia.IUpdateAdminInputProps
) => {
  const { login, password } = input;
  const updatedAccess = await adminService.updateAdmin(admin, accessInput);

  if (updatedAccess) {
    console.log('+ admin has been updated:', Boolean(updatedAccess));

    const admin = await getAdminByCreds(login, password);

    const successResponse = {
      token: admin[0].token,
      name: admin[0].name,
      blogs: admin[0].blogs,
    };

    return successResponse;
  } else throw new Error('Admin update error!');
};
