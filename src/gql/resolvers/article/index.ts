import getArticles from './getArticles';
import getArticleById from './getArticleById';
import addArticle from './addArticle';
import deleteArticle from './deleteArticle';
import editArticle from './editArticle';

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
    addArticle: async (_: any, { blog, input }: any) => {
      console.log('');
      return await addArticle(blog, input);
    },

    deleteArticle: async (_: any, { blog, ID }: any) => {
      console.log('');
      return await deleteArticle(blog, ID);
    },

    async editArticle(_: any, { blog, ID, articleInput }: any) {
      console.log('');
      return await editArticle(blog, ID, articleInput);
    },
  },
};

export default articleResolvers;
