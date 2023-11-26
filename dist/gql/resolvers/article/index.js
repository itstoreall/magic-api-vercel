"use strict";
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
const getArticles_1 = __importDefault(require("./getArticles"));
const getArticleById_1 = __importDefault(require("./getArticleById"));
const addArticle_1 = __importDefault(require("./addArticle"));
const deleteArticle_1 = __importDefault(require("./deleteArticle"));
const editArticle_1 = __importDefault(require("./editArticle"));
const updateArticleViews_1 = __importDefault(require("./updateArticleViews"));
const articleResolvers = {
    Query: {
        articles: (_, { blog }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, getArticles_1.default)(blog);
        }),
        getArticleById: (_, { blog, ID }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, getArticleById_1.default)(blog, ID);
        })
        /*
        async getArticleByTitle(_: any, { title }: any) {
          const article = await setCurrentModel('healthy').find({ title });
    
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
        },
        */
    },
    Mutation: {
        addArticle: (_, { blog, input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, addArticle_1.default)(blog, input);
        }),
        deleteArticle: (_, { blog, ID }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, deleteArticle_1.default)(blog, ID);
        }),
        editArticle(_, { blog, ID, articleInput }) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('');
                return yield (0, editArticle_1.default)(blog, ID, articleInput);
            });
        },
        updateArticleViews(_, { blog, ID }) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('');
                return yield (0, updateArticleViews_1.default)(blog, ID);
            });
        }
    }
};
exports.default = articleResolvers;
//# sourceMappingURL=index.js.map