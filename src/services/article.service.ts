import db, { setCurrentModel } from '../db';

// const { CurrentModel } = db;

export const getAllArticles = async (blog: string) => {
  const CurrentArticleModel = setCurrentModel(blog);

  console.log('CurrentArticleModel ---->', CurrentArticleModel);

  try {
    const articles = await setCurrentModel(blog).find().select('-__v').exec();
    return articles;
  } catch (e) {
    console.error(`Error in getAllArticles: ${e.message}`);
  }
};
