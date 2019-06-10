// https://tools.ietf.org/html/rfc6749#section-4.4
import axios from "axios";
import cookies from "react-cookies";
import { setAppState } from "actions/actions";

import { URL, GETNOTIFIED } from "config/Api";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


export function errorHandler(error) {
    if (process.env.NODE_ENV === "development") {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    }
}
export const ApiGetNotified = {
    submitEmail: (getNotifiedEmail, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"

            },
            withCredentials: true
        };

        const data = {
            email: getNotifiedEmail,
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            language: navigator.language,
            platform: navigator.platform,
            vendor: navigator.vendor,
            width: screen.width,
            height: screen.height
        };

        return axios
            .post(URL + GETNOTIFIED, data, config)
            .then(() => {
                dispatch(setAppState({ getNotifiedRequested: true }));
            })
            .catch(error => {
                errorHandler(error);
            });
    }

};
