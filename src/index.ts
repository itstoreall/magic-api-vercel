import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_DB);

const typeDefs = `#graphql

  type Article {
    id: ID
    title: String
    description: String
    article: String
    author: String
    image: String 
  }

  input ArticleInput {
    title: String!
    description: String!
    article: String!
    author: String!
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

const Article = mongoose.model(
  'Article',
  new mongoose.Schema({
    title: String,
    description: String,
    article: String,
    author: String,
    image: String,
  })
);

const resolvers = {
  Query: {
    articles: async () => {
      try {
        const res = await Article.find();

        console.log('articles:', res?.length);

        return res;
      } catch (error) {
        throw new Error('Failed to fetch articles');
      }
    },

    getArticleById: async (_: any, { ID }: any) => {
      const res = await Article.find({ _id: ID });

      console.log('getArticleById:', res);

      return {
        id: res[0]._id,
        title: res[0].title,
        description: res[0].description,
        article: res[0].article,
        author: res[0].author,
        image: res[0].image,
      };
    },

    async getArticleByTitle(_: any, { title }: any) {
      const res = await Article.find({ title });

      console.log('getArticleByTitle:', res);

      return {
        id: res[0]._id,
        title: res[0].title,
        description: res[0].description,
        article: res[0].article,
        author: res[0].author,
        image: res[0].image,
      };
    },
  },

  Mutation: {
    addArticle: async (_: any, { input }: any) => {
      const createArticle = new Article({
        title: input.title,
        description: input.description,
        article: input.article,
        author: input.author,
        image: input.image,
      });

      const res = await createArticle.save();

      console.log('addArticle:', res);

      return {
        title: res.title,
        description: res.description,
        article: res.article,
        author: res.author,
        image: res.image,
      };
    },

    deleteArticle: async (_: any, { ID }: any) => {
      const wasDeleted = (await Article.deleteOne({ _id: ID })).deletedCount;

      console.log('wasDeleted:', wasDeleted);

      return wasDeleted;
    },

    async editArticle(_: any, { ID, articleInput }: any) {
      const wasEdited = (
        await Article.updateOne({ _id: ID }, { ...articleInput })
      ).modifiedCount;

      console.log('wasEdited:', wasEdited);

      return wasEdited;
    },
  },
};

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
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
