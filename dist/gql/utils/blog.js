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
exports.addCoauthor = exports.deleteAdminFromBlog = exports.updateCoauthors = exports.pushToAuthorBlogs = exports.getAllBlogs = exports.createNewBlog = exports.getBlogByTitle = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const admin_1 = require("./admin");
const blogService = __importStar(require("../../services/blog.service"));
const utils = __importStar(require("../../utils"));
dotenv_1.default.config();
const existingBlogs = process.env.EXISTING_BLOGS;
const getBlogByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () { return yield blogService.getBlogByTitle(title); });
exports.getBlogByTitle = getBlogByTitle;
const createNewBlog = (title, author) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogService.addNewBlog(title, author);
    if (newBlog) {
        console.log('+ new blog has been created:', Boolean(newBlog));
        return newBlog;
    }
});
exports.createNewBlog = createNewBlog;
const getAllBlogs = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const isMaster = yield (0, admin_1.isMasterByToken)(token);
    if (isMaster) {
        const blogs = yield blogService.getAllBlogs();
        return blogs;
    }
    else
        utils.throwNewError(`is not a Master!`);
});
exports.getAllBlogs = getAllBlogs;
const pushToAuthorBlogs = (title, accessInput) => existingBlogs
    .split(' ')
    .map(el => el)
    .includes(title) && accessInput.blogs.push(title);
exports.pushToAuthorBlogs = pushToAuthorBlogs;
const updateCoauthors = (blog, blogInput) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blogService.updateBlog(blog, blogInput);
    if (updatedBlog) {
        console.log('+ blog has been updated:', Boolean(updatedBlog));
        return updatedBlog.authors;
    }
});
exports.updateCoauthors = updateCoauthors;
const deleteAdminFromBlog = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { blog, author, token } = input;
    const isMaster = yield (0, admin_1.isMasterByToken)(token);
    if (isMaster) {
        const updatedBlog = yield blogService.deleteAdminFromBlog(author, blog);
        if (updatedBlog) {
            return !updatedBlog.authors.includes(author)
                ? true
                : utils.throwNewError('authors update Error!');
        }
        console.log('updatedBlog', updatedBlog);
    }
});
exports.deleteAdminFromBlog = deleteAdminFromBlog;
const addCoauthor = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { blog, author, token } = input;
    const isMaster = yield (0, admin_1.isMasterByToken)(token);
    if (isMaster) {
        const existingBlog = yield (0, exports.getBlogByTitle)(blog);
        if (existingBlog) {
            console.log(1, 'existingBlog:', existingBlog.authors.includes(author));
            if (existingBlog.authors.includes(author))
                utils.throwNewError(`author ${author} already exists in db`);
            const blogInput = {
                title: blog,
                authors: [...existingBlog.authors, author],
            };
            const updatedCoauthors = yield (0, exports.updateCoauthors)(existingBlog, blogInput);
            console.log(1, 'updated coauthors:', updatedCoauthors);
            return updatedCoauthors;
            // return [];
        }
        else
            utils.throwNewError(`no blog in db`);
    }
    else
        utils.throwNewError(`is not a Master!`);
    return [''];
});
exports.addCoauthor = addCoauthor;
//# sourceMappingURL=blog.js.map