import { IAdminInputProps } from './admin';

export interface ICreateBlogProps {
  blog: { length: number };
  input: IAdminInputProps;
  author: { name: string };
}

export interface IDelAuthorFromBlogInput {
  blog: string;
  author: string;
  token: string;
}

export interface IHandleAuthorInBlogInput {
  blog: string;
  author: string;
  token: string;
}
