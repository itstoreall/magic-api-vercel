const blogTypeDefs = `#graphql
  type Blog {
    title: String
    authors: [String]
  }

  #type Query {
    #getBlog(title: String!): Blog
  #}

  #type Mutation {
    #updateAdmin(input: AccessInput): UpdateAdminResponse
  #}
`;

export default blogTypeDefs;
