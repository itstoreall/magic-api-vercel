"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogTypeDefs = `#graphql
  type Blog {
    title: String
    authors: [String]
    tags: [String]
  }

  input DeleteAuthorFromBlogInput {
    blog: String!
    author: String!
    token: String!
  }

  input HandleAuthorInBlogInput {
    blog: String!
    author: String!
    token: String!
  }

  input HandleBlogTagsInput {
    blog: String!
    tags: [String]!
    token: String!
  }

   type AllBlogsResponse {
    id: ID
    title: String
    authors: [String]
  }

   type AllBlogTagsResponse {
    tags: [String]
  }

  type Query {
    getAllBlogs(token: String!): [AllBlogsResponse]
    getBlogTags(token: String!, blog: String!): AllBlogTagsResponse
    #getBlog(title: String!): Blog
  }

  type Mutation {
    deleteAuthorFromBlog(input: HandleAuthorInBlogInput): Boolean
    addAuthorToBlog(input: HandleAuthorInBlogInput): Boolean
    updateBlogTags(input: HandleBlogTagsInput): Boolean
  }
`;
exports.default = blogTypeDefs;
//# sourceMappingURL=blogs.js.map