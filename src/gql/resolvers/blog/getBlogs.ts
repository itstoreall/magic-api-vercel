import * as blogUtils from '../../utils/blog';

const getBlogs = async (token: string) => await blogUtils.getAllBlogs(token);

export default getBlogs;
