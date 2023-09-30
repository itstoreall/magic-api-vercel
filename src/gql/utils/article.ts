import * as articleService from '../../services/article.service';

export const getAllArticles = async (blog: string) => {
  const admins = await articleService.getAllArticles(blog);
  return admins;
};
