"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminTypeDefs = `#graphql
  type Access {
    login: String
    password: String
    token: String
    name: String
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

  type IsAdminResponse {
    isAdmin: Boolean
    author: String
    blog: String
  }

  input AddAuthorInput {
    blog: String
    author: String
    login: String
    password: String
    token: String
  }

  input AccessInput {
    blog: String
    login: String
    password: String
    token: String
  }
  
  type Query {
    #getAdmin(login: String!, password: String!): Access
    isAdmin(token: String! blog: String!): IsAdminResponse
  }

  type Mutation {
    addAdmin(input: AddAuthorInput): AddAdminResponse
    updateAdmin(input: AccessInput): UpdateAdminResponse
  }
`;
exports.default = adminTypeDefs;
//# sourceMappingURL=admins.js.map