export interface IAdminCreds {
  login: string;
  password: string;
  token: string;
  name: string;
}

export interface IAdmin extends IAdminCreds {
  blogs: string[];
}

export interface ICreateAdminArgs extends IAdminCreds {
  blog: string;
}
