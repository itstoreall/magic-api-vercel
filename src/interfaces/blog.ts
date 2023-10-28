import { IAdminInputProps } from './admin';

export interface ICreateBlogProps {
  blog: { authors: string[]; title?: string };
  input: IAdminInputProps;
  author: { name: string };
}

export interface IHandleAuthorInBlogInput {
  blog: string;
  author: string;
  token: string;
}

export interface IGetBlogTagsProps {
  token: string;
  blog: string;
}

export interface IUpdateBlogTagsInput {
  blog: string;
  tags: string[];
  token: string;
}
