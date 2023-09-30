"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_iso_date_1 = require("graphql-iso-date");
const admin_1 = __importDefault(require("./admin"));
const blog_1 = __importDefault(require("./blog"));
const article_1 = __importDefault(require("./article"));
const resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, admin_1.default.Query), blog_1.default.Query), article_1.default.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, admin_1.default.Mutation), blog_1.default.Mutation), article_1.default.Mutation),
    Date: graphql_iso_date_1.GraphQLDate,
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map