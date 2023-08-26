import { IUpdateAdminInputProps } from './admin';

export interface ICreateBlogProps {
  blog: { length: number };
  input: IUpdateAdminInputProps;
  author: { name: string };
}
