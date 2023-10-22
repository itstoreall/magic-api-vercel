import dotenv from 'dotenv';
import { IHandleAuthorInBlogInput } from '../../interfaces/blog';
import { isMasterByToken } from './admin';
import * as blogService from '../../services/blog.service';
import * as utils from '../../utils';

dotenv.config();

const existingBlogs = process.env.EXISTING_BLOGS;

export const getBlogByTitle = async (title: string) =>
  await blogService.getBlogByTitle(title);

export const createNewBlog = async (title: string, author: string[]) => {
  const newBlog = await blogService.addNewBlog(title, author, []);

  if (newBlog) {
    console.log('+ new blog has been created:', Boolean(newBlog));
    return newBlog;
  }
};

export const getAllBlogs = async (token: string) => {
  const isMaster = await isMasterByToken(token);
  if (!isMaster) return utils.throwNewError(`is not a Master!`);
  const blogs = await blogService.getAllBlogs();
  return blogs;
};

export const getBlogTags = async (token: string, title: string) => {
  const isMaster = await isMasterByToken(token);
  if (!isMaster) return utils.throwNewError(`is not a Master!`);
  const blog = await getBlogByTitle(title);
  return blog.tags;
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
    return updatedBlog.authors;
  }
};

export const deleteAdminFromBlog = async (input: IHandleAuthorInBlogInput) => {
  const { blog, author, token } = input;

  const isMaster = await isMasterByToken(token);

  if (isMaster) {
    const updatedBlog = await blogService.deleteAdminFromBlog(author, blog);

    if (updatedBlog) {
      return !updatedBlog.authors.includes(author)
        ? true
        : utils.throwNewError('authors update Error!');
    }

    console.log('updatedBlog', updatedBlog);
  }
};

export const addCoauthor = async (input: IHandleAuthorInBlogInput) => {
  const { blog, author, token } = input;

  const isMaster = await isMasterByToken(token);

  if (isMaster) {
    const existingBlog = await getBlogByTitle(blog);

    if (existingBlog) {
      console.log(1, 'existingBlog:', existingBlog.authors.includes(author));

      if (existingBlog.authors.includes(author))
        utils.throwNewError(`author ${author} already exists in db`);

      const blogInput = {
        title: blog,
        authors: [...existingBlog.authors, author],
      };

      const updatedCoauthors = await updateCoauthors(existingBlog, blogInput);
      console.log(1, 'updated coauthors:', updatedCoauthors);
      return updatedCoauthors;
    } else utils.throwNewError(`no blog in db`);
  } else utils.throwNewError(`is not a Master!`);

  return [''];
};
