import { IAddAdminInput } from '../../../interfaces/admin';
import * as blogUtils from '../../utils/blog';
import * as adminUtils from '../../utils/admin';
import * as utils from '../../../utils';

const isAdmin = (author: string, login: string, pass: string) =>
  adminUtils
    .adminConfig()
    .find(
      adm => adm.name === author && adm.login === login && adm.password === pass
    );

const addNewAuthor = async (input: IAddAdminInput) => {
  console.log('* addNewAdmin:', input);

  const { blog: title, author, credentials, token } = input;
  const { login, password } = credentials;

  const isMaster = await adminUtils.isAdminByToken(token);

  if (isMaster) {
    const admin = await adminUtils.getAdminByCreds(login, password);
    const blog = await blogUtils.getBlogByTitle(title);

    if (!admin?.length) {
      if (blog) {
        if (!blog.authors.includes(author)) {
          if (!isAdmin(author, login, password))
            utils.throwNewError(`Admin creds does not match`);

          const createdAdmin = await adminUtils.createAdmin({
            blog: title,
            name: author,
            token: '',
          });

          const authors = [...blog.authors, author];

          const blogInput = {
            title: blog.title,
            authors,
          };

          const coauthors = await blogUtils.updateCoauthors(blog, blogInput);

          const response = {
            name: createdAdmin.name,
            blogs: createdAdmin.blogs,
            coauthors,
          };

          console.log(1, 'response:', response);

          return response;
        } else utils.throwNewError(`${author} already exists in coauthors`);
      } else utils.throwNewError('no blog in db');
    } else utils.throwNewError('Admin already exists in db (Dublicate)');
  }
};

export default addNewAuthor;
