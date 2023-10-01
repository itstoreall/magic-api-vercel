import * as articleUtils from '../../utils/article';

const getArticles = async (blog: string) =>
  await articleUtils.getAllArticles(blog);

export default getArticles;
