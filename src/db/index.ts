import mongoose from 'mongoose';
import models from './modelHandler';
import dotenv from 'dotenv';
import modelsConfig from './config';
import { LabelModelsConfig } from 'admin';
dotenv.config();

const db = process.env.MONGO_DB;

mongoose.connect(db);

const { astraia, healthy } = modelsConfig.articles;

// /*
// const CurrentModel =
//   process.env.NODE_ENV === 'production'
//     ? models(astraia.label as LabelModelsConfig).ProdArticle
//     : process.env.NODE_ENV === 'development' &&
//       models(astraia.label as LabelModelsConfig).DevArticle;

// const CurrentModel =
//   process.env.NODE_ENV === 'production'
//     ? models(astraia.label as LabelModelsConfig).ProdArticle
//     : process.env.NODE_ENV === 'development' &&
//       models(astraia.label as LabelModelsConfig).DevArticle;
// */

// const CurrentModel = ProdArticle
// const CurrentModel = DevArticle;

export const setCurrentModel = (blog: string) => {
  if (blog === 'astraia') {
    // console.log(11, 'blog --->', blog);

    return process.env.NODE_ENV === 'production'
      ? models(astraia.label as LabelModelsConfig).ProdArticle
      : process.env.NODE_ENV === 'development' &&
          models(astraia.label as LabelModelsConfig).DevArticle;
  }

  if (blog === 'healthy') {
    // console.log(22, 'blog --->', blog);

    return process.env.NODE_ENV === 'production'
      ? models(healthy.label as LabelModelsConfig).ProdArticle
      : process.env.NODE_ENV === 'development' &&
          models(healthy.label as LabelModelsConfig).DevArticle;
  }

  // return CurrentModel;
};

export default {
  Admin: models().Admin,
  // CurrentModel,
  Blog: models().Blog,
};
