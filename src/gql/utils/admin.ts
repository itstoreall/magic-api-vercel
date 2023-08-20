import { ICreateAdminArgs } from '../../interfaces/admin';
import * as adminService from '../../services/admin.service';

export const getAdminByCreds = async (login: string, password: string) =>
  await adminService.getAdminByCreds(login, password);

export const createAdmin = async (args: ICreateAdminArgs) => {
  const newAdmin = await adminService.createAdmin(args);

  const successResponse = {
    token: newAdmin.token,
    author: newAdmin.name,
    blog: newAdmin.blogs[newAdmin.blogs.indexOf(args.blog)],
  };

  return successResponse;
};
