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
exports.updateAdmin = exports.createAdmin = exports.getAdminByToken = exports.getAdminByCreds = exports.setAuthor = exports.isGenAdmin = exports.isAstrAdmin = exports.isMasterAdmin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const adminService = __importStar(require("../../services/admin.service"));
dotenv_1.default.config();
const masterCreds = process.env.CREDS_MASTER;
const astrCreds = process.env.CREDS_ASTR;
const nameMaster = process.env.AUTHOR_NAME_MASTER;
const nameAstr = process.env.CREDS_ASTR;
const isMasterAdmin = (login, pass) => login + pass === masterCreds;
exports.isMasterAdmin = isMasterAdmin;
const isAstrAdmin = (login, pass) => login + pass === astrCreds;
exports.isAstrAdmin = isAstrAdmin;
const isGenAdmin = (login, pass) => (0, exports.isMasterAdmin)(login, pass) || (0, exports.isAstrAdmin)(login, pass);
exports.isGenAdmin = isGenAdmin;
const setAuthor = (login, pass) => (0, exports.isMasterAdmin)(login, pass)
    ? nameMaster
    : (0, exports.isAstrAdmin)(login, pass)
        ? nameAstr
        : '';
exports.setAuthor = setAuthor;
const getAdminByCreds = (login, password) => __awaiter(void 0, void 0, void 0, function* () { return yield adminService.getAdminByCreds(login, password); });
exports.getAdminByCreds = getAdminByCreds;
const getAdminByToken = (token) => __awaiter(void 0, void 0, void 0, function* () { return yield adminService.getAdminByToken(token); });
exports.getAdminByToken = getAdminByToken;
const createAdmin = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const newAdmin = yield adminService.createAdmin(args);
    const successResponse = {
        token: newAdmin.token,
        author: newAdmin.name,
        blog: newAdmin.blogs[newAdmin.blogs.indexOf(args.blog)],
    };
    return successResponse;
});
exports.createAdmin = createAdmin;
const updateAdmin = (admin, accessInput, input) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password, blog: title } = input;
    const updatedAccess = yield adminService.updateAdmin(admin, accessInput);
    console.log('wasUpdated:', updatedAccess);
    if (updatedAccess) {
        const admin = yield (0, exports.getAdminByCreds)(login, password);
        const blog = admin[0].blogs[admin[0].blogs.indexOf(title)];
        return {
            token: admin[0].token,
            author: admin[0].name,
            blog: blog,
        };
    }
    else
        throw new Error('Admin update error!');
});
exports.updateAdmin = updateAdmin;
//# sourceMappingURL=admin.js.map