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
    articles(blog: String!): [Article]
    getArticleById(blog: String!, ID: ID!): Article
    #getArticleByTitle(title: String!): Article
  }

  type Mutation {
    addArticle(blog: String!, input: ArticleInput!): Article
    deleteArticle(blog: String!, ID: ID!): Boolean
    editArticle(blog: String!, ID: ID!, articleInput: ArticleInput): Boolean
  }
`;

export default articleTypeDefs;
