import { GraphQLDate } from 'graphql-iso-date';
import admins from './admins';
import articles from './articles';

const resolvers = {
  Query: { ...admins.Query, ...articles.Query },
  Mutation: { ...admins.Mutation, ...articles.Mutation },
  Date: GraphQLDate,
};

export default resolvers;
