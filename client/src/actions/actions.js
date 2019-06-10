// Actions
import * as actionType from "actionTypes/actionTypes";


// APP Actions
export const setAppState = data => ({
    type: actionType.SET_APP_STATE,
    data
});
export const clearAppState = () => ({
    type: actionType.CLEAR_APP_STATE
});

// USERS Actions
export const requestUserInfo = data => ({
    type: actionType.REQUEST_USER_INFO,
    data
});
export const receiveUserInfo = data => ({
    type: actionType.RECEIVE_USER_INFO,
    receivedAt: Date.now(),
    data
});
export const clearUserInfo = () => ({
    type: actionType.CLEAR_USER_INFO
});
export const stopFetchingUserInfo = () => ({
    type: actionType.STOP_FETCHING_USER_INFO
});
