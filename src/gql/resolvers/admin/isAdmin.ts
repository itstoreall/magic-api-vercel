import * as adminUtils from '../../utils/admin';

const isAdmin = async (title: string, token: string) => {
  console.log('* isAdmin', title, token);

  const admin = await adminUtils.getAdminByToken(token);

  if (admin && admin.blogs.includes(title)) {
    const currentBlog = admin.blogs[admin.blogs.indexOf(title)];

    const success = {
      isAdmin: true,
      author: admin.name,
      blog: currentBlog,
    };

    console.log(1, 'response:', success);

    return success;
  } else console.log(0, 'no admin in db');

  return { isAdmin: false, author: '', blog: '' };
};

export default isAdmin;
