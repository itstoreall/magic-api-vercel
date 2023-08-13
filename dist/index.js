"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeDefs_1 = __importDefault(require("./gql/typeDefs"));
const resolvers_1 = __importDefault(require("./gql/resolvers"));
const PORT = process.env.PORT || 4001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: Number(PORT) },
}).then(({ url }) => console.log(`  * server ★(◔.◔)★ ${String(url)}`));
//# sourceMappingURL=index.js.map