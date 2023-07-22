import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLDate } from 'graphql-iso-date';
import mongoose, { Schema } from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import * as web3Storage from './ipfs/web3Storage';
import { DEFAULT_IPFS_CID } from './constants';
// import base64Img from './base64';

dotenv.config();

const defaultCid = DEFAULT_IPFS_CID;

// ---

// web3Storage.upload(base64Img);

const list = async () => {
  const res = await web3Storage.list();
  console.log('list:', res);
};

const retrieve = async () => {
  const res = await web3Storage.retrieve(defaultCid);
  console.log('retrieved cid:', res);
};

const checkStatus = async () => {
  const res = await web3Storage.checkStatus(defaultCid);
  console.log('status:', res);
};

// list();
// retrieve();
// checkStatus();

// ---

mongoose.connect(process.env.MONGO_DB);

const PORT = process.env.PORT || 4001;
const envLogin = process.env.LOGIN;
const envPassword = process.env.PASSWORD;

const typeDefs = `#graphql
scalar Date

  type Access {
    login: String
    password: String
    token: String
  }

  type Article {
    id: ID
    title: String
    description: String
    text: String
    author: String
    image: String 
    ipfs: String 
    views: String
    tags: [String]
    timestamp: Date
  }

  input AccessInput {
    login: String
    password: String
    token: String
  }

  input ArticleInput {
    title: String!
    description: String!
    text: String!
    author: String!
    image: String 
    ipfs: String 
    tags: [String]
  }

  type Query {
    getAdmin(login: String!, password: String!): Access
    isAdmin(token: String!): Boolean
    articles: [Article]
    getArticleById(ID: ID!): Article
    getArticleByTitle(title: String!): Article
  }

  type Mutation {
    updateAdmin(input: AccessInput): Access
    addArticle(input: ArticleInput): Article
    deleteArticle(ID: ID!): Boolean
    editArticle(ID: ID!, articleInput: ArticleInput): Boolean
  }
`;

console.log('NODE_ENV production:', process.env.NODE_ENV === 'production');
console.log('NODE_ENV development:', process.env.NODE_ENV === 'development');

const Admin = mongoose.model(
  'Admin',
  new mongoose.Schema({
    login: String,
    password: String,
    token: String,
  })
);

const defaultConfig = {
  title: String,
  description: String,
  text: String,
  author: String,
  image: String,
  ipfs: String,
  views: String,
  timestamp: { type: Date, default: Date.now },
};

const ProdArticle = mongoose.model(
  'prod_article',
  new mongoose.Schema({
    ...defaultConfig,
    tags: { type: [Schema.Types.String], default: [] },
  })
);

const DevArticle = mongoose.model(
  'dev_article',
  new mongoose.Schema({
    ...defaultConfig,
    tags: { type: [Schema.Types.String], default: [] },
  })
);

const ArticleModel =
  process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;

