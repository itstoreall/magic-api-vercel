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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = process.env.MONGO_DB;
mongoose_1.default.connect(db);
const Admin = mongoose_1.default.model('Admin', new mongoose_1.default.Schema({
    login: String,
    password: String,
    token: String,
    name: String,
}));
const defaultConfig = {
    title: String,
    description: String,
    text: String,
    author: String,
    ipfs: String,
    views: String,
    timestamp: { type: Date, default: Date.now },
};
// const DevArticle = mongoose.model(
//   'dev_article',
//   new mongoose.Schema({
//     ...defaultConfig,
//     tags: { type: [Schema.Types.String], default: [] },
//   })
// );
/*
const ArticleModel =
  process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;
// */
// const ArticleModel = ProdArticle
// const ArticleModel = DevArticle;
// const AdminModel = mongoose.model(
//   'Admin',
//   new mongoose.Schema({
//     login: String,
//     password: String,
//     token: String,
//     name: String,
//   })
// );
// const defaultConfigSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   text: String,
//   author: String,
//   ipfs: String,
//   views: String,
//   timestamp: { type: Date, default: Date.now },
// });
/*
const ProdArticle = mongoose.model(
  'prod_article',
  new mongoose.Schema({
    ...defaultConfigSchema.obj,
    tags: { type: [Schema.Types.String], default: [] },
  })
);
// */
const DevArticle = mongoose_1.default.model('dev_article', new mongoose_1.default.Schema(Object.assign(Object.assign({}, defaultConfig), { tags: { type: [mongoose_1.Schema.Types.String], default: [] } })));
/*
const CurrentModel =
  process.env.NODE_ENV === 'production'
    ? ProdArticle
    : process.env.NODE_ENV === 'development' && DevArticle;
// */
// const ArticleModel = ProdArticle
const CurrentModel = DevArticle;
exports.default = { Admin, CurrentModel };
//# sourceMappingURL=index.js.map