"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const modelHandler_1 = __importDefault(require("./modelHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
const db = process.env.MONGO_DB;
mongoose_1.default.connect(db);
const { astraia, healthy } = config_1.default.articles;
// /*
const CurrentModel = process.env.NODE_ENV === 'production'
    ? (0, modelHandler_1.default)(astraia.label).ProdArticle
    : process.env.NODE_ENV === 'development' &&
        (0, modelHandler_1.default)(astraia.label).DevArticle;
// */
// const CurrentModel = ProdArticle
// const CurrentModel = DevArticle;
exports.default = {
    Admin: (0, modelHandler_1.default)().Admin,
    CurrentModel,
    Blog: (0, modelHandler_1.default)().Blog,
};
//# sourceMappingURL=index.js.map