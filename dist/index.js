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
dotenv_1.default.config();
const PORT = process.env.PORT || 4001;
mongoose_1.default.connect(process.env.MONGO_DB);
const typeDefs = `#graphql

  type Article {
    id: ID
    title: String
    article: String
    author: String
    image: String 
  }

  input ArticleInput {
    title: String
    article: String
    author: String
    image: String 
  }

  type Query {
    articles: [Article]
    getArticleById(ID: ID!): Article
    getArticleByTitle(title: String!): Article
  }

  type Mutation {
    addArticle(input: ArticleInput): Article
    deleteArticle(ID: ID!): Boolean
    editArticle(ID: ID!, articleInput: ArticleInput): Boolean
  }
`;
const Article = mongoose_1.default.model('Article', new mongoose_1.default.Schema({
    title: String,
    article: String,
    author: String,
    image: String,
}));
const resolvers = {
    Query: {
        articles: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield Article.find();
                console.log('articles:', res === null || res === void 0 ? void 0 : res.length);
                return res;
            }
            catch (error) {
                throw new Error('Failed to fetch books');
            }
        }),
        getArticleById: (_, { ID }) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield Article.find({ _id: ID });
            console.log('getArticleById:', res);
            return {
                id: res[0]._id,
                title: res[0].title,
                article: res[0].article,
                author: res[0].author,
                image: res[0].image,
            };
        }),
        getArticleByTitle(_, { title }) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield Article.find({ title });
                console.log('getArticleByTitle:', res);
                return {
                    id: res[0]._id,
                    title: res[0].title,
                    article: res[0].article,
                    author: res[0].author,
                    image: res[0].image,
                };
            });
        },
    },
    Mutation: {
        addArticle: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const createArticle = new Article({
                title: input.title,
                article: input.article,
                author: input.author,
                image: input.image,
            });
            const res = yield createArticle.save();
            console.log('addArticle:', res);
            return {
                title: res.title,
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