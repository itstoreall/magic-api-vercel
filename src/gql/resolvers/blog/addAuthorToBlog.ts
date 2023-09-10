// import { deleteAdminFromBlog } from '../../../gql/utils/blog';
import { IHandleAuthorInBlogInput } from '../../../interfaces/blog';

const addAuthorToBlog = async (input: IHandleAuthorInBlogInput) => {
  console.log('* addAuthorToBlog input:', input);
  // return await deleteAdminFromBlog(input);
};

export default addAuthorToBlog;
