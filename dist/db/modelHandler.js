"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    token: String,
    name: String,
    blogs: { type: [mongoose_1.Schema.Types.String], default: [] },
});
const BlogSchema = new mongoose_1.default.Schema({
    title: String,
    authors: { type: [mongoose_1.Schema.Types.String], default: [] },
});
const defaultConfig = {
    title: String,
    description: String,
    text: String,
    author: String,
    ipfs: String,
    views: String,
    timestamp: { type: Date, default: Date.now },
};
const ProdArticleSchema = new mongoose_1.default.Schema(Object.assign(Object.assign({}, defaultConfig), { tags: { type: [mongoose_1.Schema.Types.String], default: [] } }));
const DevArticleSchema = new mongoose_1.default.Schema(Object.assign(Object.assign({}, defaultConfig), { tags: { type: [mongoose_1.Schema.Types.String], default: [] } }));
const Admin = mongoose_1.default.model('admin', AdminSchema);
const Blog = mongoose_1.default.model('blog', BlogSchema);
const ProdArticle = mongoose_1.default.model('prod_astraia_article', ProdArticleSchema);
const DevArticle = mongoose_1.default.model('dev_astraia_article', DevArticleSchema);
const models = {
    Admin,
    Blog,
    ProdArticle,
    DevArticle,
};
exports.default = models;
//# sourceMappingURL=modelHandler.js.map