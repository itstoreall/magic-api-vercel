"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminTypeDefs = `#graphql
  type Access {
    login: String
    password: String
    token: String
    name: String
  }

  type UpdateAdminResponse {
    token: String
    author: String
    blog: [String]
  }

  type IsAdminResponse {
    isAdmin: Boolean
    author: String
    blog: [String]
  }

  input AccessInput {
    blog: String
    login: String
    password: String
    token: String
  }

  type Query {
    #getAdmin(login: String!, password: String!): Access
    isAdmin(token: String!): IsAdminResponse
  }

  type Mutation {
    updateAdmin(input: AccessInput): UpdateAdminResponse
  }
`;
exports.default = adminTypeDefs;
//# sourceMappingURL=admins.js.map