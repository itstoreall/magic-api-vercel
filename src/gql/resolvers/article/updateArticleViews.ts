import * as articleUtils from '../../utils/article';

const updateArticleViews = async (blog: string, ID: string) => {
  console.log('* updateArticleViews:', blog, ID);
  const isUpdated = await articleUtils.updateArticleViews(blog, ID);
  console.log(1, 'article views updated:', isUpdated);
  return isUpdated;
};

export default updateArticleViews;
