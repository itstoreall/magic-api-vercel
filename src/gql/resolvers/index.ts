import { GraphQLDate } from 'graphql-iso-date';
import admin from './admin';
import blog from './blog';
import article from './article';

const resolvers = {
  Query: { ...admin.Query, ...blog.Query, ...article.Query },
  Mutation: { ...admin.Mutation, ...blog.Mutation, ...article.Mutation },
  Date: GraphQLDate,
};

export default resolvers;
