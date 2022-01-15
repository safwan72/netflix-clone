import axios from "axios";
import * as actiontypes from "./actiontype";
import baseURL from "../AuthBackend/baseUrl";
import jwtDecode from "jwt-decode";

export const authsuccess = (token, userId, userEmail) => {
    return {
        type: actiontypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            userEmail: userEmail,
        },
    };
};
export const profilefetchsuccess = (user_profile) => {
    return {
        type: actiontypes.PROFILE_FETCH_SUCCESS,
        payload: {
            user_profile: user_profile,
        },
    };
};
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("expirationTime");
    return {
        type: actiontypes.LOG_OUT,
    };
};
export const authLoading = (loading) => {
    return {
        type: actiontypes.AUTH_LOADING,
        payload: loading,
    };
};
export const authloadingFailed = (errmsg) => {
    return {
        type: actiontypes.AUTH_FAILED,
        payload: errmsg,
    };
};
export const appreload = (loadVal) => {
    return {
        type: actiontypes.LOADAPP,
        payload: loadVal,
    };
};

export const authcheck = () => (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    if (token) {
        const expirytime = new Date(localStorage.getItem("expirationTime"));
        if (expirytime <= new Date()) {
            dispatch(logout());
        }
        else {
            dispatch(authsuccess(token, userId, userEmail));
        }
    } else {
        dispatch(logout());
    }
};

export const fetchprofile = (u_id) => (dispatch) => {
    dispatch(authLoading(true));

    const url = `${baseURL}backend/profile/${u_id}/`;


    axios.get(url)
        .then((response) => {
            dispatch(authLoading(false));
            dispatch(profilefetchsuccess(response?.data));
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
};
export const authSignin = (email, password, mode) => (dispatch) => {
    const authData = {
        email: email,
        password: password,
    }
    dispatch(authLoading(true));
    let url = null;
    if (mode === "Sign In") {
        url = `${baseURL}backend/token/`;
    } else {
        url = `${baseURL}backend/signup/`;
    }
    const header = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    axios.post(url, authData, header)
        .then((response) => {
            dispatch(authLoading(false));
            const decoded_token = jwtDecode(response.data?.access || response.data?.tokens?.access);
            localStorage.setItem('token', decoded_token.jti);
            localStorage.setItem('userId', decoded_token.user_id);
            localStorage.setItem('userEmail', decoded_token.email);
            const expirationTime = new Date(decoded_token.exp * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authsuccess(decoded_token.jti, decoded_token.user_id, decoded_token.email));
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
};