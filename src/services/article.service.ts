import db from '../db';

const { CurrentModel } = db;

export const getAllArticles = async (blog: string) => {
  console.log('blog', blog);
  try {
    const articles = await CurrentModel.find().select('-__v').exec();
    return articles;
  } catch (e) {
    console.error(`Error in getAllArticles: ${e.message}`);
  }
};
