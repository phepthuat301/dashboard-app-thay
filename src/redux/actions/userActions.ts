import { UserState } from "../iStore";

export const SET_LOGIN = "SET_LOGIN";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export const setLogin = (isLoggedIn: boolean) => ({
  type: SET_USER,
  payload: {
    isLoggedIn
  },
});

export const setUser = (payload: UserState) => ({
  type: SET_USER,
  payload,
});

export const resetUser = () => ({
  type: RESET_USER,
});
