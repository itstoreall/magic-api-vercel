import dotenv from 'dotenv';
import * as blogService from '../../services/blog.service';

dotenv.config();

const existingBlogs = process.env.EXISTING_BLOGS;

export const getBlogByTitle = async (title: string) =>
  await blogService.getBlogByTitle(title);

export const createNewBlog = async (title: string, author: string[]) => {
  const newBlog = await blogService.addNewBlog(title, author);
  return newBlog;
};

export const handleBlogs = (admin: any, title: string, accessInput: any) =>
  existingBlogs
    .split(' ')
    .map(el => el)
    .includes(title) && accessInput.blogs.push(title);

export const updateCoauthors = async (blog: any, blogInput: any) => {
  const updatedBlog = await blogService.updateBlog(blog, blogInput);
  return updatedBlog[0].authors;
};
