// Reducer
// Reducers only update the State
import { REHYDRATE } from "redux-persist/src/constants";
import * as actionType from "actionTypes/actionTypes";

const app = (state = {
    getNotifiedEmail: ""

}, action) => {
    switch (action.type) {
        case actionType.SET_APP_STATE:
            return {
                ...state,
                ...action.data
            };
        case actionType.CLEAR_APP_STATE:
            return {
                ...state,
                getNotifiedEmail: ""
            };
        case REHYDRATE:
            if (!action.payload) {
                action.payload = { app: {} };
            }
            return {
                ...state,
                ...action.payload.app,
                getNotifiedEmail: ""
            };

        default:
            return state;
    }
};
export default app;
