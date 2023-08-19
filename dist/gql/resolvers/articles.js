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
const constants_1 = require("../../constants");
const db_1 = __importDefault(require("../../db"));
const web3Storage = __importStar(require("../../ipfs/web3Storage"));
const defaultCid = constants_1.DEFAULT_IPFS_CID;
const articleResolvers = {
    Query: {
        articles: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield db_1.default.CurrentModel.find();
                console.log('articles:', res === null || res === void 0 ? void 0 : res.length);
                return res;
            }
            catch (error) {
                throw new Error('Failed to fetch articles');
            }
        }),
        getArticleById: (_, { ID }) => __awaiter(void 0, void 0, void 0, function* () {
            const article = yield db_1.default.CurrentModel.find({ _id: ID });
            console.log('getArticleById:', article);
            return {
                id: article[0]._id,
                title: article[0].title,
                description: article[0].description,
                text: article[0].text,
                author: article[0].author,
                ipfs: article[0].ipfs,
                views: article[0].views,
                tags: article[0].tags,
                timestamp: article[0].timestamp,
            };
        }),
        getArticleByTitle(_, { title }) {
            return __awaiter(this, void 0, void 0, function* () {
                const article = yield db_1.default.CurrentModel.find({ title });
                console.log('getArticleByTitle:', article);
                return {
                    id: article[0]._id,
                    title: article[0].title,
                    description: article[0].description,
                    text: article[0].text,
                    author: article[0].author,
                    ipfs: article[0].ipfs,
                    views: article[0].views,
                    tags: article[0].tags,
                    timestamp: article[0].timestamp,
                };
            });
        },
    },
    Mutation: {
        addArticle: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const base64 = input.image;
            let cid = defaultCid;
            if (base64) {
                cid = yield web3Storage.upload(base64);
            }
            const createArticle = new db_1.default.CurrentModel({
                title: input.title,
                description: input.description,
                text: input.text,
                author: input.author,
                ipfs: cid,
                tags: input.tags,
            });
            const res = yield createArticle.save();
            console.log('addArticle:', res);
            return {
                title: res.title,
                description: res.description,
                text: res.text,
                author: res.author,
                ipfs: res.ipfs,
                views: res.views,
                tags: res.tags,
                timestamp: res.timestamp,
            };
        }),
        deleteArticle: (_, { ID }) => __awaiter(void 0, void 0, void 0, function* () {
            const wasDeleted = (yield db_1.default.CurrentModel.deleteOne({ _id: ID }))
                .deletedCount;
            console.log('wasDeleted:', wasDeleted);
            return wasDeleted;
        }),
        editArticle(_, { ID, articleInput }) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('articleInput -->', articleInput);
                // /*
                const base64 = articleInput.image;
                let cid;
                if (base64) {
                    console.log('is base64 -->', base64);
                    cid = yield web3Storage.upload(base64);
                }
                const updatedImage = Object.assign(Object.assign({}, articleInput), { ipfs: cid });
                const onlyText = Object.assign({}, articleInput);
                delete onlyText.image;
                console.log('onlyText', onlyText);
                const wasEdited = (yield db_1.default.CurrentModel.updateOne({ _id: ID }, base64 ? Object.assign({}, updatedImage) : Object.assign({}, onlyText))).modifiedCount;
                console.log('wasEdited:', wasEdited);
                return wasEdited;
                // */
            });
        },
    },
    // Date: GraphQLDate,
};
exports.default = articleResolvers;
//# sourceMappingURL=articles.js.map