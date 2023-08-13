import { GraphQLDate } from 'graphql-iso-date';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { DEFAULT_IPFS_CID } from '../constants';
import db from '../db';
import { getAdmin } from './utils/admin';
import * as web3Storage from '../ipfs/web3Storage';
dotenv.config();

const defaultCid = DEFAULT_IPFS_CID;

const { AdminModel, CurrentModel } = db;

const envLoginMila = process.env.LOGIN_MILA;
const envPasswordMila = process.env.PASSWORD_MILA;
const envLoginSerhii = process.env.LOGIN_SERHII;
const envPasswordSerhii = process.env.PASSWORD_SERHII;

const resolvers = {
  Query: {
    getAdmin: async (_: any, { login, password }: any) => {
      try {
        const admin = await AdminModel.find({ login, password });

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

    isAdmin: async (_: any, { token }: { token: string }) => {
      try {
        const admin = await AdminModel.findOne({ token });

        return admin
          ? { isAdmin: true, author: admin.name }
          : { isAdmin: false, author: '' };
      } catch (e) {
        throw new Error(`Failed to check isAdmin: ${e}`);
      }
    },

    // -------------------------- Articles

    articles: async () => {
      try {
        const res = await CurrentModel.find();

        console.log('articles:', res?.length);
        // console.log('articles:', res);

        return res;
      } catch (error) {
        throw new Error('Failed to fetch articles');
      }
    },

    getArticleById: async (_: any, { ID }: any) => {
      const article = await CurrentModel.find({ _id: ID });

      console.log('getArticleById:', article);

      return {
        id: article[0]._id,
        title: article[0].title,
        description: article[0].description,
        text: article[0].text,
        author: article[0].author,
        ipfs: article[0].ipfs,
        views: article[0].views,
        tags: article[0].tags,
        timestamp: article[0].timestamp,
      };
    },

    async getArticleByTitle(_: any, { title }: any) {
      const article = await CurrentModel.find({ title });

      console.log('getArticleByTitle:', article);

      return {
        id: article[0]._id,
        title: article[0].title,
        description: article[0].description,
        text: article[0].text,
        author: article[0].author,
        ipfs: article[0].ipfs,
        views: article[0].views,
        tags: article[0].tags,
        timestamp: article[0].timestamp,
      };
    },
  },

  Mutation: {
    updateAdmin: async (_: any, { input }: any) => {
      const { login, password } = input;

      console.log('env access Mila:', envLoginMila, envPasswordMila);
      console.log('env access Serhii:', envLoginSerhii, envPasswordSerhii);

      const isMila = login == envLoginMila && password == envPasswordMila;
      const isSerhii = login == envLoginSerhii && password == envPasswordSerhii;

      if (isMila || isSerhii) {
        const admin = await getAdmin(input);

        const accessInput = {
          login,
          password,
          token: uuid(),
          name: isMila ? 'Mila' : 'Serhii',
        };

        // -------------------- Update:

        if (admin?.length) {
          const updatedAccess = (
            await AdminModel.updateOne(
              { _id: admin[0]._id },
              { ...accessInput }
            )
          ).modifiedCount;

          console.log('wasUpdated:', updatedAccess);

          if (updatedAccess) {
            const admin = await getAdmin(input);

            return {
              token: admin[0].token,
              author: admin[0].name,
            };
          } else throw new Error('Admin update error!');
        } else console.log('No admin in db:', admin);

        // -------------------- Create:

        const createAccess = new AdminModel({
          login,
          password,
          token: uuid(),
          name: isMila ? 'Mila' : 'Serhii',
        });

        const access = await createAccess.save();

        return {
          token: access.token,
          author: access.name,
        };
      } else throw new Error('Access denied!');
    },

    // -------------------------- Articles

    addArticle: async (_: any, { input }: any) => {
      const base64 = input.image;
      let cid: string = defaultCid;

      if (base64) {
        cid = await web3Storage.upload(base64);
      }

      const createArticle = new CurrentModel({
        title: input.title,
        description: input.description,
        text: input.text,
        author: input.author,
        ipfs: cid,
        tags: input.tags,
      });

      const res = await createArticle.save();

      console.log('addArticle:', res);

      return {
        title: res.title,
        description: res.description,
        text: res.text,
        author: res.author,
        ipfs: res.ipfs,
        views: res.views,
        tags: res.tags,
        timestamp: res.timestamp,
      };
    },

    deleteArticle: async (_: any, { ID }: { ID: string }) => {
      const wasDeleted = (await CurrentModel.deleteOne({ _id: ID }))
        .deletedCount;

      console.log('wasDeleted:', wasDeleted);

      return wasDeleted;
    },

    async editArticle(_: any, { ID, articleInput }: any) {
      console.log('articleInput -->', articleInput);

      // /*
      const base64 = articleInput.image;

      let cid: string;

      if (base64) {
        console.log('is base64 -->', base64);
        cid = await web3Storage.upload(base64);
      }

      const updatedImage = { ...articleInput, ipfs: cid };
      const onlyText = { ...articleInput };
      delete onlyText.image;

      console.log('onlyText', onlyText);

      const wasEdited = (
        await CurrentModel.updateOne(
          { _id: ID },
          base64 ? { ...updatedImage } : { ...onlyText }
        )
      ).modifiedCount;

      console.log('wasEdited:', wasEdited);

      return wasEdited;
      // */
    },
  },

  Date: GraphQLDate,
};

export default resolvers;