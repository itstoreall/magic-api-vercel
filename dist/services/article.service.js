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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleById = exports.getAllArticles = void 0;
const db_1 = require("../db");
const getAllArticles = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, db_1.setCurrentModel)(blog).find().select('-__v').exec();
    }
    catch (e) {
        console.error(`Error in getAllArticles: ${e.message}`);
    }
});
exports.getAllArticles = getAllArticles;
const getArticleById = (blog, ID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, db_1.setCurrentModel)(blog).findOne({ _id: ID });
    }
    catch (e) {
        console.error(`Error in getArticleById: ${e.message}`);
    }
});
exports.getArticleById = getArticleById;
//# sourceMappingURL=article.service.js.map