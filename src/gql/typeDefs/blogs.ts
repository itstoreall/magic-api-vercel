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

  #type Query {
    #getBlog(title: String!): Blog
  #}

  type Mutation {
    deleteAuthorFromBlog(input: DeleteAuthorFromBlogInput): Boolean
  }
`;

export default blogTypeDefs;
