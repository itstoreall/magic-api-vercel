"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = blogTypeDefs;
//# sourceMappingURL=blogs.js.map