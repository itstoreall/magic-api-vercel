import * as articleUtils from '../../utils/article';

const publishArticle = async (blog: string, ID: string) => {
  console.log('* publishArticle:', blog);

  const wasPublished = await articleUtils.publishArticle(blog, ID);

  console.log(1, 'article was published:', Boolean(wasPublished));

  return wasPublished;
};

export default publishArticle;
