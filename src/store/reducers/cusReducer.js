import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedCus: false,
    cusInfo: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CUS_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedCus: true,

                cusInfo: action.cusInfo,
            };
        case actionTypes.CUS_LOGIN_FAIL:
            return {
                ...state,
                isLoggedCus: false,
                cusInfo: null,
            };
        case actionTypes.CUS_LOGOUT:
            console.log("log out");
            return {
                ...state,
                isLoggedCus: false,
                cusInfo: null,
            };
        default:
            return state;
    }
};

export default appReducer;
