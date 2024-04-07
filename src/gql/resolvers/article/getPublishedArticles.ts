import * as articleUtils from '../../utils/article';
import * as gc from '../../../config/global';

const { published } = gc.articleStatus;

const getPublishedArticles = async (blog: string) => {
  console.log('* getPublishedArticles:', blog);
  const articles = await articleUtils.getAllArticles(blog);
  const publishedArticles = articles.filter(art => art.status === published);
  console.log(1, 'articles:', publishedArticles?.length);
  return publishedArticles;
};

export default getPublishedArticles;
