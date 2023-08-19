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
const admin_1 = require("./../utils/admin");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../../db"));
const adnimService = __importStar(require("../../services/admin.service"));
dotenv_1.default.config();
const envLoginMila = process.env.LOGIN_MILA;
const envPasswordMila = process.env.PASSWORD_MILA;
const envLoginSerhii = process.env.LOGIN_SERHII;
const envPasswordSerhii = process.env.PASSWORD_SERHII;
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
            const admin = yield adnimService.getAdminByToken(token);
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
        updateAdmin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(1, input);
            const { login, password, blog: source } = input;
            const admInput = { login, password };
            const blogInput = { source };
            console.log('login, password, blog:', login, password, source);
            console.log('env access Mila:', envLoginMila, envPasswordMila);
            console.log('env access Serhii:', envLoginSerhii, envPasswordSerhii);
            const isMila = login == envLoginMila && password == envPasswordMila;
            const isSerhii = login == envLoginSerhii && password == envPasswordSerhii;
            if (isMila || isSerhii) {
                const author = isMila ? 'Mila' : 'Serhii';
                let currentBlog;
                // -------------------- Create Blog:
                const blog = yield (0, admin_1.getBlog)(blogInput);
                if (blog === null || blog === void 0 ? void 0 : blog.length) {
                    console.log('is blog', blog);
                    currentBlog = blog;
                }
                else {
                    console.log('No blog in db:', blog);
                    const newBlog = new db_1.default.Blog({
                        title: source,
                        authors: [author],
                    });
                    const createdBlog = yield newBlog.save();
                    console.log('createdBlog:', createdBlog);
                    currentBlog = createdBlog;
                }
                console.log('currentBlog:', currentBlog);
                // -------------------- Update Admin:
                const admin = yield (0, admin_1.getAdmin)(admInput);
                if (admin === null || admin === void 0 ? void 0 : admin.length) {
                    const accessInput = {
                        login,
                        password,
                        token: (0, uuid_1.v4)(),
                        name: author,
                    };
                    const updatedAccess = (yield db_1.default.Admin.updateOne({ _id: admin[0]._id }, Object.assign({}, accessInput))).modifiedCount;
                    console.log('wasUpdated:', updatedAccess);
                    if (updatedAccess) {
                        const admin = yield (0, admin_1.getAdmin)(admInput);
                        return {
                            token: admin[0].token,
                            author: admin[0].name,
                            blog: admin[0].blogs[0],
                        };
                    }
                    else
                        throw new Error('Admin update error!');
                }
                else
                    console.log('No admin in db:', admin);
                // -------------------- Create Admin:
                const createAccess = new db_1.default.Admin({
                    login,
                    password,
                    token: (0, uuid_1.v4)(),
                    name: author,
                    blogs: [source],
                });
                const access = yield createAccess.save();
                return {
                    token: access.token,
                    author: access.name,
                    blog: access.blogs,
                };
            }
            else
                throw new Error('Access denied!');
        }),
    },
};
exports.default = adminResolvers;
//# sourceMappingURL=admins.js.map