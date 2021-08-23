import {actionType} from "store/store";
import cookie from "js-cookie";

export const loginUser = (user) => ({
    type: actionType.LOGIN_USER,
    loggedIn: true,
    currentUser: user
});

export const logoutUser = () => ({
    type: actionType.LOGOUT_USER,
    loggedIn: false,
    currentUser: {}
});

