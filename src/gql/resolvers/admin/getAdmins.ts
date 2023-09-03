import * as adminUtils from '../../../gql/utils/admin';

const getAdmins = async (token: string) => await adminUtils.getAllAdmins(token);

export default getAdmins;
