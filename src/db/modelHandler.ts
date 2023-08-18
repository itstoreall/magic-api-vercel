import mongoose, { Schema } from 'mongoose';

const AdminSchema = new mongoose.Schema({
  login: String,
  password: String,
  token: String,
  name: String,
  blogs: { type: [Schema.Types.String], default: [] },
});

const BlogSchema = new mongoose.Schema({
  title: String,
  authors: { type: [Schema.Types.String], default: [] },
});

const defaultConfig = {
  title: String,
  description: String,
  text: String,
  author: String,
  ipfs: String,
  views: String,
  timestamp: { type: Date, default: Date.now },
};

const ProdArticleSchema = new mongoose.Schema({
  ...defaultConfig,
  tags: { type: [Schema.Types.String], default: [] },
});

const DevArticleSchema = new mongoose.Schema({
  ...defaultConfig,
  tags: { type: [Schema.Types.String], default: [] },
});

const Admin = mongoose.model('admin', AdminSchema);
const Blog = mongoose.model('blog', BlogSchema);
const ProdArticle = mongoose.model('prod_astraia_article', ProdArticleSchema);
const DevArticle = mongoose.model('dev_astraia_article', DevArticleSchema);

const models = {
  Admin,
  Blog,
  ProdArticle,
  DevArticle,
};

export default models;
