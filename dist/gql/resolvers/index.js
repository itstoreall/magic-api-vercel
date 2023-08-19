"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_iso_date_1 = require("graphql-iso-date");
const admins_1 = __importDefault(require("./admins"));
const articles_1 = __importDefault(require("./articles"));
const resolvers = {
    Query: Object.assign(Object.assign({}, admins_1.default.Query), articles_1.default.Query),
    Mutation: Object.assign(Object.assign({}, admins_1.default.Mutation), articles_1.default.Mutation),
    Date: graphql_iso_date_1.GraphQLDate,
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map