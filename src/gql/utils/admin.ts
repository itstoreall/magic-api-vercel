import db from '../../db';

export const getAdmin = async (input: { login: string; password: string }) =>
  await db.Admin.find({ login: input.login, password: input.password });

export const getBlog = async (input: { source: string }) =>
  await db.Blog.find({ title: input.source });
