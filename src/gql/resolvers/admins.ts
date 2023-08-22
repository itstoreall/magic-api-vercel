import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import * as blogUtils from './../utils/blog';
import * as adminUtils from './../utils/admin';

dotenv.config();

export interface IIsAdminArgs {
  token: string;
  blog: string;
}

export type IsAdminRes = Promise<IIsAdminResponse>;

export interface IIsAdminResponse {
  isAdmin: boolean;
  author: string;
  blog: string;
}

export interface IAddAdminInput {
  input: {
    blog: string;
    author: string;
    login: string;
    password: string;
    token: string;
  };
}

export interface IUpdateAdminInput {
  input: { login: string; password: string; blog: string };
}

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

    isAdmin: async (_: any, { token, blog }: IIsAdminArgs): IsAdminRes => {
      console.log(0, 'token, blog', token, blog);

      const admin = await adminUtils.getAdminByToken(token);

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
    addAdmin: async (_: any, { input }: IAddAdminInput) => {
      console.log('input:', input);

      const { blog: title, author, login, password, token } = input;

      const isMaster = await adminUtils.isAdminByToken(token);

      if (isMaster) {
        const admin = await adminUtils.getAdminByCreds(login, password);
        const blog = await blogUtils.getBlogByTitle(title);

        // -------------------- Create new Admin:

        if (!admin?.length) {
          if (blog?.length) {
            if (!blog[0].authors.includes(author)) {
              const createdAdmin = await adminUtils.createAdmin({
                blog: title,
                name: author,
                login,
                password,
                token: '',
              });

              console.log(1, 'createdAdmin:', createdAdmin);

              const authors = [...blog[0].authors, author];
              // const authors = ['Serhii'];

              const blogInput = {
                title: blog[0].title,
                authors,
              };

              const coauthors = await blogUtils.updateCoauthors(
                blog,
                blogInput
              );

              const res = {
                name: createdAdmin.name,
                blogs: createdAdmin.blogs,
                coauthors,
              };

              return res;
            } else throw new Error(`${author} already exists in coauthors`);
          } else throw new Error('no blog in db');
        } else throw new Error('Admin already exists in db (Dublicate)');
      }
    },

    updateAdmin: async (_: any, { input }: IUpdateAdminInput) => {
      console.log('input:', input);

      const { login, password, blog: title } = input;

      if (adminUtils.isGenAdmin(login, password)) {
        const author = adminUtils.setAuthor(login, password);
        let currentBlog;

        const blog = await blogUtils.getBlogByTitle(title);

        // -------------------- Create a Blog:

        if (!blog?.length) {
          if (adminUtils.isMasterAdmin(login, password)) {
            currentBlog = await blogUtils.createNewBlog(title, [author]);
          } else throw new Error('Access denied! (not a master)');
        } else currentBlog = blog;

        console.log(1, 'currentBlog:', currentBlog);

        // -------------------- Update Admin:

        const admin = await adminUtils.getAdminByCreds(login, password);

        if (admin?.length) {
          const accessInput = {
            login,
            password,
            token: uuid(),
            name: admin[0].name,
            blogs: admin[0].blogs,
          };

          if (adminUtils.isMasterAdmin(login, password))
            !admin[0].blogs.includes(title) &&
              blogUtils.handleBlogs(admin, title, accessInput);

          const updatedAdmin = await adminUtils.updateAdmin(
            admin,
            accessInput,
            input
          );

          console.log(1, 'updatedAdmin:', updatedAdmin);

          return updatedAdmin;
        } else console.log('no admin in db:', admin);

        // -------------------- Create Admin:

        if (adminUtils.isMasterAdmin(login, password)) {
          const createdAdmin = await adminUtils.createAdmin({
            login,
            password,
            token: uuid(),
            name: author,
            blog: title,
          });

          console.log(1, 'createdAdmin:', createdAdmin);

          return createdAdmin;
        } else throw new Error('Access denied! (not a master)');
      } else throw new Error('Access denied! (wrong creds)');
    },
  },
};

export default adminResolvers;
