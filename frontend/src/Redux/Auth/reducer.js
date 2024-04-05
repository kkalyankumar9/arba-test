import { LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionType";

const initialState = {
    isLoading: false,
    isError: false,
    isAuth: false,
    token: localStorage.getItem("token") || ""
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGNUP_REQUEST:
        case SIGNIN_REQUEST:
        case LOGOUT_REQUEST:
            return { ...state, isLoading: true, isError: false };

        case SIGNUP_ERROR:
        case SIGNIN_ERROR:
            return { ...state, isError: true, isLoading: false };

        case SIGNIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuth: true,
                isError: false,
                isLoading: false,
                token: payload.token
            };

        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuth: false,
                isError: false,
                isLoading: false,
                token: ""
            };

        default:
            return state;
    }
};
