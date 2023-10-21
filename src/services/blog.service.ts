import db from '../db';

const { Blog } = db;

export const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find().select('-__v').exec();
    return blogs;
  } catch (e) {
    console.error(`Error in getAllBlogs: ${e.message}`);
  }
};

export const getBlogByTitle = async (title: string) => {
  try {
    const blog = await Blog.findOne({ title });
    return blog;
  } catch (e) {
    console.error(`Error in getBlogByTitle: ${e.message}`);
  }
};

export const addNewBlog = async (
  title: string,
  authors: string[],
  tags: []
) => {
  try {
    const newBlog = new Blog({ title, authors, tags });
    const createdBlog = await newBlog.save();
    return createdBlog;
  } catch (e) {
    console.error(`Error in addNewBlog: ${e.message}`);
  }
};

export const updateBlog = async (blog: any, blogInput: any) => {
  try {
    await Blog.updateOne({ _id: blog._id }, { ...blogInput });
    const updatedBlog = await getBlogByTitle(blog.title);
    return updatedBlog;
  } catch (e) {
    console.error(`Error in updateBlogAuthors: ${e.message}`);
  }
};

export const deleteAdminFromBlog = async (name: string, title: string) => {
  try {
    const blog = await getBlogByTitle(title);
    const authors = blog.authors.filter(auth => auth !== name);
    const blogInput = { title: blog.title, authors };
    const updatedBlog = await updateBlog(blog, blogInput);
    return updatedBlog;
  } catch (e) {
    console.error(`Error in deleteAdminFromBlog: ${e.message}`);
  }
};
