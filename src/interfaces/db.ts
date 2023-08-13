import { Document } from 'mongoose';

export interface IAdminModel extends Document {
  login: string;
  password: string;
  token: string;
  name: string;
}

export interface IDefaultConfig {
  title: string;
  description: string;
  text: string;
  author: string;
  ipfs: string;
  views: string;
  timestamp: Date;
}

export interface IArticleModel extends Document, IDefaultConfig {
  tags: string[];
}
