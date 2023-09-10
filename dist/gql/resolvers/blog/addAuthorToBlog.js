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
const blog_1 = require("../../../gql/utils/blog");
const addAuthorToBlog = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('* addAuthorToBlog input:', input);
    const updatedCoauthors = yield (0, blog_1.addCoauthor)(input);
    return updatedCoauthors.includes(input.author) ? true : false;
});
exports.default = addAuthorToBlog;
//# sourceMappingURL=addAuthorToBlog.js.map