import * as articleUtils from '../../utils/article';

const getArticleById = async (blog: string, ID: string) => {
  console.log('* getArticleById:', blog, ID);
  const article = await articleUtils.getArticleById(blog, ID);

  console.log(1, 'article:', article);

  return article
    ? {
        id: article._id,
        title: article.title,
        description: article.description,
        text: article.text,
        author: article.author,
        ipfs: article.ipfs,
        image: article.image,
        views: article.views,
        tags: article.tags,
        timestamp: article.timestamp
      }
    : {};
};

export default getArticleById;
