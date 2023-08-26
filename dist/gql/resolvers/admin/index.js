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
const updateAdmin_1 = __importDefault(require("./updateAdmin"));
const addNewAdmin_1 = __importDefault(require("./addNewAdmin"));
dotenv_1.default.config();
// export interface IIsAdminArgs {
//   token: string;
//   blog: string;
// }
// export type IsAdminRes = Promise<IIsAdminResponse>;
// export interface IIsAdminResponse {
//   isAdmin: boolean;
//   author: string;
//   blog: string;
// }
// export interface IAddAdminInput {
//   blog: string;
//   author: string;
//   login: string;
//   password: string;
//   token: string;
// }
// export interface IUpdateAdminInputProps {
//   login: string;
//   password: string;
//   blog: string;
// }
// export interface IUpdateAdminInput {
//   input: IUpdateAdminInputProps;
// }
/*
interface IAdminResolvers {
  Query: {
    isAdmin: (parent: any, args: IIsAdminArgs) => IsAdminRes;
  };
  // Mutation: {
  //   updateAdmin: (
  //     parent: any,
  //     args: IUpdateAdminInput
  //   ) => Promise<IUpdateAdminResponse>;
  // };
}
*/
const adminResolvers = {
    Query: {
        /*
        getAdmin: async (_: any, { login, password }: any) => {
          try {
            const admin = await db.Admin.find({ login, password });
    
            console.log('getAdmin:', admin);
    
            if (admin?.length) {
              return {
                login: admin[0].login,
                password: admin[0].password,
                token: admin[0].token,
                name: admin[0].name,
              };
            }
          } catch (e) {
            throw new Error(`Failed to fetch admin: ${e}`);
          }
        },
        */
        isAdmin: (_, { token, blog }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, isAdmin_1.default)(blog, token);
        }),
    },
    Mutation: {
        addAdmin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, addNewAdmin_1.default)(input);
        }),
        updateAdmin: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('');
            return yield (0, updateAdmin_1.default)(input);
        }),
    },
};
exports.default = adminResolvers;
//# sourceMappingURL=index.js.map