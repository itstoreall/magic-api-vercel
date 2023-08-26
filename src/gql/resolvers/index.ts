import { GraphQLDate } from 'graphql-iso-date';
import admin from './admin';
import articles from './articles';

const resolvers = {
  Query: { ...admin.Query, ...articles.Query },
  Mutation: { ...admin.Mutation, ...articles.Mutation },
  Date: GraphQLDate,
};

export default resolvers;
