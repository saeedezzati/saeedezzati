// https://medium.com/@Scarysize/syncing-redux-stores-across-browser-tabs-fff04f975423

import { RECEIVE_USER_INFO, CLEAR_USER_INFO } from "./actionTypes/actionTypes";

const randomRange = 10000;
const maxOpenTabs = 2;
const sourceId = Math.floor(Math.random() * randomRange);

const storageKey = "redux-tab-sync";
const validActionTypes = [RECEIVE_USER_INFO, CLEAR_USER_INFO];
export function storageMiddleware() {
    return () => next => action => {
        if (validActionTypes.includes(action.type)) {
            if (action.counter) {
                action.counter += 1;
            } else {
                action.counter = 1;
                action.sourceId = sourceId;
            }
            localStorage.setItem(
                storageKey,
                JSON.stringify(action),
            );
        }
        next(action);
    };
}

export function createOnStorage(store) {
    return () => {
        const action = JSON.parse(localStorage.getItem(storageKey));
        if (action && action.sourceId !== sourceId && action.counter <= maxOpenTabs) {
            store.dispatch(action);
        }
    };
}
