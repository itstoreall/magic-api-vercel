import dotenv from 'dotenv';
// import { IsAdminRes } from '../../../types/admin';
// import * as ia from '../../../interfaces/admin';
import * as ib from '../../../interfaces/blog';
import getBlogs from './getBlogs';
import deleteAuthorFromBlog from './deleteAuthorFromBlog';
import addAuthorToBlog from './addAuthorToBlog';
// import isAdmin from './isAdmin';
// import addNewAuthor from './addNewAuthor';
// import updateAdmin from './updateAdmin';
// import deleteAuthorFromBlog from './deleteAuthorFromBlog';
// import getAdmins from './getAdmins';

dotenv.config();

const adminResolvers = {
  Query: {
    getAllBlogs: async (_: any, { token }: { token: string }) => {
      console.log('token', token);
      const blogs = await getBlogs(token);
      console.log('blogs', blogs);
      return blogs;
    },
  },

  Mutation: {
    addAuthorToBlog: async (
      _: any,
      { input }: { input: ib.IHandleAuthorInBlogInput }
    ) => {
      console.log('');
      return await addAuthorToBlog(input);
    },

    deleteAuthorFromBlog: async (
      _: any,
      { input }: { input: ib.IDelAuthorFromBlogInput }
    ) => {
      console.log('');
      return await deleteAuthorFromBlog(input);
    },
  },
};

export default adminResolvers;
