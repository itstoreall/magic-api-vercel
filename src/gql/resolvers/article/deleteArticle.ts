import * as articleUtils from '../../utils/article';

const deleteArticle = async (blog: string, ID: string) => {
  console.log('* deleteArticle:', blog, ID);

  const wasDeleted = await articleUtils.deleteArticle(blog, ID);

  console.log(1, 'article was deleted:', Boolean(wasDeleted));

  return wasDeleted;
};

export default deleteArticle;
