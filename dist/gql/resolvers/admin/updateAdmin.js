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
const uuid_1 = require("uuid");
const blogUtils = __importStar(require("../../utils/blog"));
const adminUtils = __importStar(require("../../utils/admin"));
const utils = __importStar(require("../../../utils"));
const createBlog = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { blog, input, author } = props;
    const { credentials, blog: title } = input;
    const { login, password } = credentials;
    const createNewBlog = () => __awaiter(void 0, void 0, void 0, function* () {
        yield blogUtils.createNewBlog(title, [author === null || author === void 0 ? void 0 : author.name]);
    });
    !blog
        ? adminUtils.isMasterAdmin(login, password)
            ? yield createNewBlog()
            : utils.throwNewError('Access denied! (not a master)')
        : console.log('- blog already exists in db');
});
const createAdmin = (input, author) => __awaiter(void 0, void 0, void 0, function* () {
    const { credentials, blog: title } = input;
    const { login, password } = credentials;
    if (adminUtils.isMasterAdmin(login, password)) {
        const createdAdmin = yield adminUtils.createAdmin({
            token: (0, uuid_1.v4)(),
            name: author === null || author === void 0 ? void 0 : author.name,
            blog: title,
        });
        return createdAdmin;
    }
    else
        utils.throwNewError('Access denied! (not a master)');
});
const updateAdmin = (input, admin) => __awaiter(void 0, void 0, void 0, function* () {
    const { credentials, blog: title } = input;
    const { login, password } = credentials;
    const accessInput = { token: (0, uuid_1.v4)(), name: admin.name, blogs: admin.blogs };
    const isMaster = adminUtils.isMasterAdmin(login, password);
    // ------------- Add new blog to blogs (for Master):
    if (isMaster)
        !admin.blogs.includes(title) &&
            blogUtils.pushToAuthorBlogs(title, accessInput);
    // ------------- checks if the blog is in blogs (for User):
    if (!isMaster)
        !admin.blogs.find(blog => blog === title) &&
            utils.throwNewError('Access denied! (wrong creds)');
    return yield adminUtils.updateAdmin(admin, accessInput, input);
});
const updateAdminHandler = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('* updateAdmin input:', input);
    const { credentials, blog: title } = input;
    const { login, password } = credentials;
    if (adminUtils.isGenAdmin(login, password)) {
        const author = adminUtils.setAuthor(login, password);
        const blog = yield blogUtils.getBlogByTitle(title);
        const admin = yield adminUtils.getAdminByCreds(login, password);
        // -------------------- Create a Blog:
        yield createBlog({ blog, input, author });
        // -------------------- Update Admin:
        const updatedAdmin = (admin === null || admin === void 0 ? void 0 : admin.length)
            ? yield updateAdmin(input, admin[0])
            : yield createAdmin(input, author);
        console.log(1, 'response:', updatedAdmin);
        return updatedAdmin;
    }
    else
        utils.throwNewError('Access denied! (wrong creds)');
});
exports.default = updateAdminHandler;
//# sourceMappingURL=updateAdmin.js.map