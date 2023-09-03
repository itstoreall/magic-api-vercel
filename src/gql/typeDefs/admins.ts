const adminTypeDefs = `#graphql
  type Access {
    token: String!
    name: String!
  }

  input CredentialsInput {
    login: String!
    password: String!
  }

  input AddNewAuthorInput {
    blog: String!
    author: String!
    credentials: CredentialsInput!
    token: String!
  }

  input AccessInput {
    blog: String!
    credentials: CredentialsInput!
    token: String
  }

  type AllAdminsResponse {
    id: ID
    name: String
    blogs: [String]
  }

  type IsAdminResponse {
    isAdmin: Boolean
    author: String
    blog: String
  }

  type AddNewAuthorResponse {
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
    getAllAdmins(token: String!): [AllAdminsResponse]
    isAdmin(token: String! blog: String!): IsAdminResponse
  }

  type Mutation {
    addNewAuthor(input: AddNewAuthorInput): AddNewAuthorResponse
    updateAdmin(input: AccessInput): UpdateAdminResponse
  }
`;

export default adminTypeDefs;
