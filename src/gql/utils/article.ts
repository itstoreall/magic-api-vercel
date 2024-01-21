// import { DEFAULT_IPFS_CID } from '../../constants';
import * as web3Storage from '../../ipfs/web3Storage';
import * as articleService from '../../services/article.service';

export const getAllArticles = async (blog: string) => {
  const articles = await articleService.getAllArticles(blog);
  const reversedArticles = articles.reverse();
  return reversedArticles;
};

export const getArticleById = async (blog: string, ID: string) =>
  await articleService.getArticleById(blog, ID);

/*
const createIpfsCid = async (blog: string, base64: string) => {
  let cid: string = DEFAULT_IPFS_CID;
  if (base64) cid = await web3Storage.upload(blog, base64);
  return cid;
};
*/

const updateIpfsCid = async (blog: string, base64: string) => {
  let cid: string;
  if (base64) cid = await web3Storage.upload(blog, base64);
  return cid;
};

export const addArticle = async (blog: string, input: any) => {
  // const cid = await createIpfsCid(blog, input.image);

  const newArticleInput = {
    title: input.title,
    description: input.description,
    text: input.text,
    author: input.author,
    // ipfs: cid,
    ipfs: input.image,
    views: input.views,
    tags: input.tags
  };
  return await articleService.createArticle(blog, newArticleInput);
};

export const deleteArticle = async (blog: string, ID: string) =>
  await articleService.deleteArticle(blog, ID);

export const editArticle = async (blog: string, ID: string, input: any) => {
  const base64 = input.image;
  const cid = await updateIpfsCid(blog, base64);
  const newImage = { ...input, ipfs: cid };
  const onlyText = { ...input };
  delete onlyText.image;
  const artInput = base64 ? newImage : onlyText;
  return await articleService.updateArticle(blog, ID, artInput);
};

export const updateArticleViews = async (blog: string, ID: string) => {
  const article = (await getArticleById(blog, ID)).toObject();
  const newView = Number(article.views) > 0 ? Number(article.views) + 1 : 1;
  const artInput = { ...article, views: newView };
  return Boolean(await articleService.updateArticle(blog, ID, artInput));
};
