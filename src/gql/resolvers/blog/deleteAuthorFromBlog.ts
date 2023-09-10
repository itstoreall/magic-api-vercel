import { deleteAdminFromBlog } from '../../../gql/utils/blog';
import { IHandleAuthorInBlogInput } from '../../../interfaces/blog';

const deleteAuthorFromBlog = async (input: IHandleAuthorInBlogInput) => {
  console.log('* deleteAuthorFromBlog input:', input);
  return await deleteAdminFromBlog(input);
};

export default deleteAuthorFromBlog;
