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
exports.updateAdmin = exports.createAdmin = exports.getAdminByToken = exports.getAdminByCreds = exports.isAdminByToken = exports.setAuthor = exports.isGenAdmin = exports.isMasterAdmin = exports.adminConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const adminService = __importStar(require("../../services/admin.service"));
dotenv_1.default.config();
const adminsCreds = process.env.ADMIN_CREDS;
const adminConfig = () => adminsCreds.split(' ').map(el => {
    const admin = el.split('#');
    return {
        name: admin[0],
        login: admin[1],
        password: admin[2],
    };
});
exports.adminConfig = adminConfig;
const isMasterAdmin = (login, pass) => (0, exports.adminConfig)().find((adm, idx) => adm.login === login && adm.password === pass && idx === 0 ? true : false);
exports.isMasterAdmin = isMasterAdmin;
const isGenAdmin = (login, pass) => (0, exports.adminConfig)().find(adm => adm.login === login && adm.password === pass ? true : false);
exports.isGenAdmin = isGenAdmin;
const setAuthor = (login, pass) => (0, exports.adminConfig)().find(adm => adm.login === login && adm.password === pass);
exports.setAuthor = setAuthor;
const isAdminByToken = (token) => __awaiter(void 0, void 0, void 0, function* () { return yield adminService.isAdminByToken(token); });
exports.isAdminByToken = isAdminByToken;
const getAdminByCreds = (login, password) => __awaiter(void 0, void 0, void 0, function* () {
    const name = (0, exports.setAuthor)(login, password).name;
    return yield adminService.getAdminByCreds(name);
});
exports.getAdminByCreds = getAdminByCreds;
const getAdminByToken = (token) => __awaiter(void 0, void 0, void 0, function* () { return yield adminService.getAdminByToken(token); });
exports.getAdminByToken = getAdminByToken;
const createAdmin = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const newAdmin = yield adminService.createAdmin(args);
    if (newAdmin) {
        console.log('+ new admin has been creater:', Boolean(newAdmin));
        const successResponse = {
            token: newAdmin.token,
            name: newAdmin.name,
            blogs: newAdmin.blogs,
        };
        return successResponse;
    }
});
exports.createAdmin = createAdmin;
const updateAdmin = (admin, accessInput, input) => __awaiter(void 0, void 0, void 0, function* () {
    const { credentials: { login, password }, } = input;
    const updatedAccess = yield adminService.updateAdmin(admin, accessInput);
    if (updatedAccess) {
        console.log('+ admin has been updated:', Boolean(updatedAccess));
        const admin = yield (0, exports.getAdminByCreds)(login, password);
        const successResponse = {
            token: admin[0].token,
            name: admin[0].name,
            blogs: admin[0].blogs,
        };
        return successResponse;
    }
    else
        throw new Error('Admin update error!');
});
exports.updateAdmin = updateAdmin;
//# sourceMappingURL=admin.js.map