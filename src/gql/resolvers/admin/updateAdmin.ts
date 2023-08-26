import { v4 as uuid } from 'uuid';
import { IAdmin, IUpdateAdminInputProps } from '../../../interfaces/admin';
import { ICreateBlogProps } from '../../../interfaces/blog';
import * as blogUtils from '../../utils/blog';
import * as adminUtils from '../../utils/admin';
import * as utils from '../../../utils';

const createBlog = async (props: ICreateBlogProps) => {
  const { blog, input, author } = props;
  const { login, password, blog: title } = input;

  const createNewBlog = async () => {
    await blogUtils.createNewBlog(title, [author?.name]);
  };

  !blog?.length
    ? adminUtils.isMasterAdmin(login, password)
      ? await createNewBlog()
      : utils.throwNewError('Access denied! (not a master)')
    : console.log('- blog already exists in db');
};

const createAdmin = async (
  input: IUpdateAdminInputProps,
  author: { name: string }
) => {
  const { login, password, blog: title } = input;

  if (adminUtils.isMasterAdmin(login, password)) {
    const createdAdmin = await adminUtils.createAdmin({
      login,
      password,
      token: uuid(),
      name: author?.name,
      blog: title,
    });

    return createdAdmin;
  } else utils.throwNewError('Access denied! (not a master)');
};

const updateAdmin = async (input: IUpdateAdminInputProps, admin: IAdmin) => {
  const { login, password, blog: title } = input;

  const accessInput = {
    login,
    password,
    token: uuid(),
    name: admin.name,
    blogs: admin.blogs,
  };

  const isMaster = adminUtils.isMasterAdmin(login, password);

  // ------------- Add new blog to blogs (for Master):

  if (isMaster)
    !admin.blogs.includes(title) &&
      blogUtils.pushToAuthorBlogs(title, accessInput);

  // ------------- checks if the blog is in blogs (for User):

  if (!isMaster)
    !admin.blogs.find(blog => blog === title) &&
      utils.throwNewError('Access denied! (wrong creds)');

  return await adminUtils.updateAdmin(admin, accessInput, input);
};

const updateAdminHandler = async (input: IUpdateAdminInputProps) => {
  console.log('* updateAdmin input:', input);

  const { login, password, blog: title } = input;

  if (adminUtils.isGenAdmin(login, password)) {
    const author = adminUtils.setAuthor(login, password);
    const blog = await blogUtils.getBlogByTitle(title);
    const admin = await adminUtils.getAdminByCreds(login, password);

    // -------------------- Create a Blog:

    await createBlog({ blog, input, author });

    // -------------------- Update Admin:

    const updatedAdmin = admin?.length
      ? await updateAdmin(input, admin[0] as IAdmin)
      : await createAdmin(input, author);

    console.log(1, 'response:', updatedAdmin);

    return updatedAdmin;
  } else utils.throwNewError('Access denied! (wrong creds)');
};

export default updateAdminHandler;
