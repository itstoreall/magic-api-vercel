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
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const blogUtils = __importStar(require("./../utils/blog"));
const adminUtils = __importStar(require("./../utils/admin"));
dotenv_1.default.config();
/*
interface IAdminResolvers {
  Query: {
    isAdmin: (parent: any, args: IIsAdminArgs) => IsAdminRes;
  };
  // Mutation: {
  //   updateAdmin: (
  //     parent: any,
  //     args: IUpdateAdminInput
  //   ) => Promise<IUpdateAdminResponse>;
  // };
}
*/
const adminResolvers = {
    Query: {
        /*
        getAdmin: async (_: any, { login, password }: any) => {
          try {
            const admin = await db.Admin.find({ login, password });
    
            console.log('getAdmin:', admin);
    
            if (admin?.length) {
              return {
                login: admin[0].login,
                password: admin[0].password,
                token: admin[0].token,
                name: admin[0].name,
              };
            }
          } catch (e) {
            throw new Error(`Failed to fetch admin: ${e}`);
          }
        },
        */
        isAdmin: (_, { token, blog }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(0, 'token, blog', token, blog);
            const admin = yield adminUtils.getAdminByToken(token);
            if (admin && admin.blogs.includes(blog)) {
                console.log(1, 'is admin in db:', admin);
                const currentBlog = admin.blogs[admin.blogs.indexOf(blog)];
                const success = {
                    isAdmin: true,
                    author: admin.name,
                    blog: currentBlog,
                };
                console.log(1, 'success res:', success);
                return success;
            }
            else
                console.log(0, 'no admin in db');
            return { isAdmin: false, author: '', blog: '' };
        }),
    },
    Mutation: {
        addAdmin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('input:', input);
            const { blog: title, author, login, password, token } = input;
            const isMaster = yield adminUtils.isAdminByToken(token);
            if (isMaster) {
                const admin = yield adminUtils.getAdminByCreds(login, password);
                const blog = yield blogUtils.getBlogByTitle(title);
                // -------------------- Create new Admin:
                if (!(admin === null || admin === void 0 ? void 0 : admin.length)) {
                    if (blog === null || blog === void 0 ? void 0 : blog.length) {
                        if (!blog[0].authors.includes(author)) {
                            const createdAdmin = yield adminUtils.createAdmin({
                                blog: title,
                                name: author,
                                login,
                                password,
                                token: '',
                            });
                            console.log(1, 'createdAdmin:', createdAdmin);
                            const authors = [...blog[0].authors, author];
                            // const authors = ['Serhii'];
                            const blogInput = {
                                title: blog[0].title,
                                authors,
                            };
                            const coauthors = yield blogUtils.updateCoauthors(blog, blogInput);
                            const res = {
                                name: createdAdmin.name,
                                blogs: createdAdmin.blogs,
                                coauthors,
                            };
                            return res;
                        }
                        else
                            throw new Error(`${author} already exists in coauthors`);
                    }
                    else
                        throw new Error('no blog in db');
                }
                else
                    throw new Error('Admin already exists in db (Dublicate)');
            }
        }),
        updateAdmin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('input:', input);
            const { login, password, blog: title } = input;
            if (adminUtils.isGenAdmin(login, password)) {
                const author = adminUtils.setAuthor(login, password);
                let currentBlog;
                const blog = yield blogUtils.getBlogByTitle(title);
                // -------------------- Create a Blog:
                if (!(blog === null || blog === void 0 ? void 0 : blog.length)) {
                    if (adminUtils.isMasterAdmin(login, password)) {
                        currentBlog = yield blogUtils.createNewBlog(title, [author]);
                    }
                    else
                        throw new Error('Access denied! (not a master)');
                }
                else
                    currentBlog = blog;
                console.log(1, 'currentBlog:', currentBlog);
                // -------------------- Update Admin:
                const admin = yield adminUtils.getAdminByCreds(login, password);
                if (admin === null || admin === void 0 ? void 0 : admin.length) {
                    const accessInput = {
                        login,
                        password,
                        token: (0, uuid_1.v4)(),
                        name: admin[0].name,
                        blogs: admin[0].blogs,
                    };
                    if (adminUtils.isMasterAdmin(login, password))
                        !admin[0].blogs.includes(title) &&
                            blogUtils.handleBlogs(admin, title, accessInput);
                    const updatedAdmin = yield adminUtils.updateAdmin(admin, accessInput, input);
                    console.log(1, 'updatedAdmin:', updatedAdmin);
                    return updatedAdmin;
                }
                else
                    console.log('no admin in db:', admin);
                // -------------------- Create Admin:
                if (adminUtils.isMasterAdmin(login, password)) {
                    const createdAdmin = yield adminUtils.createAdmin({
                        login,
                        password,
                        token: (0, uuid_1.v4)(),
                        name: author,
                        blog: title,
                    });
                    console.log(1, 'createdAdmin:', createdAdmin);
                    return createdAdmin;
                }
                else
                    throw new Error('Access denied! (not a master)');
            }
            else
                throw new Error('Access denied! (wrong creds)');
        }),
    },
};
exports.default = adminResolvers;
//# sourceMappingURL=admins.js.map