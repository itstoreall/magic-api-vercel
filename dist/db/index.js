"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const modelHandler_1 = __importDefault(require("./modelHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = process.env.MONGO_DB;
mongoose_1.default.connect(db);
// /*
const CurrentModel = process.env.NODE_ENV === 'production'
    ? modelHandler_1.default.ProdArticle
    : process.env.NODE_ENV === 'development' && modelHandler_1.default.DevArticle;
// */
// const CurrentModel = ProdArticle
// const CurrentModel = DevArticle;
exports.default = { Admin: modelHandler_1.default.Admin, CurrentModel, Blog: modelHandler_1.default.Blog };
//# sourceMappingURL=index.js.map