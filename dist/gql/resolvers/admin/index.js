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
const dotenv_1 = __importDefault(require("dotenv"));
const isAdmin_1 = __importDefault(require("./isAdmin"));
const addNewAuthor_1 = __importDefault(require("./addNewAuthor"));
const updateAdmin_1 = __importDefault(require("./updateAdmin"));
const getAdmins_1 = __importDefault(require("./getAdmins"));
dotenv_1.default.config();
const adminResolvers = {
    Query: {
        getAllAdmins: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, getAdmins_1.default)(token);
        }),
        isAdmin: (_, { token, blog }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, isAdmin_1.default)(blog, token);
        }),
    },
    Mutation: {
        addNewAuthor: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, addNewAuthor_1.default)(input);
        }),
        updateAdmin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, updateAdmin_1.default)(input);
        }),
    },
};
exports.default = adminResolvers;
//# sourceMappingURL=index.js.map