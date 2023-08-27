import dotenv from 'dotenv';
import * as ia from '../../../interfaces/admin';
import isAdmin from './isAdmin';
import updateAdmin from './updateAdmin';
import addNewAdmin from './addNewAdmin';
import { IsAdminRes } from '../../../types/admin';

dotenv.config();

const adminResolvers = {
  Query: {
    /*
    getAdmin: async (_: any, { login, password }: any) => {
      try {
        const admin = await db.Admin.find({ login, password });

        console.log('getAdmin:', admin);

        if (admin?.length) {
          return {
            login: admin[0].login,
            password: admin[0].password,
            token: admin[0].token,
            name: admin[0].name,
          };
        }
      } catch (e) {
        throw new Error(`Failed to fetch admin: ${e}`);
      }
    },
    */

    isAdmin: async (_: any, { token, blog }: ia.IIsAdminArgs): IsAdminRes => {
      console.log('');
      return await isAdmin(blog, token);
    },
  },

  Mutation: {
    addAdmin: async (_: any, { input }: { input: ia.IAddAdminInput }) => {
      console.log('');
      return await addNewAdmin(input);
    },

    updateAdmin: async (_: any, { input }: ia.IUpdateAdminInput) => {
      console.log('');
      return await updateAdmin(input);
    },
  },
};

export default adminResolvers;
