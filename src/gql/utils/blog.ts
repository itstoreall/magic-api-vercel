import * as blogService from '../../services/blog.service';

export const getBlogByTitle = async (title: string) =>
  await blogService.getBlogByTitle(title);

export const setCurrentBlog = async (title: string, author: string[]) => {
  const blog = await blogService.getBlogByTitle(title);

  console.log(1, `${blog?.length ? 'is' : 'no'} blog in db:`, blog);

  return blog?.length ? blog : await blogService.addNewBlog(title, author);

  // if (blog?.length) {
  //   console.log('is blog', blog);
  //   return blog;
  // } else {
  //   console.log('No blog in db:', blog);
  //   return await blogService.addNewBlog(title, [author]);
  // }
};
