import mongoose, { Schema, Model } from 'mongoose';
import dotenv from 'dotenv';
import { IAdminModel, IArticleModel } from '../../src/interfaces/db';
dotenv.config();

const db = process.env.MONGO_DB;

mongoose.connect(db);

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

const ProdArticle = mongoose.model<IArticleModel>(
  'prod_article',
  new mongoose.Schema({
    ...defaultConfigSchema.obj,
    tags: { type: [Schema.Types.String], default: [] },
  })
);

const DevArticle = mongoose.model<IArticleModel>(
  'dev_article',
  new mongoose.Schema({
    ...defaultConfigSchema.obj,
    tags: { type: [Schema.Types.String], default: [] },
  })
);

const CurrentModel =
  process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;

export default { AdminModel, CurrentModel };
