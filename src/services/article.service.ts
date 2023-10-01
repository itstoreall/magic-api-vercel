import { setCurrentModel } from '../db';

export const getAllArticles = async (blog: string) => {
  try {
    return await setCurrentModel(blog).find().select('-__v').exec();
  } catch (e) {
    console.error(`Error in getAllArticles: ${e.message}`);
  }
};

export const getArticleById = async (blog: string, ID: string) => {
  try {
    return await setCurrentModel(blog).findOne({ _id: ID });
  } catch (e) {
    console.error(`Error in getArticleById: ${e.message}`);
  }
};

export const createArticle = async (blog: string, newArticleInput: any) => {
  try {
    const currentModel = setCurrentModel(blog);
    const createArticle = new currentModel(newArticleInput);
    return await createArticle.save();
  } catch (e) {
    console.error(`Error in createArticle: ${e.message}`);
  }
};
