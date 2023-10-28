import * as utils from '../../../gql/utils/blog';
import { IUpdateBlogTagsInput } from '../../../interfaces/blog';

const updateBlogTags = async (input: IUpdateBlogTagsInput) => {
  console.log('* updateBlogTags input:', input);

  const updated = await utils.updateBlogTags(input);

  return true;
};

export default updateBlogTags;
