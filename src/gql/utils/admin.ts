import dotenv from 'dotenv';
import * as ia from '../../interfaces/admin';
import * as adminService from '../../services/admin.service';
import * as utils from '../../utils';

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
  adminConfig().find(
    (adm, idx) => adm.login === login && adm.password === pass && idx === 0
  )
    ? true
    : false;

export const isMasterName = (name: string) =>
  adminConfig().find((adm, idx) => adm.name === name && idx === 0)
    ? true
    : false;

export const isGenAdmin = (login: string, pass: string) =>
  adminConfig().find(adm =>
    adm.login === login && adm.password === pass ? true : false
  );

export const setAuthor = (login: string, pass: string) =>
  adminConfig().find(adm => adm.login === login && adm.password === pass);

export const isAdminByToken = async (token: string) =>
  await adminService.isAdminByToken(token);

export const isMasterByToken = async (token: string) => {
  const admin = await adminService.getAdminByToken(token);
  return isMasterName(admin?.name);
};

export const getAllAdmins = async (token: string) => {
  const isMaster = await isMasterByToken(token);
  if (isMaster) {
    const admins = await adminService.getAllAdmins();
    return admins;
  } else utils.throwNewError(`is not a Master!`);
};

export const getAdminByCreds = async (login: string, password: string) => {
  const name = setAuthor(login, password).name;
  return await adminService.getAdminByCreds(name);
};

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
  input: ia.IAdminInputProps
) => {
  const {
    credentials: { login, password },
  } = input;
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
  } else utils.throwNewError(`Admin update error!`);
};
