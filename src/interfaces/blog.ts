import { IAdminInputProps } from './admin';

export interface ICreateBlogProps {
  blog: { length: number };
  input: IAdminInputProps;
  author: { name: string };
}
