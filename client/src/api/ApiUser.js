// https://tools.ietf.org/html/rfc6749#section-4.4
import axios from "axios";
import cookies from "react-cookies";
import {
    setAppState, requestUserInfo, receiveUserInfo, clearUserInfo, stopFetchingUserInfo
} from "actions/actions";
import { camelToSnake } from "utils/ChangeCase";

import {
    URL, SIGNUP, LOGIN, LOGOUT, PROFILE, VERIFY_EMAIL, USERS, FORGOT_PASSWORD, RESET_PASSWORD, SET_NEW_PASSWORD, REQUEST_EMAIL_VERIFY, REQUEST_PHONE_VERIFY, UPDATE_PROFILE
} from "config/Api";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const clientId = { app: "abU74l88jMkioI4C3AmtDm6wYqlltlMgCDPNugHp", facebook: "Edq2kN3s2nJlnk3OX9NlVi3MgZx0KOcPSpdKsug1" };

Date.prototype.addHours = h => {
    this.setHours(this.getHours() + h);
    return this;
};

export function errorHandler(error) {
    if (process.env.NODE_ENV === "development") {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
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

export const ApiUser = {
    // getUserProfile: (loginMethod, id, dispatch) => {
    //     // const loginMethod = token.login_method;
    //     // const appToken = token.access_token;

    //     const config = {
    //         headers: {
    //             // 'Access-Control-Allow-Headers': '*',
    //             // 'Access-Control-Allow-Origin': '*',
    //             "X-CSRFToken": cookies.load("csrftoken")
    //             // Authorization: `Bearer ${appToken}`
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         params: {
    //             f: id === 0 ? "a" : "s"
    //         },
    //         withCredentials: true
    //     };
    //     // dispatch(requestUserInfo());
    //     // dispatch(requestProfileInfo());
    //     return axios
    //         .get(`${URL + USERS + id}/`, config)// login to website with user social id
    //         .then(response => {
    //             // const user_id = response.data.id

    //             dispatch(receiveUserInfo(response.data));
    //             // dispatch(receiveProfileInfo(response.data));
    //             if (loginMethod !== "app" && id !== 0) {
    //                 window.close();
    //             }
    //         })
    //         .catch(error => { // URL + USERS + social_id
    //             // dispatch(stopFetchingUserInfo());
    //             errorHandler(error);
    //         });
    // },
    // convertToken: (loginMethod, socialId, socialToken, dispatch) => {
    //     const config = {
    //         headers: {
    //             "X-CSRFToken": cookies.load("csrftoken"),
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         withCredentials: true
    //     };

    //     const body = new URLSearchParams();
    //     body.append("grant_type", "convert_token");
    //     body.append("client_id", clientId[loginMethod]);
    //     body.append("backend", loginMethod);
    //     body.append("token", socialToken);

    //     return axios
    //         .post(URL + CONVERT_TOKEN, body, config)// convert fb token to app token
    //         .then(response => {
    //             // dispatch(setToken(response.data));
    //             // const token = response.data;
    //             // token.login_method = loginMethod;
    //             // token.expires_at = Date.now() + 36000 * 1000;
    //             ApiUser.getUserProfile(loginMethod, socialId, dispatch);
    //         })
    //         .catch(error => { // URL + CONVERT_TOKEN,
    //             errorHandler(error);
    //         });
    // },
    // refreshToken: (token, dispatch, callback, args) => {
    //     const config = {
    //         headers: {
    //             "X-CSRFToken": cookies.load("csrftoken"),
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         withCredentials: true
    //     };
    //     const refreshToken = token.refresh_token;
    //     const loginMethod = token.login_method;

    //     const body = new URLSearchParams();
    //     body.append("grant_type", "refresh_token");
    //     body.append("client_id", clientId[loginMethod]);
    //     body.append("refresh_token", refreshToken);

    //     return axios
    //         .post(URL + TOKEN, body, config)
    //         .then(response => {
    //             const newToken = response.data;
    //             newToken.login_method = loginMethod;
    //             newToken.expires_at = Date.now() + 36000 * 1000;
    //             dispatch(setToken(newToken));
    //             if (callback) {
    //                 callback(newToken, ...args, dispatch);
    //             }
    //         })
    //         .catch(error => {
    //             dispatch(clearUserInfo());
    //             errorHandler(error);
    //         });
    // },

    getUser: (id, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true
        };

        dispatch(requestUserInfo());

        return axios
            .get(`${URL}${USERS}${id}/`, config)
            .then(response => {
                dispatch(receiveUserInfo(response.data));
            })
            .catch(error => {
                dispatch(stopFetchingUserInfo());
                // dispatch(clearUserInfo());
                errorHandler(error);
            });
    },
    authenticate: (loginMethod, email, password, dispatch) => {
        const config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                // 'X-Forwarded-Host': 'saeedezzati.com:8000',
                // Connection: "keep-alive",
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true
        };

        const data = {
            [camelToSnake("grant_type")]: "password",
            [camelToSnake("client_id")]: clientId[loginMethod],
            username: email,
            password
        };

        dispatch(requestUserInfo());

        if (loginMethod === "app") {
            return axios
                .post(URL + LOGIN, data, config)
                .then(response => {
                    // dispatch(setToken(response.data));
                    // dispatch(setAppState({loginMessage: {type:'success', message:{'login':['Thanks for logging in.']}}}));

                    // const token = response.data;
                    // token.login_method = loginMethod;
                    // token.expires_at = Date.now() + 36000 * 1000;// expires after 10 hours
                    dispatch(receiveUserInfo(response.data));

                    // ApiUser.getUserProfile(loginMethod, 0, dispatch);// send request with socialId=0 means user is trying to login with user/pass which means he doesn't know his user-id yet. So on the backend when we see id=0, we return the user profile of the self.request.user. Another way to do this is by sending user email to this api and return based on that. The amount of code might be more, but it'll be less complicated.
                })
                .catch(error => {
                    dispatch(setAppState({ loginMessage: { type: "error", message: { login: ["Something went wrong!"] } } }));
                    dispatch(stopFetchingUserInfo());
                    dispatch(clearUserInfo());
                    errorHandler(error);
                });
        } else if (loginMethod === "facebook") {
            return axios
                .get(URL + PROFILE, config)
                .then(response => {
                    // const response = { 'data': { "auth_time": 1514407100, "id": "1799534280061052", "expires": 5136753, "granted_scopes": ["email", "public_profile"], "denied_scopes": null, "access_token": "EAAD08rQQTskBANAh1w95tMI41b6sjl2TeqN4FD7sgbNmcN91ZBBum22Wj2VxSvf8OXI02dCAImuB274YYtlUBd299fP8rGPpdDRpBgopd8GBLmPeZCQjKW0Wb02k2PuH8cXBWgX8gIHi7XURP6cuhfu8YqIefzIKz9EfmAWQZDZD", "token_type": null } }
                    // const extraData = (response.data[loginMethod].extra_data).slice(0);
                    dispatch(receiveUserInfo(response.data));
                    window.close();

                    // const socialId = response.data[loginMethod].uid;
                    // const socialToken = JSON.parse(extraData).access_token;
                    // ApiUser.getUserProfile(loginMethod, socialId, dispatch);
                    // ApiUser.convertToken(loginMethod, socialId, socialToken, dispatch); // convert fb token to app token
                })
                .catch(error => { // URL + SID,
                    dispatch(stopFetchingUserInfo());
                    dispatch(clearUserInfo());
                    errorHandler(error);
                });
        }
    },

    signUp: (email, password, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true
        };

        const data = {
            // username: email,
            email,
            password
        };
        dispatch(requestUserInfo());

        return axios
            .post(URL + SIGNUP, data, config)
            .then(response => {
                dispatch(setAppState({ loginMessage: { type: "success", message: { login: ["Please check your email to verify your account"] } } }));
                dispatch(receiveUserInfo(response.data));
                // ApiUser.authenticate("app", email, password, dispatch);// do this to also get a user token/sessionid
            })
            .catch(error => {
                // return different messages based on error code
                if (error.response.data.email === "user with this email already exists.") {
                    dispatch(setAppState({ createAccount: false, password: "", loginMessage: { type: "error", message: { email: ["Email already in use. Try loging in here."] } } }));
                } else {
                    dispatch(setAppState({ loginMessage: { type: "error", message: error.response.data } }));
                }
                dispatch(stopFetchingUserInfo());
                dispatch(clearUserInfo());
                errorHandler(error);
            });
    },

    requestEmailVerify: (id, email, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
                // Authorization: `Bearer ${token.access_token}`
            },
            withCredentials: true

        };


        const data = { email };
        return axios
            .post(URL + USERS + id + REQUEST_EMAIL_VERIFY, data, config)
            .then(() => {
                dispatch(setAppState({ emailVerificationCodeSent: true }));
            })
            .catch(error => {
                // return different messages based on error code
                errorHandler(error);
            });
    },
    requestPhoneVerify: (id, phoneNumber, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
                // Authorization: `Bearer ${token.access_token}`
            },
            withCredentials: true

        };

        const data = {
            [camelToSnake("phone_number")]: phoneNumber
        };

        return axios
            .post(URL + USERS + id + REQUEST_PHONE_VERIFY, data, config)
            .then(() => {
                dispatch(setAppState({ phonenumberVerificationCodeSent: true }));
            })
            .catch(error => {
                // return different messages based on error code
                errorHandler(error);
            });
    },
    verifyEmail: (email, emailVerificationCode, history, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true

        };

        const data = {
            email,
            [camelToSnake("email_verification_code")]: emailVerificationCode
        };
        dispatch(requestUserInfo());

        return axios
            .post(URL + VERIFY_EMAIL, data, config)
            .then(response => {
                dispatch(receiveUserInfo(response.data));
                history.push("/profile/edit");
            })
            .catch(error => {
                // return different messages based on error code
                dispatch(stopFetchingUserInfo());
                dispatch(setAppState({ loginMessage: { type: "error", message: error.response.data } }));
                errorHandler(error);
            });
    },
    forgotPassword: (email, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true
        };
        const data = { email };

        return axios
            .post(URL + FORGOT_PASSWORD, data, config)
            .then(response => {
                dispatch(setAppState({ loginMessage: { type: "success", message: response.data } }));
            })
            .catch(error => {
                dispatch(setAppState({ loginMessage: { type: "error", message: error.response.data } }));
                errorHandler(error);
            });
    },
    resetPassword: (email, emailVerificationCode, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true
        };

        const data = {
            email,
            [camelToSnake("email_verification_code")]: emailVerificationCode
        };
        dispatch(requestUserInfo());

        return axios
            .post(URL + RESET_PASSWORD, data, config)
            .then(response => {
                dispatch(receiveUserInfo(response.data));
            })
            .catch(error => {
                // return different messages based on error code
                // dispatch(setAppState({loginMessage: {type:'error', message: error.response.data }}));
                dispatch(stopFetchingUserInfo());
                errorHandler(error);
            });
    },
    setNewPassword: (email, password, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true

        };

        const data = {
            email,
            password
        };
        dispatch(requestUserInfo());

        return axios
            .post(URL + SET_NEW_PASSWORD, data, config)
            .then(response => {
                dispatch(receiveUserInfo(response.data));
                // ApiUser.authenticate("app", email, password, dispatch);// do this to also get a user token
            })
            .catch(error => {
                // return different messages based on error code
                // dispatch(setAppState({loginMessage: {type:'error', message: error.response.data }}));
                dispatch(stopFetchingUserInfo());
                errorHandler(error);
            });
    },

    updateProfile: (id, newData, dispatch) => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "multipart/form-data"
                // Authorization: `Bearer ${token.access_token}`
            },
            withCredentials: true
        };

        const data = new FormData();
        data.append("id", id);
        Object.keys(newData).forEach(key => {
            if (key === "avatar" || key === "idPicture" || key === "nonProfitProof") {
                if (newData[key] instanceof File) {
                    return data.append(camelToSnake(key), newData[key]);
                }
            } else {
                return data.append(camelToSnake(key), newData[key]);
            }
        });

        dispatch(requestUserInfo());

        return axios
            .post(URL + USERS + id + UPDATE_PROFILE, data, config)
            .then(response => {
                dispatch(receiveUserInfo(response.data));
            })
            .catch(error => {
                // return different messages based on error code
                // dispatch(stopFetchingUserInfo());
                errorHandler(error);
            });
    },
    isLoggedIn: userId => {
        const accountId = cookies.load("rp_act");
        if (accountId && accountId == userId) {
            return true;
        }
        // cookies.remove("rp_act", { path: "/", domain: ".saeedezzati.com" });
        // dispatch(clearUserInfo());
        return false;
    },
    deauthenticate: dispatch => {
        const config = {
            headers: {
                "X-CSRFToken": cookies.load("csrftoken"),
                "Content-Type": "application/json"
            },
            withCredentials: true

        };

        cookies.remove("rp_act", { path: "/", domain: ".saeedezzati.com" });
        dispatch(clearUserInfo());

        return axios
            .get(URL + LOGOUT, config)
            .then(() => {
                // console.log(response);
                // clear other reducers too in case there are admin level information in the store
            })
            .catch(error => {
                errorHandler(error);
            });

    }
};


// export function isLoggedIn() {
//   // Also check if the token is valid. If not use refresh-token to get a new one.
//   return store.getState().token[store.getState().token.length-1] !== null;
// }
