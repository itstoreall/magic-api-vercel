import dotenv from 'dotenv';
import { IDelAuthorFromBlogInput } from '../../interfaces/admin';
import { isMasterByToken } from './admin';
import * as blogService from '../../services/blog.service';
import * as utils from '../../utils';

dotenv.config();

const existingBlogs = process.env.EXISTING_BLOGS;

export const getBlogByTitle = async (title: string) =>
  await blogService.getBlogByTitle(title);

export const createNewBlog = async (title: string, author: string[]) => {
  const newBlog = await blogService.addNewBlog(title, author);

  if (newBlog) {
    console.log('+ new blog has been created:', Boolean(newBlog));
    return newBlog;
  }
};

export const pushToAuthorBlogs = (title: string, accessInput: any) =>
  existingBlogs
    .split(' ')
    .map(el => el)
    .includes(title) && accessInput.blogs.push(title);

export const updateCoauthors = async (blog: any, blogInput: any) => {
  const updatedBlog = await blogService.updateBlog(blog, blogInput);

  if (updatedBlog) {
    console.log('+ blog has been updated:', Boolean(updatedBlog));
    return updatedBlog[0].authors;
  }
};

export const deleteAdminFromBlog = async (input: IDelAuthorFromBlogInput) => {
  const { blog, author, token } = input;

  const isMaster = await isMasterByToken(token);
  console.log(111, isMaster);

  if (isMaster) {
    const updatedBlog = await blogService.deleteAdminFromBlog(author, blog);

    if (updatedBlog?.length) {
      return !updatedBlog[0].authors.includes(author)
        ? true
        : utils.throwNewError('authors update Error!');
    }

    console.log('updatedBlog', updatedBlog);
  }
};
