import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_DB);

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

const Admin = mongoose.model(
  'Admin',
  new mongoose.Schema({
    login: String,
    password: String,
    token: String,
  })
);

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
      const article = await Article.find({ _id: ID });

      console.log('getArticleById:', article);

      return {
        id: article[0]._id,
        title: article[0].title,
        description: article[0].description,
        article: article[0].article,
        author: article[0].author,
        image: article[0].image,
      };
    },

    async getArticleByTitle(_: any, { title }: any) {
      const article = await Article.find({ title });

      console.log('getArticleByTitle:', article);

      return {
        id: article[0]._id,
        title: article[0].title,
        description: article[0].description,
        article: article[0].article,
        author: article[0].author,
        image: article[0].image,
      };
    },
  },

  Mutation: {
    admin: async (_: any, { input }: any) => {
      const { login, password } = input;

      if (login === process.env.LOGIN && password === process.env.PASSWORD) {
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

async function getAdmin(login: string, password: string) {
  const res = await Admin.find({ login, password });
  console.log('getAdmin:', res);

  let _token = '';

  if (!res[0]?.token) {
    _token = uuid();
  } else console.log('getAdmin:', res);

  return {
    login: res[0].login,
    password: res[0].password,
    token: _token,
  };
}

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
