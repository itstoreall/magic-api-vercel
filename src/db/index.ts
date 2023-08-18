import mongoose from 'mongoose';
import models from './modelHandler';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_DB;

mongoose.connect(db);

// const Admin = mongoose.model(
//   'Admin',
//   new mongoose.Schema({
//     login: String,
//     password: String,
//     token: String,
//     name: String,
//   })
// );

// const AdminSchema = new mongoose.Schema({
//   login: String,
//   password: String,
//   token: String,
//   name: String,
//   blogs: { type: [Schema.Types.String], default: [] },
// });

// const BlogSchema = new mongoose.Schema({
//   title: String,
//   authors: { type: [Schema.Types.String], default: [] },
// });

// const defaultConfig = {
//   title: String,
//   description: String,
//   text: String,
//   author: String,
//   ipfs: String,
//   views: String,
//   timestamp: { type: Date, default: Date.now },
// };

// const ProdArticleSchema = new mongoose.Schema({
//   ...defaultConfig,
//   tags: { type: [Schema.Types.String], default: [] },
// });

// const DevArticleSchema = new mongoose.Schema({
//   ...defaultConfig,
//   tags: { type: [Schema.Types.String], default: [] },
// });

// const Admin = mongoose.model('admin', schemas.AdminSchema);
// const Blog = mongoose.model('blog', schemas.BlogSchema);
// const ProdArticle = mongoose.model(
//   'prod_astraia_article',
//   schemas.ProdArticleSchema
// );
// const DevArticle = mongoose.model(
//   'dev_astraia_article',
//   schemas.DevArticleSchema
// );

// const Blog = mongoose.model(
//   'Blog',
//   new mongoose.Schema({
//     title: String,
//     authors: { type: [Schema.Types.String], default: [] },
//   })
// );

// const defaultConfig = {
//   title: String,
//   description: String,
//   text: String,
//   author: String,
//   ipfs: String,
//   views: String,
//   timestamp: { type: Date, default: Date.now },
// };

/*
const ProdArticle = mongoose.model(
  'prod_article',
  new mongoose.Schema({
    ...defaultConfig,
    tags: { type: [Schema.Types.String], default: [] },
  })
);
// */

// const DevArticle = mongoose.model(
//   'dev_article',
//   new mongoose.Schema({
//     ...defaultConfig,
//     tags: { type: [Schema.Types.String], default: [] },
//   })
// );

// /*
const CurrentModel =
  process.env.NODE_ENV === 'production'
    ? models.ProdArticle
    : process.env.NODE_ENV === 'development' && models.DevArticle;
// */

// const CurrentModel = ProdArticle
// const CurrentModel = DevArticle;

export default { Admin: models.Admin, CurrentModel, Blog: models.Blog };

/*
const AdminSchema = new mongoose.Schema({
  login: String,
  password: String,
  token: String,
  name: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }] // Reference to Blog documents
});

const Admin = mongoose.model('Admin', AdminSchema);

// Modify the Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  authors: [{ type: Schema.Types.ObjectId, ref: 'Admin' }], // Reference to Admin documents
});

const Blog = mongoose.model('Blog', BlogSchema);
*/
