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
      const admins = await getAdmins(token);
      return admins;
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

    // deleteAuthorFromBlog: async (
    //   _: any,
    //   { input }: { input: ia.IDelAuthorFromBlogInput }
    // ) => {
    //   console.log('');
    //   return await deleteAuthorFromBlog(input);
    // },
  },
};

export default adminResolvers;
