import * as actions from "./actiontype";
const initstate = {
    token: null,
    userId: null,
    userEmail: null,
    userDetails: null,
    authloading: false,
    loadAPP: false,
    authloadingfailedmessage: null,
    authloadingfailed: false
};
const Reducer = (state = initstate, action) => {
    switch (action.type) {
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                userEmail: action.payload.userEmail,
                authloadingfailedmessage: "Succesfully Loggedin",
            }
        case actions.PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                userDetails: action.payload.user_profile
            }
        case actions.LOADAPP:
            return {
                ...state,
                loadAPP: action.payload
            }
        case actions.LOG_OUT:
            return {
                ...state,
                token: null,
                userId: null,
                userEmail: null,
                authloadingfailedmessage: null,
            }
        case actions.AUTH_LOADING:
            return {
                ...state,
                authloading: action.payload
            }
        case actions.AUTH_FAILED:
            return {
                ...state,
                authloadingfailedmessage: action.payload,
            }
        default:
            return state;
    }
};
export default Reducer;