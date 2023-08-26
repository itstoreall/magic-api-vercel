import mongoose from 'mongoose';

export interface IAdminCreds {
  login: string;
  password: string;
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

export interface IAddAdminInput {
  blog: string;
  author: string;
  login: string;
  password: string;
  token: string;
}

export interface IUpdateAdminInputProps {
  login: string;
  password: string;
  blog: string;
}

export interface IUpdateAdminInput {
  input: IUpdateAdminInputProps;
}
