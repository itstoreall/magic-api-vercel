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