const resolvers = {
  Query: {
    getAdmin: async (_: any, { login, password }: any) => {
      try {
        const admin = await Admin.find({ login, password });

        console.log('getAdmin:', admin);

        if (admin?.length) {
          return {
            login: admin[0].login,
            password: admin[0].password,
            token: admin[0].token,
          };
        }
      } catch (e) {
        throw new Error(`Failed to fetch admin: ${e}`);
      }
    },

    isAdmin: async (_: any, { token }: any) => {
      try {
        const admin = await Admin.findOne({ token });

        console.log('isAdmin:', admin);

        return admin ? admin.token === token : false;
      } catch (e) {
        throw new Error(`Failed to check isAdmin: ${e}`);
      }
    },

    // -------------------------- Articles

    articles: async () => {
      try {
        const res = await ArticleModel.find();

        console.log('articles:', res?.length);

        return res;
      } catch (error) {
        throw new Error('Failed to fetch articles');
      }
    },

    getArticleById: async (_: any, { ID }: any) => {
      const article = await ArticleModel.find({ _id: ID });

      console.log('getArticleById:', article);

      return {
        id: article[0]._id,
        title: article[0].title,
        description: article[0].description,
        text: article[0].text,
        author: article[0].author,
        image: article[0].image,
        ipfs: article[0].ipfs,
        views: article[0].views,
        tags: article[0].tags,
        timestamp: article[0].timestamp,
      };
    },

    async getArticleByTitle(_: any, { title }: any) {
      const article = await ArticleModel.find({ title });

      console.log('getArticleByTitle:', article);

      return {
        id: article[0]._id,
        title: article[0].title,
        description: article[0].description,
        text: article[0].text,
        author: article[0].author,
        image: article[0].image,
        ipfs: article[0].ipfs,
        views: article[0].views,
        tags: article[0].tags,
        timestamp: article[0].timestamp,
      };
    },
  },

  Mutation: {
    updateAdmin: async (_: any, { input }: any) => {
      const { login, password } = input;

      console.log('env access:', envLogin, envPassword);

      if (login == envLogin && password == envPassword) {
        const admin = await getAdmin(input);

        const accessInput = {
          login,
          password,
          token: uuid(),
        };

        // -------------------- Update:

        if (admin?.length) {
          const updatedAccess = (
            await Admin.updateOne({ _id: admin[0]._id }, { ...accessInput })
          ).modifiedCount;

          console.log('wasUpdated:', updatedAccess);

          if (updatedAccess) {
            const admin = await getAdmin(input);

            return {
              login: admin[0].login,
              password: admin[0].password,
              token: admin[0].token,
            };
          } else throw new Error('Admin update error!');
        } else console.log('No admin in db:', admin);

        // -------------------- Create:

        const createAccess = new Admin({
          login,
          password,
          token: uuid(),
        });

        const access = await createAccess.save();

        return {
          login: access.login,
          password: access.password,
          token: access.token,
        };
      } else throw new Error('Access denied!');
    },

    // -------------------------- Articles

    addArticle: async (_: any, { input }: any) => {
      // const secureUrl = await cloudinaryHandler.uploadImage(input.image);
      // const secureUrl = await uploadToIpfs(input.image);

      // console.log(222, 'uploaded secureUrl:', secureUrl);

      // console.log('image', input.image);

      const cid = await web3Storage.upload(input.image);

      const createArticle = new ArticleModel({
        title: input.title,
        description: input.description,
        text: input.text,
        author: input.author,
        image: input.image,
        ipfs: cid ? cid : defaultCid,
        tags: input.tags,
      });

      const res = await createArticle.save();

      console.log('addArticle:', res);

      return {
        title: res.title,
        description: res.description,
        text: res.text,
        author: res.author,
        image: res.image,
        ipfs: res.ipfs,
        views: res.views,
        tags: res.tags,
        timestamp: res.timestamp,
      };
    },

    deleteArticle: async (_: any, { ID }: any) => {
      const wasDeleted = (await ArticleModel.deleteOne({ _id: ID }))
        .deletedCount;

      console.log('wasDeleted:', wasDeleted);

      return wasDeleted;
    },

    async editArticle(_: any, { ID, articleInput }: any) {
      // console.log(222, 'articleInput', articleInput);

      // console.log('image', input.image);

      const cid = await web3Storage.upload(articleInput.image);

      const wasEdited = (
        await ArticleModel.updateOne(
          { _id: ID },
          // { ...articleInput }
          { ...articleInput, ipfs: cid ? cid : defaultCid }
        )
      ).modifiedCount;

      console.log('wasEdited:', wasEdited);

      return wasEdited;
    },
  },

  Date: GraphQLDate,
};

const getAdmin = async (input: { login: string; password: string }) =>
  await Admin.find({ login: input.login, password: input.password });

// --------------------------------- Server:

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: Number(PORT) },
}).then(({ url }) =>
  console.log(`  * ${process.env.NODE_ENV} server ★(◔.◔)★ ${String(url)}`)
);

/*
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel');
});

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
*/
