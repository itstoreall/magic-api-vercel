const blogTypeDefs = `#graphql
  type Blog {
    title: String
    authors: [String]
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

   type AllBlogsResponse {
    id: ID
    title: String
    authors: [String]
  }

  type Query {
    getAllBlogs(token: String!): [AllBlogsResponse]
    #getBlog(title: String!): Blog
  }

  type Mutation {
    deleteAuthorFromBlog(input: HandleAuthorInBlogInput): Boolean
    addAuthorToBlog(input: HandleAuthorInBlogInput): Boolean
  }
`;

export default blogTypeDefs;
