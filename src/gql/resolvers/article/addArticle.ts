import * as articleUtils from '../../utils/article';

const addArticle = async (blog: string, input: any) => {
  console.log('* addArticle:', blog, input.title);

  const createdArticle = await articleUtils.addArticle(blog, input);

  console.log(1, 'new article created:', createdArticle.title);

  return {
    title: createdArticle.title,
    description: createdArticle.description,
    text: createdArticle.text,
    author: createdArticle.author,
    ipfs: createdArticle.ipfs,
    image: createdArticle.image,
    views: createdArticle.views,
    tags: createdArticle.tags,
    timestamp: createdArticle.timestamp
  };
};

export default addArticle;
