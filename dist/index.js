"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_iso_date_1 = require("graphql-iso-date");
const mongoose_1 = __importStar(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const web3Storage = __importStar(require("./ipfs/web3Storage"));
const constants_1 = require("./constants");
// import base64Img from './base64';
// import cloudinaryHandler from './cloudinaryHandler';
// import { uploadToIpfs } from './ipfs';
// import uploadToIpfs from './ipfs/uploadToIpfs';
dotenv_1.default.config();
const defaultCid = constants_1.DEFAULT_IPFS_CID;
// ---
// uploadToIpfs(base64Img);
// const secureUrl = uploadToIpfs(getImg);
// console.log(222, 'uploaded secureUrl:', secureUrl);
// const uploadedImg = cloudinaryHandler.uploadImage(getImg);
// console.log('uploadedImg', uploadedImg);
// cloudinaryHandler.deleteImage('astraia_uploads/usspgwq5l2ow9euj9eru');
// console.log('deletedImg', deletedImg);
// const imageUrl =
//   'https://res.cloudinary.com/astraia/image/upload/v1688374698/astraia_uploads/cd0urvylztaii5kptzf3.png';
// const publicId = imageUrl.split('/').pop().split('.').slice(0, -1).join('.');
// console.log('publicId', publicId);
// cloudinaryHandler.deleteImage(publicId);
// web3Storage.upload(base64Img);
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield web3Storage.list();
    console.log('list:', res);
});
const retrieve = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield web3Storage.retrieve(defaultCid);
    console.log('retrieved cid:', res);
});
const checkStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield web3Storage.checkStatus(defaultCid);
    console.log('status:', res);
});
// list();
// retrieve();
// checkStatus();
// ---
mongoose_1.default.connect(process.env.MONGO_DB);
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
const Admin = mongoose_1.default.model('Admin', new mongoose_1.default.Schema({
    login: String,
    password: String,
    token: String,
}));
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
const ProdArticle = mongoose_1.default.model('prod_article', new mongoose_1.default.Schema(Object.assign(Object.assign({}, defaultConfig), { tags: { type: [mongoose_1.Schema.Types.String], default: [] } })));
const DevArticle = mongoose_1.default.model('dev_article', new mongoose_1.default.Schema(Object.assign(Object.assign({}, defaultConfig), { tags: { type: [mongoose_1.Schema.Types.String], default: [] } })));
const ArticleModel = process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;
const resolvers = {
    Query: {
        getAdmin: (_, { login, password }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const admin = yield Admin.find({ login, password });
                console.log('getAdmin:', admin);
                if (admin === null || admin === void 0 ? void 0 : admin.length) {
                    return {
                        login: admin[0].login,
                        password: admin[0].password,
                        token: admin[0].token,
                    };
                }
            }
            catch (e) {
                throw new Error(`Failed to fetch admin: ${e}`);
            }
        }),
        isAdmin: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const admin = yield Admin.findOne({ token });
                console.log('isAdmin:', admin);
                return admin ? admin.token === token : false;
            }
            catch (e) {
                throw new Error(`Failed to check isAdmin: ${e}`);
            }
        }),
        // -------------------------- Articles
        articles: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield ArticleModel.find();
                console.log('articles:', res === null || res === void 0 ? void 0 : res.length);
                return res;
            }
            catch (error) {
                throw new Error('Failed to fetch articles');
            }
        }),
        getArticleById: (_, { ID }) => __awaiter(void 0, void 0, void 0, function* () {
            const article = yield ArticleModel.find({ _id: ID });
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
        }),
        getArticleByTitle(_, { title }) {
            return __awaiter(this, void 0, void 0, function* () {
                const article = yield ArticleModel.find({ title });
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
            });
        },
    },
    Mutation: {
        updateAdmin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { login, password } = input;
            console.log('env access:', envLogin, envPassword);
            if (login == envLogin && password == envPassword) {
                const admin = yield getAdmin(input);
                const accessInput = {
                    login,
                    password,
                    token: (0, uuid_1.v4)(),
                };
                // -------------------- Update:
                if (admin === null || admin === void 0 ? void 0 : admin.length) {
                    const updatedAccess = (yield Admin.updateOne({ _id: admin[0]._id }, Object.assign({}, accessInput))).modifiedCount;
                    console.log('wasUpdated:', updatedAccess);
                    if (updatedAccess) {
                        const admin = yield getAdmin(input);
                        return {
                            login: admin[0].login,
                            password: admin[0].password,
                            token: admin[0].token,
                        };
                    }
                    else
                        throw new Error('Admin update error!');
                }
                else
                    console.log('No admin in db:', admin);
                // -------------------- Create:
                const createAccess = new Admin({
                    login,
                    password,
                    token: (0, uuid_1.v4)(),
                });
                const access = yield createAccess.save();
                return {
                    login: access.login,
                    password: access.password,
                    token: access.token,
                };
            }
            else
                throw new Error('Access denied!');
        }),
        // -------------------------- Articles
        addArticle: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            // const secureUrl = await cloudinaryHandler.uploadImage(input.image);
            // const secureUrl = await uploadToIpfs(input.image);
            // console.log(222, 'uploaded secureUrl:', secureUrl);
            // console.log('image', input.image);
            const cid = yield web3Storage.upload(input.image);
            const createArticle = new ArticleModel({
                title: input.title,
                description: input.description,
                text: input.text,
                author: input.author,
                image: input.image,
                ipfs: cid ? cid : defaultCid,
                tags: input.tags,
            });
            const res = yield createArticle.save();
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
        }),
        deleteArticle: (_, { ID }) => __awaiter(void 0, void 0, void 0, function* () {
            const wasDeleted = (yield ArticleModel.deleteOne({ _id: ID }))
                .deletedCount;
            console.log('wasDeleted:', wasDeleted);
            return wasDeleted;
        }),
        editArticle(_, { ID, articleInput }) {
            return __awaiter(this, void 0, void 0, function* () {
                // console.log(222, 'articleInput', articleInput);
                // console.log('image', input.image);
                const cid = yield web3Storage.upload(articleInput.image);
                const wasEdited = (yield ArticleModel.updateOne({ _id: ID }, Object.assign(Object.assign({}, articleInput), { ipfs: cid ? cid : defaultCid }))).modifiedCount;
                console.log('wasEdited:', wasEdited);
                return wasEdited;
            });
        },
    },
    Date: graphql_iso_date_1.GraphQLDate,
};
const getAdmin = (input) => __awaiter(void 0, void 0, void 0, function* () { return yield Admin.find({ login: input.login, password: input.password }); });
// --------------------------------- Server:
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: Number(PORT) },
}).then(({ url }) => console.log(`  * ${process.env.NODE_ENV} server ★(◔.◔)★ ${String(url)}`));
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
//# sourceMappingURL=index.js.map