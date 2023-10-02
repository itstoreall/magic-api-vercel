import dotenv from 'dotenv';
import { IsAdminRes } from '../../../types/admin';
import * as ia from '../../../interfaces/admin';
import isAdmin from './isAdmin';
import addNewAuthor from './addNewAuthor';
import updateAdmin from './updateAdmin';
import getAdmins from './getAdmins';

dotenv.config();

const adminResolvers = {
  Query: {
    getAllAdmins: async (_: any, { token }: { token: string }) => {
      console.log('');
      return await getAdmins(token);
    },

    isAdmin: async (_: any, { token, blog }: ia.IIsAdminArgs): IsAdminRes => {
      console.log('');
      return await isAdmin(blog, token);
    },
  },

  Mutation: {
    addNewAuthor: async (_: any, { input }: { input: ia.IAddAdminInput }) => {
      console.log('');
      return await addNewAuthor(input);
    },

    updateAdmin: async (_: any, { input }: ia.IAdminInput) => {
      console.log('');
      return await updateAdmin(input);
    },
  },
};

export default adminResolvers;
