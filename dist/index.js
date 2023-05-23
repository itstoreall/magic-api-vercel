"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const PORT = process.env.PORT || 4001;
mongoose_1.default.connect(process.env.MONGO_DB);
const typeDefs = `#graphql

  type Access {
    login: String
    password: String
    token: String
  }

  type Article {
    id: ID
    title: String
    description: String
    article: String
    author: String
    image: String 
  }

  input AccessInput {
    login: String
    password: String
    token: String
  }

  input ArticleInput {
    title: String!
    description: String!
    article: String!
    author: String!
    image: String 
  }

  type Query {
    getAdmin(login: String!, password: String!): Access
    articles: [Article]
    getArticleById(ID: ID!): Article
    getArticleByTitle(title: String!): Article
  }

  type Mutation {
    admin(input: AccessInput): Access
    addArticle(input: ArticleInput): Article
    deleteArticle(ID: ID!): Boolean
    editArticle(ID: ID!, articleInput: ArticleInput): Boolean
  }
`;
const Admin = mongoose_1.default.model('Admin', new mongoose_1.default.Schema({
    login: String,
    password: String,
    token: String,
}));
const Article = mongoose_1.default.model('Article', new mongoose_1.default.Schema({
    title: String,
    description: String,
    article: String,
    author: String,
    image: String,
}));
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
        articles: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield Article.find();
                console.log('articles:', res === null || res === void 0 ? void 0 : res.length);
                return res;
            }
            catch (error) {
                throw new Error('Failed to fetch articles');
            }
        }),
        getArticleById: (_, { ID }) => __awaiter(void 0, void 0, void 0, function* () {
            const article = yield Article.find({ _id: ID });
            console.log('getArticleById:', article);
            return {
                id: article[0]._id,
                title: article[0].title,
                description: article[0].description,
                article: article[0].article,
                author: article[0].author,
                image: article[0].image,
            };
        }),
        getArticleByTitle(_, { title }) {
            return __awaiter(this, void 0, void 0, function* () {
                const article = yield Article.find({ title });
                console.log('getArticleByTitle:', article);
                return {
                    id: article[0]._id,
                    title: article[0].title,
                    description: article[0].description,
                    article: article[0].article,
                    author: article[0].author,
                    image: article[0].image,
                };
            });
        },
    },
    Mutation: {
        admin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { login, password } = input;
            if (login === process.env.LOGIN && password === process.env.PASSWORD) {
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
        addArticle: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const createArticle = new Article({
                title: input.title,
                description: input.description,
                article: input.article,
                author: input.author,
                image: input.image,
            });
            const res = yield createArticle.save();
            console.log('addArticle:', res);
            return {
                title: res.title,
                description: res.description,
                article: res.article,
                author: res.author,
                image: res.image,
            };
        }),
        deleteArticle: (_, { ID }) => __awaiter(void 0, void 0, void 0, function* () {
            const wasDeleted = (yield Article.deleteOne({ _id: ID })).deletedCount;
            console.log('wasDeleted:', wasDeleted);
            return wasDeleted;
        }),
        editArticle(_, { ID, articleInput }) {
            return __awaiter(this, void 0, void 0, function* () {
                const wasEdited = (yield Article.updateOne({ _id: ID }, Object.assign({}, articleInput))).modifiedCount;
                console.log('wasEdited:', wasEdited);
                return wasEdited;
            });
        },
    },
};
function getAdmin(login, password) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield Admin.find({ login, password });
        console.log('getAdmin:', res);
        let _token = '';
        if (!((_a = res[0]) === null || _a === void 0 ? void 0 : _a.token)) {
            _token = (0, uuid_1.v4)();
        }
        else
            console.log('getAdmin:', res);
        return {
            login: res[0].login,
            password: res[0].password,
            token: _token,
        };
    });
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: Number(PORT) },
}).then(({ url }) => console.log(`🚀 Server listening at: ${String(url)}`));
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