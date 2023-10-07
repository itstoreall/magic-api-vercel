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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.checkStatus = exports.retrieve = exports.upload = void 0;
const process_1 = __importDefault(require("process"));
const constants_1 = require("../constants");
const web3_storage_1 = require("web3.storage");
const defaultCid = constants_1.DEFAULT_IPFS_CID;
const astraiaToken = process_1.default.env.WEB3_STORAGE_API_TOKEN_ASTRAIA;
const healthyToken = process_1.default.env.WEB3_STORAGE_API_TOKEN_HEALTHY;
// Client
const getStorage = (blog) => {
    const token = blog === 'astraia' ? astraiaToken : healthyToken;
    if (!token) {
        console.error('ERROR: failed to get web3.storage API token');
        return;
    }
    return new web3_storage_1.Web3Storage({ token: token });
};
// Preparation
const prepareFiles = (base64Data) => {
    if (!(base64Data === null || base64Data === void 0 ? void 0 : base64Data.includes('base64')))
        return null;
    const base64 = base64Data.split(';base64,').pop();
    const buffer = Buffer.from(base64, 'base64');
    return [new web3_storage_1.File([buffer], 'astraia-image.jpg')];
};
// Uploader
const upload = (blog, base64Img) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // /*
        const files = prepareFiles(base64Img);
        const storage = getStorage(blog);
        const cid = yield storage.put(files);
        console.log('+ web3.storage CID:', cid);
        return cid || defaultCid;
        // */
    }
    catch (e) {
        console.error('Error web3.storage upload:', e);
    }
});
exports.upload = upload;
// Retrieve
const retrieve = (blog, cid) => __awaiter(void 0, void 0, void 0, function* () {
    const retrievedFiles = [];
    try {
        const storage = getStorage(blog);
        const res = yield storage.get(cid);
        if (!res.ok) {
            console.error(`failed to get web3.storage ${cid}`);
            return;
        }
        const files = yield res.files();
        for (const file of files) {
            retrievedFiles.push(file);
        }
        return { status: res.status, files: retrievedFiles };
    }
    catch (e) {
        console.error('Error web3.storage retrieve:', e);
    }
});
exports.retrieve = retrieve;
// Status
const checkStatus = (blog, cid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = getStorage(blog);
        return yield storage.status(cid);
    }
    catch (e) {
        console.error('Error web3.storage checkStatus:', e);
    }
});
exports.checkStatus = checkStatus;
// List
const list = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const imageList = [];
    try {
        const storage = getStorage(blog);
        try {
            for (var _d = true, _e = __asyncValues(storage.list()), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const upload = _c;
                    imageList.push(upload);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return imageList;
    }
    catch (e) {
        console.error('Error web3.storage list:', e);
    }
});
exports.list = list;
/*
const base64 = fs.readFileSync('src/temp/astraia-image.jpg', 'base64');
const base64 = fs.readFileSync('src/temp/astraia-image.txt', 'utf8');
*/
//# sourceMappingURL=web3Storage.js.map