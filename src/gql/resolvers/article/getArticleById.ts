import * as articleUtils from '../../utils/article';

const getArticleById = async (blog: string, ID: string) => {
  const article = await articleUtils.getArticleById(blog, ID);

  return {
    id: article._id,
    title: article.title,
    description: article.description,
    text: article.text,
    author: article.author,
    ipfs: article.ipfs,
    views: article.views,
    tags: article.tags,
    timestamp: article.timestamp,
  };
};

export default getArticleById;
