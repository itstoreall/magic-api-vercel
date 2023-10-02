import dotenv from 'dotenv';
import * as ib from '../../../interfaces/blog';
import getBlogs from './getBlogs';
import deleteAuthorFromBlog from './deleteAuthorFromBlog';
import addAuthorToBlog from './addAuthorToBlog';

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
      { input }: { input: ib.IHandleAuthorInBlogInput }
    ) => {
      console.log('');
      return await deleteAuthorFromBlog(input);
    },
  },
};

export default adminResolvers;
