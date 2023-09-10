import { GraphQLDate } from 'graphql-iso-date';
import admin from './admin';
import blog from './blog';
import articles from './articles';

const resolvers = {
  Query: { ...admin.Query, ...blog.Query, ...articles.Query },
  Mutation: { ...admin.Mutation, ...blog.Mutation, ...articles.Mutation },
  Date: GraphQLDate,
};

export default resolvers;
