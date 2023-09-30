import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import cors from 'cors';
import db from './db';
import typeDefs from './gql/typeDefs';
import resolvers from './gql/resolvers';

const nodeEnv = process.env.NODE_ENV;
const PORT = process.env.PORT || 4001;
// const model = db.CurrentModel.modelName;
// const model = db.CurrentModel.modelName;

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: Number(PORT) },
}).then(({ url }) => {
  console.log(``);
  console.log(`  * ${nodeEnv} server ★(◔.◔)★ ${String(url)}`); //  - ${model} db
  console.log(``);
});
