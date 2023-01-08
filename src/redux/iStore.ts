import { Action } from "redux";
export interface StoreInterface {
    userReducer: UserState
}

export interface ReduxActionPayload extends Action {
    payload?: any;
}

export interface UserState {
    id: string;
    avatar: string;
    first_name: string;
    last_name: string;
    isLoggedIn: boolean;
}
