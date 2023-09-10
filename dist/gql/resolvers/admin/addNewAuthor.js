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
Object.defineProperty(exports, "__esModule", { value: true });
const blogUtils = __importStar(require("../../utils/blog"));
const adminUtils = __importStar(require("../../utils/admin"));
const utils = __importStar(require("../../../utils"));
const isAdmin = (author, login, pass) => adminUtils
    .adminConfig()
    .find(adm => adm.name === author && adm.login === login && adm.password === pass);
const addNewAuthor = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('* addNewAdmin:', input);
    const { blog: title, author, credentials, token } = input;
    const { login, password } = credentials;
    const isMaster = yield adminUtils.isAdminByToken(token);
    if (isMaster) {
        const admin = yield adminUtils.getAdminByCreds(login, password);
        const blog = yield blogUtils.getBlogByTitle(title);
        if (!(admin === null || admin === void 0 ? void 0 : admin.length)) {
            if (blog) {
                if (!blog.authors.includes(author)) {
                    if (!isAdmin(author, login, password))
                        utils.throwNewError(`Admin creds does not match`);
                    const createdAdmin = yield adminUtils.createAdmin({
                        blog: title,
                        name: author,
                        token: '',
                    });
                    const authors = [...blog.authors, author];
                    const blogInput = {
                        title: blog.title,
                        authors,
                    };
                    const coauthors = yield blogUtils.updateCoauthors(blog, blogInput);
                    const response = {
                        name: createdAdmin.name,
                        blogs: createdAdmin.blogs,
                        coauthors,
                    };
                    console.log(1, 'response:', response);
                    return response;
                }
                else
                    utils.throwNewError(`${author} already exists in coauthors`);
            }
            else
                utils.throwNewError('no blog in db');
        }
        else
            utils.throwNewError('Admin already exists in db (Dublicate)');
    }
});
exports.default = addNewAuthor;
//# sourceMappingURL=addNewAuthor.js.map