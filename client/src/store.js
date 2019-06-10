import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native
// import sessionStorage from 'redux-persist/lib/storage/session';
import createEncryptor from "redux-persist-transform-encrypt";
import thunk from "redux-thunk";
import rootReducer from "./reducers/reducers";
import { storageMiddleware } from "./middleware";
// import createSagaMiddleware from 'redux-saga'
// import rootSaga from './sagas'

let composeEnhancers = compose;
// const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk];
// const middleware = [ sagaMiddleware ]
if (typeof window !== "undefined") {
    middleware.push(storageMiddleware());
    // middleware.push(sagaMiddleware)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger({ diff: true }));
}
const encryptor = createEncryptor({
    secretKey: "fsdfSDSFAf3na"
});
const config = {
    key: "root", // key is required
    storage, // storage is now required
    debug: "true",
    transforms: [encryptor]
};
const reducer = persistReducer(config, rootReducer);

function configureStore() {
    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middleware))
    );
    const persistor = (persistStore(store));
    // sagaMiddleware.run(rootSaga)
    return { persistor, store };
}
// persistStore(store);
export default configureStore;
