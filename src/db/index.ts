import mongoose from 'mongoose';
import models from './modelHandler';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_DB;

mongoose.connect(db);

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
