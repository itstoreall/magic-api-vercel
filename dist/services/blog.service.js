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
exports.deleteAdminFromBlog = exports.updateBlogTags = exports.updateBlog = exports.addNewBlog = exports.getBlogByTitle = exports.getAllBlogs = void 0;
const db_1 = __importDefault(require("../db"));
const { Blog } = db_1.default;
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog.find().select('-__v').exec();
        return blogs;
    }
    catch (e) {
        console.error(`Error in getAllBlogs: ${e.message}`);
    }
});
exports.getAllBlogs = getAllBlogs;
const getBlogByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog.findOne({ title }).select('-__v').exec();
        return blog;
    }
    catch (e) {
        console.error(`Error in getBlogByTitle: ${e.message}`);
    }
});
exports.getBlogByTitle = getBlogByTitle;
const addNewBlog = (title, authors, tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = new Blog({ title, authors, tags });
        const createdBlog = yield newBlog.save();
        return createdBlog;
    }
    catch (e) {
        console.error(`Error in addNewBlog: ${e.message}`);
    }
});
exports.addNewBlog = addNewBlog;
const updateBlog = (blog, blogInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Blog.updateOne({ _id: blog._id }, Object.assign({}, blogInput));
        const updatedBlog = yield (0, exports.getBlogByTitle)(blog.title);
        return updatedBlog;
    }
    catch (e) {
        console.error(`Error in updateBlog: ${e.message}`);
    }
});
exports.updateBlog = updateBlog;
const updateBlogTags = (title, tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = (yield Blog.updateOne({ title }, Object.assign({}, tags)))
            .modifiedCount;
        console.log(44444, updated);
        return updated;
    }
    catch (e) {
        console.error(`Error in updateBlogTags: ${e.message}`);
    }
});
exports.updateBlogTags = updateBlogTags;
const deleteAdminFromBlog = (name, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield (0, exports.getBlogByTitle)(title);
        const authors = blog.authors.filter(auth => auth !== name);
        const blogInput = { title: blog.title, authors };
        const updatedBlog = yield (0, exports.updateBlog)(blog, blogInput);
        return updatedBlog;
    }
    catch (e) {
        console.error(`Error in deleteAdminFromBlog: ${e.message}`);
    }
});
exports.deleteAdminFromBlog = deleteAdminFromBlog;
//# sourceMappingURL=blog.service.js.map