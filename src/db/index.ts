import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_DB;

mongoose.connect(db);

const Admin = mongoose.model(
  'Admin',
  new mongoose.Schema({
    login: String,
    password: String,
    token: String,
    name: String,
  })
);

const defaultConfig = {
  title: String,
  description: String,
  text: String,
  author: String,
  ipfs: String,
  views: String,
  timestamp: { type: Date, default: Date.now },
};

// const DevArticle = mongoose.model(
//   'dev_article',
//   new mongoose.Schema({
//     ...defaultConfig,
//     tags: { type: [Schema.Types.String], default: [] },
//   })
// );

/*
const ArticleModel =
  process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;
// */

// const ArticleModel = ProdArticle
// const ArticleModel = DevArticle;

// const AdminModel = mongoose.model(
//   'Admin',
//   new mongoose.Schema({
//     login: String,
//     password: String,
//     token: String,
//     name: String,
//   })
// );

// const defaultConfigSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   text: String,
//   author: String,
//   ipfs: String,
//   views: String,
//   timestamp: { type: Date, default: Date.now },
// });

/*
const ProdArticle = mongoose.model(
  'prod_article',
  new mongoose.Schema({
    ...defaultConfigSchema.obj,
    tags: { type: [Schema.Types.String], default: [] },
  })
);
// */

const DevArticle = mongoose.model(
  'dev_article',
  new mongoose.Schema({
    ...defaultConfig,
    tags: { type: [Schema.Types.String], default: [] },
  })
);

/*
const CurrentModel =
  process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;
// */

// const ArticleModel = ProdArticle
const CurrentModel = DevArticle;

export default { Admin, CurrentModel };
