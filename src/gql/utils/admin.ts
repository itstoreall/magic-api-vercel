import db from '../../db';

export const getAdmin = async (input: { login: string; password: string }) =>
  await db.Admin.find({ login: input.login, password: input.password });
