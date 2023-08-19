"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const articleTypeDefs = `#graphql
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
exports.default = articleTypeDefs;
//# sourceMappingURL=articles.js.map