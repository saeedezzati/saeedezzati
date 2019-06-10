// Entry Point
import React from "react";
import { Provider } from "react-redux";
// import { persistStore } from 'redux-persist';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/es/integration/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import App from "./App";
import ReactDOM from "react-dom";
import { createOnStorage } from "./middleware";
import configureStore from "./store";

const { persistor, store } = configureStore();

// let persistor = persistStore(store)
// const container = typeof document === 'undefined' ? null : document.querySelector('.container');
// persistStore(store, {}, () => {


if (typeof window !== "undefined") {
    const onStorage = createOnStorage(store);
    // listen to local storage events for new actions
    window.addEventListener("storage", onStorage);
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
                loading={(
                    <div style={{
                        height: "100%", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                    >
                        <CircularProgress
                            size={150}
                            style={{
                                filter: "drop-shadow(0 0 5px #FA1C16) drop-shadow(0 0 10px #FA1C16) drop-shadow(0 0 200px #FED128) drop-shadow(0 0 0px #806914)",
                                color: "#FED128"
                            }}
                            thickness={4}
                        />
                    </div>
                )}
            >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
        ,
        document.querySelector(".container"),
    );
}
// })
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

// Direction: Changes Main
// Justify: Main
// Align: Cross
