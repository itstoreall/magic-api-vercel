const articleTypeDefs = `#graphql
  type Article {
    id: ID
    title: String
    description: String
    text: String
    author: String
    ipfs: String
    image: String
    views: String
    status: String
    tags: [String]
    timestamp: Date
  }

  type ArticleStatus {
    status: String
  }

  input ArticleInput {
    title: String!
    description: String!
    text: String!
    author: String!
    image: String
    ipfs: String
    views: String
    tags: [String]
  }

  type Query {
    articles(blog: String!, label: String): [Article]
    publishedArticles(blog: String!, label: String): [Article]
    getArticleById(blog: String!, ID: ID!): Article
    #getArticleByTitle(title: String!): Article
  }

  type Mutation {
    addArticle(blog: String!, input: ArticleInput!): Article
    deleteArticle(blog: String!, ID: ID!): Boolean
    publishArticle(blog: String!, ID: ID!): ArticleStatus
    editArticle(blog: String!, ID: ID!, articleInput: ArticleInput!): Boolean
    updateArticleViews(blog: String!, ID: String!): Boolean
  }
`;

export default articleTypeDefs;
