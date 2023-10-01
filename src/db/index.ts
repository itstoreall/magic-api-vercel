import mongoose from 'mongoose';
import models from './modelHandler';
import dotenv from 'dotenv';
import modelsConfig from './config';
import { LabelModelsConfig } from 'admin';
dotenv.config();

const db = process.env.MONGO_DB;

mongoose.connect(db);

const { astraia, healthy } = modelsConfig.articles;

export const setCurrentModel = (blog: string) => {
  if (blog === 'astraia')
    return process.env.NODE_ENV === 'production'
      ? models(astraia.label as LabelModelsConfig).ProdArticle
      : process.env.NODE_ENV === 'development' &&
          models(astraia.label as LabelModelsConfig).DevArticle;

  if (blog === 'healthy')
    return process.env.NODE_ENV === 'production'
      ? models(healthy.label as LabelModelsConfig).ProdArticle
      : process.env.NODE_ENV === 'development' &&
          models(healthy.label as LabelModelsConfig).DevArticle;
};

export default {
  Admin: models().Admin,
  Blog: models().Blog,
};
