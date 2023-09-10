import { deleteAdminFromBlog } from '../../../gql/utils/blog';
import { IDelAuthorFromBlogInput } from '../../../interfaces/blog';

const deleteAuthorFromBlog = async (input: IDelAuthorFromBlogInput) => {
  console.log('* deleteAuthorFromBlog input:', input);
  return await deleteAdminFromBlog(input);
};

export default deleteAuthorFromBlog;
