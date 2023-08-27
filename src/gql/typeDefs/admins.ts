const adminTypeDefs = `#graphql
  type Access {
    token: String
    name: String
  }

  input CredentialsInput {
    login: String
    password: String
  }

  input AddAuthorInput {
    blog: String
    author: String
    credentials: CredentialsInput
    token: String
  }

  input AccessInput {
    blog: String
    credentials: CredentialsInput
    token: String
  }

  type IsAdminResponse {
    isAdmin: Boolean
    author: String
    blog: String
  }

  type AddAdminResponse {
    name: String
    blogs: [String]
    coauthors: [String]
  }

  type UpdateAdminResponse {
    token: String
    name: String
    blogs: [String]
  }
  
  type Query {
    #getAdmin(login: String!, password: String!): Access
    isAdmin(token: String! blog: String!): IsAdminResponse
  }

  type Mutation {
    addAdmin(input: AddAuthorInput): AddAdminResponse
    updateAdmin(input: AccessInput): UpdateAdminResponse
    deleteAdmin(ID: ID!): Boolean
  }
`;

export default adminTypeDefs;
