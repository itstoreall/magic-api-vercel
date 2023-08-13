import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import cors from 'cors';
import typeDefs from './gql/typeDefs';
import resolvers from './gql/resolvers';

const PORT = process.env.PORT || 4001;
const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: Number(PORT) },
}).then(({ url }) => console.log(`  * server ★(◔.◔)★ ${String(url)}`));
