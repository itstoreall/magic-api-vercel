import mongoose, { Schema } from 'mongoose';
import modCfg from './config';
import { AdminModel } from '../interfaces/modelHandler';
import { BlogModel } from '../interfaces/modelHandler';
import { IModelsResponse } from '../interfaces/modelHandler';
import { ArticleModel } from '../interfaces/modelHandler';
import { LabelModelsConfig } from 'admin';

const AdminSchema = new mongoose.Schema({
  token: String,
  name: String,
  blogs: { type: [Schema.Types.String], default: [] }
});

const BlogSchema = new mongoose.Schema({
  title: String,
  authors: { type: [Schema.Types.String], default: [] },
  tags: { type: [Schema.Types.String], default: [] }
});

const defaultConfig = {
  title: String,
  description: String,
  text: String,
  author: String,
  ipfs: String,
  image: String,
  views: String,
  status: String,
  timestamp: { type: Date, default: Date.now }
};

const ProdArticleSchema = new mongoose.Schema({
  ...defaultConfig,
  tags: { type: [Schema.Types.String], default: [] }
});

const DevArticleSchema = new mongoose.Schema({
  ...defaultConfig,
  tags: { type: [Schema.Types.String], default: [] }
});

const { admin, blog, articles } = modCfg;

const modelHandler = (label?: LabelModelsConfig) => {
  const Admin = mongoose.model<AdminModel>(admin.prod, AdminSchema);
  const Blog = mongoose.model<BlogModel>(blog.prod, BlogSchema);

  const models: IModelsResponse = {
    Admin,
    Blog,
    ProdArticle: null,
    DevArticle: null
  };

  if (label) {
    models.ProdArticle = mongoose.model<ArticleModel>(
      articles[label].prod,
      ProdArticleSchema
    );

    models.DevArticle = mongoose.model<ArticleModel>(
      articles[label].dev,
      DevArticleSchema
    );
  }

  return models;
};

export default modelHandler;
