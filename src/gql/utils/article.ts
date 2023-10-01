import * as articleService from '../../services/article.service';

export const getAllArticles = async (blog: string) =>
  await articleService.getAllArticles(blog);

export const getArticleById = async (blog: string, ID: string) =>
  await articleService.getArticleById(blog, ID);
