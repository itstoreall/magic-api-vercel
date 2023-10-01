import { DEFAULT_IPFS_CID } from '../../constants';
import * as web3Storage from '../../ipfs/web3Storage';
import * as articleService from '../../services/article.service';

export const getAllArticles = async (blog: string) =>
  await articleService.getAllArticles(blog);

export const getArticleById = async (blog: string, ID: string) =>
  await articleService.getArticleById(blog, ID);

const getIpfsCid = async (base64: string) => {
  let cid: string = DEFAULT_IPFS_CID;
  if (base64) cid = await web3Storage.upload(base64);
  return cid;
};

export const addArticle = async (blog: string, input: any) => {
  const cid = await getIpfsCid(input.image);
  const newArticleInput = {
    title: input.title,
    description: input.description,
    text: input.text,
    author: input.author,
    ipfs: cid,
    tags: input.tags,
  };
  return await articleService.createArticle(blog, newArticleInput);
};
