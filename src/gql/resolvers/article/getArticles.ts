import * as articleUtils from '../../utils/article';

const getArticles = async (blog: string) => {
  console.log('* getArticles:', blog);
  const articles = await articleUtils.getAllArticles(blog);
  console.log(1, 'articles:', articles?.length);
  return await articleUtils.getAllArticles(blog);
};

export default getArticles;
