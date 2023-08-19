import { getAdmin, getBlog } from './../utils/admin';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import db from '../../db';
import * as adnimService from '../../services/admin.service';

dotenv.config();

export interface IIsAdminArgs {
  token: string;
  blog: string;
}

export type IsAdminRes = Promise<IIsAdminResponse>;

export interface IIsAdminResponse {
  isAdmin: boolean;
  author: string;
  blog: string | null;
}

export interface IUpdateAdminInput {
  input: { login: string; password: string; blog: string };
}

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

const envLoginMila = process.env.LOGIN_MILA;
const envPasswordMila = process.env.PASSWORD_MILA;
const envLoginSerhii = process.env.LOGIN_SERHII;
const envPasswordSerhii = process.env.PASSWORD_SERHII;

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

    isAdmin: async (_: any, { token, blog }: IIsAdminArgs): IsAdminRes => {
      console.log(0, 'token, blog', token, blog);

      const admin = await adnimService.getAdminByToken(token);

      if (admin && admin.blogs.includes(blog)) {
        console.log(1, 'is admin in db:', admin);
        const currentBlog = admin.blogs[admin.blogs.indexOf(blog)];

        const success = {
          isAdmin: true,
          author: admin.name,
          blog: currentBlog,
        };

        console.log(1, 'success res:', success);

        return success;
      } else console.log(0, 'no admin in db');

      return { isAdmin: false, author: '', blog: '' };
    },
  },

  Mutation: {
    updateAdmin: async (_: any, { input }: IUpdateAdminInput) => {
      console.log(1, input);
      const { login, password, blog: source } = input;

      const admInput = { login, password };
      const blogInput = { source };

      console.log('login, password, blog:', login, password, source);

      console.log('env access Mila:', envLoginMila, envPasswordMila);
      console.log('env access Serhii:', envLoginSerhii, envPasswordSerhii);

      const isMila = login == envLoginMila && password == envPasswordMila;
      const isSerhii = login == envLoginSerhii && password == envPasswordSerhii;

      if (isMila || isSerhii) {
        const author = isMila ? 'Mila' : 'Serhii';
        let currentBlog;

        // -------------------- Create Blog:

        const blog = await getBlog(blogInput);

        if (blog?.length) {
          console.log('is blog', blog);
          currentBlog = blog;
        } else {
          console.log('No blog in db:', blog);
          const newBlog = new db.Blog({
            title: source,
            authors: [author],
          });
          const createdBlog = await newBlog.save();
          console.log('createdBlog:', createdBlog);
          currentBlog = createdBlog;
        }

        console.log('currentBlog:', currentBlog);

        // -------------------- Update Admin:

        const admin = await getAdmin(admInput);

        if (admin?.length) {
          const accessInput = {
            login,
            password,
            token: uuid(),
            name: author,
          };

          const updatedAccess = (
            await db.Admin.updateOne({ _id: admin[0]._id }, { ...accessInput })
          ).modifiedCount;

          console.log('wasUpdated:', updatedAccess);

          if (updatedAccess) {
            const admin = await getAdmin(admInput);

            return {
              token: admin[0].token,
              author: admin[0].name,
              blog: admin[0].blogs[0],
            };
          } else throw new Error('Admin update error!');
        } else console.log('No admin in db:', admin);

        // -------------------- Create Admin:

        const createAccess = new db.Admin({
          login,
          password,
          token: uuid(),
          name: author,
          blogs: [source],
        });

        const access = await createAccess.save();

        return {
          token: access.token,
          author: access.name,
          blog: access.blogs,
        };
      } else throw new Error('Access denied!');
    },
  },
};

export default adminResolvers;