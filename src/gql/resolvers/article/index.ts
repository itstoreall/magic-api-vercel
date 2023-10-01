import { DEFAULT_IPFS_CID } from '../../../constants';
import { setCurrentModel } from '../../../db';
import * as web3Storage from '../../../ipfs/web3Storage';
import getArticles from './getArticles';
import getArticleById from './getArticleById';

const defaultCid = DEFAULT_IPFS_CID;

const articleResolvers = {
  Query: {
    articles: async (_: any, { blog }: { blog: string }) => {
      console.log('');
      return await getArticles(blog);
    },

    getArticleById: async (_: any, { blog, ID }: any) => {
      console.log('');
      return await getArticleById(blog, ID);
    },

    /*
    async getArticleByTitle(_: any, { title }: any) {
      const article = await setCurrentModel('healthy').find({ title });

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
    */
  },

  Mutation: {
    addArticle: async (_: any, { input }: any) => {
      const base64 = input.image;
      let cid: string = defaultCid;

      if (base64) {
        cid = await web3Storage.upload(base64);
      }

      const f = setCurrentModel('healthy');

      const createArticle = new f({
        title: input.title,
        description: input.description,
        text: input.text,
        author: input.author,
        ipfs: cid,
        tags: input.tags,
      });
      // const createArticle = new db.CurrentModel({
      //   title: input.title,
      //   description: input.description,
      //   text: input.text,
      //   author: input.author,
      //   ipfs: cid,
      //   tags: input.tags,
      // });

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
      const wasDeleted = (
        await setCurrentModel('healthy').deleteOne({ _id: ID })
      ).deletedCount;
      // const wasDeleted = (await db.CurrentModel.deleteOne({ _id: ID }))
      //   .deletedCount;

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
        await setCurrentModel('healthy').updateOne(
          { _id: ID },
          base64 ? { ...updatedImage } : { ...onlyText }
        )
      ).modifiedCount;
      // const wasEdited = (
      //   await db.CurrentModel.updateOne(
      //     { _id: ID },
      //     base64 ? { ...updatedImage } : { ...onlyText }
      //   )
      // ).modifiedCount;

      console.log('wasEdited:', wasEdited);

      return wasEdited;
      // */
    },
  },
};

export default articleResolvers;
