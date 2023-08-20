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
exports.addNewBlog = exports.getBlogByTitle = void 0;
const db_1 = __importDefault(require("../db"));
const { Blog } = db_1.default;
const getBlogByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog.find({ title });
        return blog;
    }
    catch (e) {
        console.error(`Error in getBlogByTitle: ${e.message}`);
    }
});
exports.getBlogByTitle = getBlogByTitle;
const addNewBlog = (title, authors) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = new Blog({ title, authors });
        const createdBlog = yield newBlog.save();
        return createdBlog;
    }
    catch (e) {
        console.error(`Error in addNewBlog: ${e.message}`);
    }
});
exports.addNewBlog = addNewBlog;
//# sourceMappingURL=blog.service.js.map