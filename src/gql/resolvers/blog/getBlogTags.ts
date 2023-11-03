import * as blogUtils from '../../utils/blog';

const getBlogTags = async (token: string, blog: string) =>
  await blogUtils.getBlogTags(token, blog);

export default getBlogTags;
