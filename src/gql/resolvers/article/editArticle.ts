import * as articleUtils from '../../utils/article';

const editArticle = async (blog: string, ID: string, input: any) => {
  console.log('* editArticle:', blog, input);

  const wasEdited = await articleUtils.editArticle(blog, ID, input);

  console.log(1, 'article was updated:', Boolean(wasEdited));

  return wasEdited;
};

export default editArticle;
