import dotenv from 'dotenv';
import {
  IGetBlogTagsProps as IGBTP,
  IHandleAuthorInBlogInput as IHAIBI,
  IUpdateBlogTagsInput as IUBTI
} from '../../../interfaces/blog';
// import * as ib from '../../../interfaces/blog';
import getBlogs from './getBlogs';
import getBlogTags from './getBlogTags';
import deleteAuthorFromBlog from './deleteAuthorFromBlog';
import addAuthorToBlog from './addAuthorToBlog';
import updateBlogTags from './updateBlogTags';

dotenv.config();

const adminResolvers = {
  Query: {
    getAllBlogs: async (_: any, { token }: { token: string }) => {
      console.log('');
      const blogs = await getBlogs(token);
      console.log('blogs', blogs);
      return blogs;
    },

    getBlogTags: async (_: any, { token, blog }: IGBTP) => {
      console.log('', token, blog);
      const tags = await getBlogTags(token, blog);
      console.log('tags', tags);
      return tags;
    }
  },

  Mutation: {
    addAuthorToBlog: async (_: any, { input }: { input: IHAIBI }) => {
      console.log('');
      return await addAuthorToBlog(input);
    },

    deleteAuthorFromBlog: async (_: any, { input }: { input: IHAIBI }) => {
      console.log('');
      return await deleteAuthorFromBlog(input);
    },

    updateBlogTags: async (_: any, { input }: { input: IUBTI }) => {
      console.log('');
      console.log('input -->', input);
      return await updateBlogTags(input);
    }
  }
};

export default adminResolvers;
