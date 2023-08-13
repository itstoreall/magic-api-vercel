import db from '../../../src/db';

const { AdminModel } = db;

export const getAdmin = async (input: { login: string; password: string }) =>
  await AdminModel.find({ login: input.login, password: input.password });
