"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_1 = __importDefault(require("./blogs"));
const admins_1 = __importDefault(require("./admins"));
const articles_1 = __importDefault(require("./articles"));
const general_1 = __importDefault(require("./general"));
const typeDefs = [blogs_1.default, admins_1.default, articles_1.default, general_1.default];
exports.default = typeDefs;
//# sourceMappingURL=index.js.map