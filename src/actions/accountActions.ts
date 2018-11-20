import { USER_LOGIN_REGISTER } from "../constants";

export const login = (params: any, callback: () => void ) => ({
  type: USER_LOGIN_REGISTER,
  data: params,
  callback,
});
