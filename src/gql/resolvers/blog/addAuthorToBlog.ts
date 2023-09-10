import { addCoauthor } from '../../../gql/utils/blog';
import { IHandleAuthorInBlogInput } from '../../../interfaces/blog';

const addAuthorToBlog = async (input: IHandleAuthorInBlogInput) => {
  console.log('* addAuthorToBlog input:', input);
  const updatedCoauthors = await addCoauthor(input);
  return updatedCoauthors.includes(input.author) ? true : false;
};

export default addAuthorToBlog;
