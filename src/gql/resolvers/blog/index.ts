import dotenv from 'dotenv';
import * as ib from '../../../interfaces/blog';
import getBlogs from './getBlogs';
import getBlogTags from './getBlogTags';
import deleteAuthorFromBlog from './deleteAuthorFromBlog';
import addAuthorToBlog from './addAuthorToBlog';

dotenv.config();

export interface IGetBlogTagsProps {
  token: string;
  blog: string;
}

const adminResolvers = {
  Query: {
    getAllBlogs: async (_: any, { token }: { token: string }) => {
      console.log('');
      const blogs = await getBlogs(token);
      console.log('blogs', blogs);
      return blogs;
    },

    getBlogTags: async (_: any, { token, blog }: IGetBlogTagsProps) => {
      console.log('');
      const tags = await getBlogTags(token, blog);
      console.log('tags', tags);
      return { tags: ['x'] };
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
