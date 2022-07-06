import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedStaff: false,
    staffInfo: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.STAFF_LOGIN_SUCCESS:
            console.log(`staffInfo`);
            console.log(action.staffInfo);
            return {
                ...state,
                isLoggedStaff: true,

                staffInfo: action.staffInfo,
            };
        case actionTypes.STAFF_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                staffInfo: null,
            };
        case actionTypes.STAFF_LOGOUT:
            console.log("log out");
            return {
                ...state,
                isLoggedIn: false,
                staffInfo: null,
            };
        default:
            return state;
    }
};

export default appReducer;
