import * as blogUtils from '../../utils/blog';

const getAdmins = async (token: string) => await blogUtils.getAllBlogs(token);

export default getAdmins;
