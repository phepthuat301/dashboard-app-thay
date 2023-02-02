
import { RESET_USER, SET_LOGIN, SET_USER } from "../actions/userActions";
import { UserState, ReduxActionPayload, StoreInterface } from "../iStore";

export const getUserState = (state: StoreInterface) => {
  return state.userReducer;
};

const initializeState: UserState = {
  id: "",
  avatar: "/assets/images/guest-user.png",
  first_name: "",
  last_name: "",
  isLoggedIn: false
};

const userReducer = (state = initializeState, action: ReduxActionPayload) => {
  switch (action.type) {
    case SET_LOGIN:
      state = { ...state, ...action.payload };
      break;
    case SET_USER:
      state = { ...state, ...action.payload };
      break;
    case RESET_USER:
      state = initializeState;
      break;
  }
  return state
};

export default userReducer;
