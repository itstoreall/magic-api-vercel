import dotenv from 'dotenv';
import * as blogService from '../../services/blog.service';

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
