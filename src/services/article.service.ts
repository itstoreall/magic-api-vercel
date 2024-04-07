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

export const publishArticle = async (blog: string, ID: string, input: any) => {
  try {
    return (await setCurrentModel(blog).updateOne({ _id: ID }, { ...input }))
      .modifiedCount;
  } catch (e) {
    console.error(`Error in publishArticle: ${e.message}`);
  }
};

export const deleteArticle = async (blog: string, ID: string) => {
  try {
    return (await setCurrentModel(blog).deleteOne({ _id: ID })).deletedCount;
  } catch (e) {
    console.error(`Error in createArticle: ${e.message}`);
  }
};

export const updateArticle = async (blog: string, ID: string, input: any) => {
  try {
    return (await setCurrentModel(blog).updateOne({ _id: ID }, { ...input }))
      .modifiedCount;
  } catch (e) {
    console.error(`Error in updateArticle: ${e.message}`);
  }
};
