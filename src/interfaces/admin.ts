import mongoose from 'mongoose';

export interface IAdminCreds {
  token: string;
  name: string;
}

export interface IAccessInput extends IAdminCreds {
  blogs: string[];
}

export interface IAdmin extends IAccessInput {
  _id: string | mongoose.Types.ObjectId;
}

export interface ICreateAdminArgs extends IAdminCreds {
  blog: string;
}

export interface IIsAdminArgs {
  token: string;
  blog: string;
}

export interface IIsAdminResponse {
  isAdmin: boolean;
  author: string;
  blog: string;
}

export interface IAdminCredentials {
  login: string;
  password: string;
}

export interface IAddAdminInput {
  blog: string;
  author: string;
  credentials: IAdminCredentials;
  token: string;
}

export interface IAdminInputProps {
  credentials: IAdminCredentials;
  blog: string;
}

export interface IAdminInput {
  input: IAdminInputProps;
}

export interface IDelAuthorFromBlogInput {
  blog: string;
  author: string;
  token: string;
}
