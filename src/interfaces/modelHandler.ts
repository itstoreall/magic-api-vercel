import mongoose from 'mongoose';
import { LabelModelsConfig } from 'admin';

export interface AdminModel extends mongoose.Document {
  token: string;
  name: string;
  blogs: string[];
}

export interface BlogModel extends mongoose.Document {
  title: string;
  authors: string[];
}

export interface ArticleModel extends mongoose.Document {
  title: string;
  description: string;
  text: string;
  author: string;
  ipfs: string;
  views: string;
  timestamp: Date;
  tags: string[];
}

export interface IArticlesFieldsModelsConfig {
  label: LabelModelsConfig;
  prod: string;
}

export interface IArticlesModelsConfig {
  astraia: IArticlesFieldsModelsConfig;
  healthy: IArticlesFieldsModelsConfig;
}

export interface IModelsConfig {
  admin: { label: string; prod: string };
  blog: { label: string; prod: string };
  articles: IArticlesModelsConfig;
}

export interface IModelsResponse {
  Admin: mongoose.Model<AdminModel>;
  Blog: mongoose.Model<BlogModel>;
  ProdArticle: mongoose.Model<ArticleModel> | null;
  DevArticle: mongoose.Model<ArticleModel> | null;
}
