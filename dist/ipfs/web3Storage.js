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
const web3_storage_1 = require("web3.storage");
const constants_1 = require("../constants");
const fs_1 = __importDefault(require("fs"));
const tempImagePath = constants_1.IPFS_TEMP_IMAGE_PATH;
const tempFolderPath = constants_1.IPFS_TEMP_FOLDER_PATH;
// Client
const getStorage = () => {
    const token = process_1.default.env.WEB3_STORAGE_API_TOKEN;
    if (!token) {
        console.error('ERROR: failed to get web3.storage API token');
        return;
    }
    return new web3_storage_1.Web3Storage({ token: token });
};
// ---
// Converter
const convertFromBase64TiImg = (base64Data) => {
    const base64 = base64Data.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');
    fs_1.default.writeFileSync(tempImagePath, buffer);
};
// Uploader
const upload = (base64Img) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        convertFromBase64TiImg(base64Img);
        const storage = getStorage();
        const files = yield (0, web3_storage_1.getFilesFromPath)(tempImagePath);
        const cid = yield storage.put(files);
        console.log('web3.storage CID:', cid);
        return cid;
    }
    catch (e) {
        console.error('Error web3.storage upload:', e);
    }
});
exports.upload = upload;
// // Uploader
// export const upload = async (base64Img: any) => {
//   try {
//     convertFromBase64TiImg(base64Img);
//     // /*
//     const storage = getStorage();
//     // const files = [];
//     const pathFiles = await getFilesFromPath('src/ipfs/temp/astraia-image.jpg');
//     // files.push(...pathFiles);
//     const cid = await storage.put(pathFiles);
//     console.log('web3.storage CID:', cid);
//     return cid;
//     // */
//   } catch (e) {
//     console.error('Error web3.storage upload:', e);
//   }
// };
// ---
// Retrieve
const retrieve = (cid) => __awaiter(void 0, void 0, void 0, function* () {
    const retrievedFiles = [];
    try {
        const storage = getStorage();
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
const checkStatus = (cid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = getStorage();
        return yield storage.status(cid);
    }
    catch (e) {
        console.error('Error web3.storage checkStatus:', e);
    }
});
exports.checkStatus = checkStatus;
// List
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const imageList = [];
    try {
        const storage = getStorage();
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