import getArticles from './getArticles';
import getPublishedArticles from './getPublishedArticles';
import getArticleById from './getArticleById';
import addArticle from './addArticle';
import punlishArticle from './publishArticle';
import deleteArticle from './deleteArticle';
import editArticle from './editArticle';
import updateArticleViews from './updateArticleViews';
import * as i from '../../../interfaces/gql';

const articleResolvers = {
  Query: {
    articles: async (_: any, { blog }: i.IStringProps) => {
      console.log('');
      return await getArticles(blog);
    },

    publishedArticles: async (_: any, { blog }: i.IStringProps) => {
      console.log('');
      return await getPublishedArticles(blog);
    },

    getArticleById: async (_: any, { blog, ID }: i.IStringProps) => {
      console.log('');
      return await getArticleById(blog, ID);
    }

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
    addArticle: async (_: any, { blog, input }: i.IStringInputProps) => {
      console.log('');
      return await addArticle(blog, input);
    },

    async publishArticle(_: any, { blog, ID }: i.IStringProps) {
      console.log('');
      return await punlishArticle(blog, ID);
    },

    deleteArticle: async (_: any, { blog, ID }: i.IStringProps) => {
      console.log('');
      return await deleteArticle(blog, ID);
    },

    async editArticle(_: any, { blog, ID, articleInput }: i.IEditArticleProps) {
      console.log('');
      return await editArticle(blog, ID, articleInput);
    },

    async updateArticleViews(_: any, { blog, ID }: i.IStringProps) {
      console.log('');
      return await updateArticleViews(blog, ID);
    }
  }
};

export default articleResolvers;
