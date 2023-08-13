"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_1 = require("./gql/graphql");
/* // ---

// import base64Img from './base64';

web3Storage.upload(base64Img);

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

list();
retrieve();
checkStatus();

// --- */
dotenv_1.default.config();
const PORT = process.env.PORT || 4001;
const nodeEnv = process.env.NODE_ENV;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = new server_1.ApolloServer({
    typeDefs: graphql_1.typeDefs,
    resolvers: graphql_1.resolvers,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: Number(PORT) },
}).then(({ url }) => {
    console.log(``);
    console.log(`  * ${nodeEnv} server ★(◔.◔)★ ${String(url)}`);
    console.log(``);
});
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
// =======================
// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// // import { GraphQLDate } from 'graphql-iso-date';
// // import mongoose, { Model, Schema } from 'mongoose';
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// // import { v4 as uuid } from 'uuid';
// // import * as web3Storage from './ipfs/web3Storage';
// // import { DEFAULT_IPFS_CID } from './constants';
// import { resolvers, typeDefs } from './gql/graphql';
// /* // ---
// // import base64Img from './base64';
// web3Storage.upload(base64Img);
// const list = async () => {
//   const res = await web3Storage.list();
//   console.log('list:', res);
// };
// const retrieve = async () => {
//   const res = await web3Storage.retrieve(defaultCid);
//   console.log('retrieved cid:', res);
// };
// const checkStatus = async () => {
//   const res = await web3Storage.checkStatus(defaultCid);
//   console.log('status:', res);
// };
// list();
// retrieve();
// checkStatus();
// // --- */
// dotenv.config();
// // const db = process.env.MONGO_DB;
// const PORT = process.env.PORT || 4001;
// const nodeEnv = process.env.NODE_ENV;
// // const envLoginMila = process.env.LOGIN_MILA;
// // const envPasswordMila = process.env.PASSWORD_MILA;
// // const envLoginSerhii = process.env.LOGIN_SERHII;
// // const envPasswordSerhii = process.env.PASSWORD_SERHII;
// // const defaultCid = DEFAULT_IPFS_CID;
// // const typeDefs = `#graphql
// // scalar Date
// //   type Access {
// //     login: String
// //     password: String
// //     token: String
// //     name: String
// //   }
// //   type ApdateAdminResponse {
// //     token: String
// //     author: String
// //   }
// //   type IsAdminResponse {
// //     isAdmin: Boolean
// //     author: String
// //   }
// //   type Article {
// //     id: ID
// //     title: String
// //     description: String
// //     text: String
// //     author: String
// //     ipfs: String
// //     views: String
// //     tags: [String]
// //     timestamp: Date
// //   }
// //   input AccessInput {
// //     login: String
// //     password: String
// //     token: String
// //   }
// //   input ArticleInput {
// //     title: String!
// //     description: String!
// //     text: String!
// //     author: String!
// //     image: String
// //     ipfs: String
// //     tags: [String]
// //   }
// //   type Query {
// //     getAdmin(login: String!, password: String!): Access
// //     isAdmin(token: String!): IsAdminResponse
// //     articles: [Article]
// //     getArticleById(ID: ID!): Article
// //     getArticleByTitle(title: String!): Article
// //   }
// //   type Mutation {
// //     updateAdmin(input: AccessInput): ApdateAdminResponse
// //     addArticle(input: ArticleInput): Article
// //     deleteArticle(ID: ID!): Boolean
// //     editArticle(ID: ID!, articleInput: ArticleInput): Boolean
// //   }
// // `;
// // // console.log('nodeEnv prod:', nodeEnv === 'production');
// // // console.log('nodeEnv dev:', nodeEnv === 'development');
// // mongoose.connect(db);
// // const Admin = mongoose.model(
// //   'Admin',
// //   new mongoose.Schema({
// //     login: String,
// //     password: String,
// //     token: String,
// //     name: String,
// //   })
// // );
// // const defaultConfig = {
// //   title: String,
// //   description: String,
// //   text: String,
// //   author: String,
// //   ipfs: String,
// //   views: String,
// //   timestamp: { type: Date, default: Date.now },
// // };
// // // /*
// // const ProdArticle = mongoose.model(
// //   'prod_article',
// //   new mongoose.Schema({
// //     ...defaultConfig,
// //     tags: { type: [Schema.Types.String], default: [] },
// //   })
// // );
// // // */
// // const DevArticle = mongoose.model(
// //   'dev_article',
// //   new mongoose.Schema({
// //     ...defaultConfig,
// //     tags: { type: [Schema.Types.String], default: [] },
// //   })
// // );
// // // /*
// // const ArticleModel =
// //   process.env.NODE_ENV === 'production'
// //     ? ProdArticle
// //     : process.env.NODE_ENV === 'development' && DevArticle;
// // // */
// // // const ArticleModel = ProdArticle
// // // const ArticleModel = DevArticle;
// // const resolvers = {
// //   Query: {
// //     getAdmin: async (_: any, { login, password }: any) => {
// //       try {
// //         const admin = await Admin.find({ login, password });
// //         console.log('getAdmin:', admin);
// //         if (admin?.length) {
// //           return {
// //             login: admin[0].login,
// //             password: admin[0].password,
// //             token: admin[0].token,
// //             name: admin[0].name,
// //           };
// //         }
// //       } catch (e) {
// //         throw new Error(`Failed to fetch admin: ${e}`);
// //       }
// //     },
// //     isAdmin: async (_: any, { token }: { token: string }) => {
// //       try {
// //         const admin = await Admin.findOne({ token });
// //         return admin
// //           ? { isAdmin: true, author: admin.name }
// //           : { isAdmin: false, author: '' };
// //       } catch (e) {
// //         throw new Error(`Failed to check isAdmin: ${e}`);
// //       }
// //     },
// //     // -------------------------- Articles
// //     articles: async () => {
// //       try {
// //         const res = await ArticleModel.find();
// //         console.log('articles:', res?.length);
// //         // console.log('articles:', res);
// //         return res;
// //       } catch (error) {
// //         throw new Error('Failed to fetch articles');
// //       }
// //     },
// //     getArticleById: async (_: any, { ID }: any) => {
// //       const article = await ArticleModel.find({ _id: ID });
// //       console.log('getArticleById:', article);
// //       return {
// //         id: article[0]._id,
// //         title: article[0].title,
// //         description: article[0].description,
// //         text: article[0].text,
// //         author: article[0].author,
// //         ipfs: article[0].ipfs,
// //         views: article[0].views,
// //         tags: article[0].tags,
// //         timestamp: article[0].timestamp,
// //       };
// //     },
// //     async getArticleByTitle(_: any, { title }: any) {
// //       const article = await ArticleModel.find({ title });
// //       console.log('getArticleByTitle:', article);
// //       return {
// //         id: article[0]._id,
// //         title: article[0].title,
// //         description: article[0].description,
// //         text: article[0].text,
// //         author: article[0].author,
// //         ipfs: article[0].ipfs,
// //         views: article[0].views,
// //         tags: article[0].tags,
// //         timestamp: article[0].timestamp,
// //       };
// //     },
// //   },
// //   Mutation: {
// //     updateAdmin: async (_: any, { input }: any) => {
// //       const { login, password } = input;
// //       console.log('env access Mila:', envLoginMila, envPasswordMila);
// //       console.log('env access Serhii:', envLoginSerhii, envPasswordSerhii);
// //       const isMila = login == envLoginMila && password == envPasswordMila;
// //       const isSerhii = login == envLoginSerhii && password == envPasswordSerhii;
// //       if (isMila || isSerhii) {
// //         const admin = await getAdmin(input);
// //         const accessInput = {
// //           login,
// //           password,
// //           token: uuid(),
// //           name: isMila ? 'Mila' : 'Serhii',
// //         };
// //         // -------------------- Update:
// //         if (admin?.length) {
// //           const updatedAccess = (
// //             await Admin.updateOne({ _id: admin[0]._id }, { ...accessInput })
// //           ).modifiedCount;
// //           console.log('wasUpdated:', updatedAccess);
// //           if (updatedAccess) {
// //             const admin = await getAdmin(input);
// //             return {
// //               token: admin[0].token,
// //               author: admin[0].name,
// //             };
// //           } else throw new Error('Admin update error!');
// //         } else console.log('No admin in db:', admin);
// //         // -------------------- Create:
// //         const createAccess = new Admin({
// //           login,
// //           password,
// //           token: uuid(),
// //           name: isMila ? 'Mila' : 'Serhii',
// //         });
// //         const access = await createAccess.save();
// //         return {
// //           token: access.token,
// //           author: access.name,
// //         };
// //       } else throw new Error('Access denied!');
// //     },
// //     // -------------------------- Articles
// //     addArticle: async (_: any, { input }: any) => {
// //       const base64 = input.image;
// //       let cid: string = defaultCid;
// //       if (base64) {
// //         cid = await web3Storage.upload(base64);
// //       }
// //       const createArticle = new ArticleModel({
// //         title: input.title,
// //         description: input.description,
// //         text: input.text,
// //         author: input.author,
// //         ipfs: cid,
// //         tags: input.tags,
// //       });
// //       const res = await createArticle.save();
// //       console.log('addArticle:', res);
// //       return {
// //         title: res.title,
// //         description: res.description,
// //         text: res.text,
// //         author: res.author,
// //         ipfs: res.ipfs,
// //         views: res.views,
// //         tags: res.tags,
// //         timestamp: res.timestamp,
// //       };
// //     },
// //     deleteArticle: async (_: any, { ID }: any) => {
// //       const wasDeleted = (await ArticleModel.deleteOne({ _id: ID }))
// //         .deletedCount;
// //       console.log('wasDeleted:', wasDeleted);
// //       return wasDeleted;
// //     },
// //     async editArticle(_: any, { ID, articleInput }: any) {
// //       console.log('articleInput -->', articleInput);
// //       // /*
// //       const base64 = articleInput.image;
// //       let cid: string;
// //       if (base64) {
// //         console.log('is base64 -->', base64);
// //         cid = await web3Storage.upload(base64);
// //       }
// //       const updatedImage = { ...articleInput, ipfs: cid };
// //       const onlyText = { ...articleInput };
// //       delete onlyText.image;
// //       console.log('onlyText', onlyText);
// //       const wasEdited = (
// //         await ArticleModel.updateOne(
// //           { _id: ID },
// //           base64 ? { ...updatedImage } : { ...onlyText }
// //         )
// //       ).modifiedCount;
// //       console.log('wasEdited:', wasEdited);
// //       return wasEdited;
// //       // */
// //     },
// //   },
// //   Date: GraphQLDate,
// // };
// // const getAdmin = async (input: { login: string; password: string }) =>
// //   await Admin.find({ login: input.login, password: input.password });
// // --------------------------------- Server:
// // const model = ArticleModel.modelName;
// const app = express();
// app.use(cors());
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// startStandaloneServer(server, {
//   listen: { port: Number(PORT) },
// }).then(({ url }) => {
//   console.log(``);
//   console.log(`  * ${nodeEnv} server ★(◔.◔)★ ${String(url)}`);
//   // console.log(`  * ${nodeEnv} server ★(◔.◔)★ ${String(url)} - ${model} db`);
//   console.log(``);
// });
// /*
// import express, { Request, Response } from 'express';
// const app = express();
// const port = process.env.PORT || 8080;
// app.get('/', (_req: Request, res: Response) => {
//   return res.send('Express Typescript on Vercel');
// });
// app.get('/ping', (_req: Request, res: Response) => {
//   return res.send('pong 🏓');
// });
// app.listen(port, () => {
//   return console.log(`Server is listening on ${port}`);
// });
// */
//# sourceMappingURL=index.js.map