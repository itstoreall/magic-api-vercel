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
const dotenv_1 = __importDefault(require("dotenv"));
const getBlogs_1 = __importDefault(require("./getBlogs"));
const getBlogTags_1 = __importDefault(require("./getBlogTags"));
const deleteAuthorFromBlog_1 = __importDefault(require("./deleteAuthorFromBlog"));
const addAuthorToBlog_1 = __importDefault(require("./addAuthorToBlog"));
dotenv_1.default.config();
const adminResolvers = {
    Query: {
        getAllBlogs: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            const blogs = yield (0, getBlogs_1.default)(token);
            console.log('blogs', blogs);
            return blogs;
        }),
        getBlogTags: (_, { token, blog }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            const tags = yield (0, getBlogTags_1.default)(token, blog);
            console.log('tags', tags);
            return { tags: ['x'] };
        }),
    },
    Mutation: {
        addAuthorToBlog: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, addAuthorToBlog_1.default)(input);
        }),
        deleteAuthorFromBlog: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, deleteAuthorFromBlog_1.default)(input);
        }),
    },
};
exports.default = adminResolvers;
//# sourceMappingURL=index.js.map