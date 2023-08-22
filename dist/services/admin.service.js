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
exports.updateAdmin = exports.createAdmin = exports.getAdminByToken = exports.getAdminByCreds = exports.isAdminByToken = void 0;
const db_1 = __importDefault(require("../db"));
const { Admin } = db_1.default;
const isAdminByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin.find({ token });
        return Boolean(admin === null || admin === void 0 ? void 0 : admin.length);
    }
    catch (e) {
        console.error(`Error in isAdminByToken: ${e.message}`);
    }
});
exports.isAdminByToken = isAdminByToken;
const getAdminByCreds = (login, pass) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin.find({ login, password: pass });
        return admin;
    }
    catch (e) {
        console.error(`Error in getAdminByCreds: ${e.message}`);
    }
});
exports.getAdminByCreds = getAdminByCreds;
const getAdminByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin.findOne({ token });
        return admin;
    }
    catch (e) {
        console.error(`Error in getAdminByToken: ${e.message}`);
    }
});
exports.getAdminByToken = getAdminByToken;
const createAdmin = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password, token, name, blog } = args;
    const config = { login, password, token, name, blogs: [blog] };
    try {
        const newAdmin = new db_1.default.Admin(config);
        const admin = yield newAdmin.save();
        return admin;
    }
    catch (e) {
        console.error(`Error in createAdmin: ${e.message}`);
    }
});
exports.createAdmin = createAdmin;
const updateAdmin = (admin, accessInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAccess = (yield db_1.default.Admin.updateOne({ _id: admin[0]._id }, Object.assign({}, accessInput))).modifiedCount;
        return updatedAccess;
    }
    catch (e) {
        console.error(`Error in createAdmin: ${e.message}`);
    }
});
exports.updateAdmin = updateAdmin;
//# sourceMappingURL=admin.service.js.map