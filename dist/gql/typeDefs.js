"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql
  scalar Date

  type Access {
    login: String
    password: String
    token: String
    name: String
  }

  type ApdateAdminResponse {
    token: String
    author: String
  }

  type IsAdminResponse {
    isAdmin: Boolean
    author: String
  }

  type Article {
    id: ID
    title: String
    description: String
    text: String
    author: String
    ipfs: String 
    views: String
    tags: [String]
    timestamp: Date
  }

  input AccessInput {
    login: String
    password: String
    token: String
  }

  input ArticleInput {
    title: String!
    description: String!
    text: String!
    author: String!
    image: String 
    ipfs: String 
    tags: [String]
  }

  type Query {
    getAdmin(login: String!, password: String!): Access
    isAdmin(token: String!): IsAdminResponse
    articles: [Article]
    getArticleById(ID: ID!): Article
    getArticleByTitle(title: String!): Article
  }

  type Mutation {
    updateAdmin(input: AccessInput): ApdateAdminResponse
    addArticle(input: ArticleInput): Article
    deleteArticle(ID: ID!): Boolean
    editArticle(ID: ID!, articleInput: ArticleInput): Boolean
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map