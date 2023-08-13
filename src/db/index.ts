import mongoose, { Schema, Document, Model } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_DB;

mongoose.connect(db);

export interface IAdminModel extends Document {
  login: string;
  password: string;
  token: string;
  name: string;
}

export interface IDefaultConfig {
  title: string;
  description: string;
  text: string;
  author: string;
  ipfs: string;
  views: string;
  timestamp: Date;
}

const AdminModel: Model<IAdminModel> = mongoose.model<IAdminModel>(
  'Admin',
  new mongoose.Schema({
    login: String,
    password: String,
    token: String,
    name: String,
  })
);

const defaultConfigSchema = new mongoose.Schema({
  title: String,
  description: String,
  text: String,
  author: String,
  ipfs: String,
  views: String,
  timestamp: { type: Date, default: Date.now },
});
// timestamp: { type: Date, default: Date.now },

export interface IArticleModel extends Document, IDefaultConfig {
  tags: string[];
}

const ProdArticle = mongoose.model<IArticleModel>(
  'prod_article',
  new mongoose.Schema({
    // ...defaultConfig,
    ...defaultConfigSchema.obj,
    tags: { type: [Schema.Types.String], default: [] },
  })
);

const DevArticle = mongoose.model<IArticleModel>(
  'dev_article',
  new mongoose.Schema({
    // ...defaultConfig,
    ...defaultConfigSchema.obj,
    tags: { type: [Schema.Types.String], default: [] },
  })
);

const CurrentModel =
  process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;

export default { AdminModel, CurrentModel };
