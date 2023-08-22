import db from '../db';

const { Blog } = db;

export const getBlogByTitle = async (title: string) => {
  try {
    const blog = await Blog.find({ title });
    return blog;
  } catch (e) {
    console.error(`Error in getBlogByTitle: ${e.message}`);
  }
};

export const addNewBlog = async (title: string, authors: string[]) => {
  try {
    const newBlog = new Blog({ title, authors });
    const createdBlog = await newBlog.save();
    return createdBlog;
  } catch (e) {
    console.error(`Error in addNewBlog: ${e.message}`);
  }
};

export const updateBlog = async (blog: any, blogInput: any) => {
  try {
    await Blog.updateOne({ _id: blog[0]._id }, { ...blogInput });
    const updatedBlog = await getBlogByTitle(blog[0].title);
    return updatedBlog;
  } catch (e) {
    console.error(`Error in updateBlogAuthors: ${e.message}`);
  }
};
