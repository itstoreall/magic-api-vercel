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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleViews = exports.editArticle = exports.deleteArticle = exports.publishArticle = exports.addArticle = exports.getArticleById = exports.getAllArticles = void 0;
// import { DEFAULT_IPFS_CID } from '../../constants';
const gc = __importStar(require("../../config/global"));
const config_1 = __importDefault(require("../../db/config"));
const web3Storage = __importStar(require("../../ipfs/web3Storage"));
const articleService = __importStar(require("../../services/article.service"));
const blog_1 = require("./blog");
const { created, published, updated, failed } = gc.articleStatus;
// const existingBlogs = process.env.EXISTING_BLOGS;
const getAllArticles = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield articleService.getAllArticles(blog);
    const reversedArticles = articles.reverse();
    return reversedArticles;
});
exports.getAllArticles = getAllArticles;
const getArticleById = (blog, ID) => __awaiter(void 0, void 0, void 0, function* () { return yield articleService.getArticleById(blog, ID); });
exports.getArticleById = getArticleById;
/*
const createIpfsCid = async (blog: string, base64: string) => {
  let cid: string = DEFAULT_IPFS_CID;
  if (base64) cid = await web3Storage.upload(blog, base64);
  return cid;
};
*/
const updateIpfsCid = (blog, base64) => __awaiter(void 0, void 0, void 0, function* () {
    let cid;
    if (base64)
        cid = yield web3Storage.upload(blog, base64);
    return cid;
});
const addArticle = (blog, input) => __awaiter(void 0, void 0, void 0, function* () {
    // const cid = await createIpfsCid(blog, input.image);
    // console.log(111, '+ created', blog, await isAstraia(blog));
    const img = (yield (0, blog_1.isAstraia)(blog))
        ? { image: input.image || '' }
        : { ipfs: input.image };
    const newArticleInput = Object.assign(Object.assign({ title: input.title, description: input.description, text: input.text, author: input.author }, img), { views: input.views, tags: input.tags, status: 'created' });
    return yield articleService.createArticle(blog, newArticleInput);
});
exports.addArticle = addArticle;
const publishArticle = (blog, ID) => __awaiter(void 0, void 0, void 0, function* () {
    const input = { status: published };
    const isPublished = yield articleService.publishArticle(blog, ID, input);
    return { status: isPublished ? published : failed };
});
exports.publishArticle = publishArticle;
const deleteArticle = (blog, ID) => __awaiter(void 0, void 0, void 0, function* () { return yield articleService.deleteArticle(blog, ID); });
exports.deleteArticle = deleteArticle;
const editArticle = (blog, ID, input) => __awaiter(void 0, void 0, void 0, function* () {
    const artticle = yield (0, exports.getArticleById)(blog, ID);
    if (blog === config_1.default.articles.astraia.label) {
        /*
        const base64 = input.image;
        const cid = await updateIpfsCid(blog, base64);
        const newImage = { ...input, ipfs: cid };
        const onlyText = { ...input };
        delete onlyText.image;
        const artInput = base64 ? newImage : onlyText;
        */
        const createInput = () => {
            switch (artticle.status) {
                case created:
                    return created;
                case published:
                    return updated;
                case updated:
                    return updated;
                default:
                    return created;
            }
        };
        input = Object.assign(Object.assign({}, input), { status: createInput() });
        return yield articleService.updateArticle(blog, ID, input);
    }
    if (blog === config_1.default.articles.healthy.label) {
        const base64 = input.image;
        const cid = yield updateIpfsCid(blog, base64);
        const newImage = Object.assign(Object.assign({}, input), { ipfs: cid });
        const onlyText = Object.assign({}, input);
        delete onlyText.image;
        const artInput = base64 ? newImage : onlyText;
        return yield articleService.updateArticle(blog, ID, artInput);
    }
});
exports.editArticle = editArticle;
const updateArticleViews = (blog, ID) => __awaiter(void 0, void 0, void 0, function* () {
    const article = (yield (0, exports.getArticleById)(blog, ID)).toObject();
    const newView = Number(article.views) > 0 ? Number(article.views) + 1 : 1;
    const artInput = Object.assign(Object.assign({}, article), { views: newView });
    return Boolean(yield articleService.updateArticle(blog, ID, artInput));
});
exports.updateArticleViews = updateArticleViews;
//# sourceMappingURL=article.js.map