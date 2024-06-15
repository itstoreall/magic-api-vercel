// import { DEFAULT_IPFS_CID } from '../../constants';
import * as gc from '../../config/global';
import modelsConfig from '../../db/config';
import * as web3Storage from '../../ipfs/web3Storage';
import * as articleService from '../../services/article.service';
import { isAstraia } from './blog';

const { created, published, updated, failed } = gc.articleStatus;

// const existingBlogs = process.env.EXISTING_BLOGS;

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

  // console.log(111, '+ created', blog, await isAstraia(blog));

  const img = (await isAstraia(blog))
    ? { image: input.image || '' }
    : { ipfs: input.image };

  const description = (await isAstraia(blog))
    ? { description: `${input.text.slice(0, 152)}...` }
    : { description: input.description };

  const newArticleInput = {
    title: input.title,
    // description: input.description,
    ...description,
    text: input.text,
    author: input.author,
    // ipfs: cid,
    // ipfs: input.image,
    // image: input.image || '',
    ...img,
    views: input.views,
    tags: input.tags,
    status: 'created'
  };

  return await articleService.createArticle(blog, newArticleInput);
};

export const publishArticle = async (blog: string, ID: string) => {
  const input = { status: published };
  const isPublished = await articleService.publishArticle(blog, ID, input);
  return { status: isPublished ? published : failed };
};

export const deleteArticle = async (blog: string, ID: string) =>
  await articleService.deleteArticle(blog, ID);

export const editArticle = async (blog: string, ID: string, input: any) => {
  const artticle = await getArticleById(blog, ID);
  if (blog === modelsConfig.articles.astraia.label) {
    /*
    const base64 = input.image;
    const cid = await updateIpfsCid(blog, base64);
    const newImage = { ...input, ipfs: cid };
    const onlyText = { ...input };
    delete onlyText.image;
    const artInput = base64 ? newImage : onlyText;
    */
    const createInput = () => {
      switch (artticle.status) {
        case created:
          return created;
        case published:
          return updated;
        case updated:
          return updated;
        default:
          return created;
      }
    };
    input = { ...input, status: createInput() };
    return await articleService.updateArticle(blog, ID, input);
  }

  if (blog === modelsConfig.articles.healthy.label) {
    const base64 = input.image;
    const cid = await updateIpfsCid(blog, base64);
    const newImage = { ...input, ipfs: cid };
    const onlyText = { ...input };
    delete onlyText.image;
    const artInput = base64 ? newImage : onlyText;
    return await articleService.updateArticle(blog, ID, artInput);
  }
};

export const updateArticleViews = async (blog: string, ID: string) => {
  const article = (await getArticleById(blog, ID)).toObject();
  const newView = Number(article.views) > 0 ? Number(article.views) + 1 : 1;
  const artInput = { ...article, views: newView };
  return Boolean(await articleService.updateArticle(blog, ID, artInput));
};
