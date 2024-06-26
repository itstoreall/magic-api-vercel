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
exports.updateArticle = exports.deleteArticle = exports.publishArticle = exports.createArticle = exports.getArticleById = exports.getAllArticles = void 0;
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
const createArticle = (blog, newArticleInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentModel = (0, db_1.setCurrentModel)(blog);
        const createArticle = new currentModel(newArticleInput);
        return yield createArticle.save();
    }
    catch (e) {
        console.error(`Error in createArticle: ${e.message}`);
    }
});
exports.createArticle = createArticle;
const publishArticle = (blog, ID, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, db_1.setCurrentModel)(blog).updateOne({ _id: ID }, Object.assign({}, input)))
            .modifiedCount;
    }
    catch (e) {
        console.error(`Error in publishArticle: ${e.message}`);
    }
});
exports.publishArticle = publishArticle;
const deleteArticle = (blog, ID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, db_1.setCurrentModel)(blog).deleteOne({ _id: ID })).deletedCount;
    }
    catch (e) {
        console.error(`Error in createArticle: ${e.message}`);
    }
});
exports.deleteArticle = deleteArticle;
const updateArticle = (blog, ID, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, db_1.setCurrentModel)(blog).updateOne({ _id: ID }, Object.assign({}, input)))
            .modifiedCount;
    }
    catch (e) {
        console.error(`Error in updateArticle: ${e.message}`);
    }
});
exports.updateArticle = updateArticle;
//# sourceMappingURL=article.service.js.map