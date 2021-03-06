import axios from "axios";
import makeToast from '../utils/toaster';

import setAuthToken from "../utils/setAuthToken";
import {
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    CLEAR_USER,
    GET_USERS,
    EMAIL_SENT
} from "./types";

//Load User
export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("http://localhost:5000/api/user/me");
        //console.log(res.data.data)
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

//Get all User
export const getAllUsers = () => async dispatch => {
    try {
        const res = await axios.get("http://localhost:5000/api/user");
        console.log(res.data);
        dispatch({
            type: GET_USERS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.STUDENT_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};


// Register User
// export const register = ({
//     name,
//     email,
//     phone,
//     ima,
//     city,
//     currentaddress,
//     permaddress, degreetype,
//     degree,
//     branch,
//     passoutyear,
//     college,
//     password,
//     passwordConfirm,
//     IndustryType,
//     userType,
//     location,
// }) => async dispatch => {
//     const config = {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     const body = JSON.stringify({
//         name,
//         email,
//         phone,
//         ima,
//         currentaddress,
//         permaddress, degreetype,
//         degree,
//         branch,
//         passoutyear,
//         city,
//         college,
//         password,
//         passwordConfirm,
//         IndustryType,
//         userType,
//         location,
//     });

//     try {
//         const res = await axios.post("http://localhost:5000/api/user/signup", body, config);

//         dispatch({
//             type: REGISTER_SUCCESS,
//             payload: res.data
//         });

//         dispatch(loadUser());
//     } catch (err) {
//         const errors = err.response.data.errors;

//         if (errors) {
//             errors.forEach(error => dispatch(makeToast(error.msg, "danger")));
//         }

//         dispatch({
//             type: REGISTER_FAIL
//         });
//     }
// };

// const config = {
//     headers: {
//         "Content-Type": "application/multipart-form"
//     }
// };

// Register User
export const register = formData => async dispatch => {

    try {
        const res = await axios.post("http://localhost:5000/api/user/signup", formData);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        makeToast("success", "User Created")
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.error;
        console.log(errors);

        if (errors.code === 11000) {
            dispatch(makeToast("User already exists!", "danger"));
        }

        if (err.response.status === 400) {
            dispatch(makeToast(`${err.response.data.msg}`, "danger"));
        }
        else if (err.response.status === 500) {
            dispatch(makeToast(`File Too Large or Invalid File Type`, "danger"));
        }
        // if (err) {
        //     err.forEach(error => dispatch(makeToast(error.msg, "danger")));
        // }

        dispatch({
            type: REGISTER_FAIL,
            payload: { msg: errors, status: err.response.status }
        });
    }
};

// Login User
export const login = (email, password) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("http://localhost:5000/api/user/login", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
        makeToast("success", "Logged In Succesfully")
        window.location.reload();

    } catch (err) {

        if (err) {
            makeToast("error", "Invalid Credential or Something Went Wrong")

        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Update me
export const updateMe = (photoData, history) => async dispatch => {
    try {
        const res = await axios.patch("http://localhost:5000/api/user/updateMe", photoData);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        dispatch(makeToast("Profile Updated!", "success"));
        dispatch(loadUser());

        history.push("/admin/your_profile");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(makeToast(error.msg, "danger")));
        }

        if (err.response.status === 400) {
            dispatch(makeToast(`${err.response.data.msg}`, "danger"));
        }
        else if (err.response.status === 500) {
            dispatch(makeToast(`File Too Large or Invalid File Type`, "danger"));
        }

        dispatch({
            type: AUTH_ERROR
        });
    }
};


// Update My Password
export const updateMyPassword = (formData, history) => async dispatch => {
    try {
        const res = await axios.patch("http://localhost:5000/api/user/updateMyPassword", formData);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(makeToast("Password Updated!", "success"));
    } catch (err) {
        const errors = err.response.data;
        if (errors) {
            dispatch(makeToast(errors.message, "danger"));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};


// Update My Password
export const forgetPassword = (email, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post("http://localhost:5000/api/user/forgotPassword", body, config);

        dispatch({
            type: EMAIL_SENT,
            payload: res.data
        });
        dispatch(makeToast("Password reset link sent to your email", "success"));
        history.push('/resetPassword')
    } catch (err) {
        const errors = err.response.data;
        if (errors) {
            dispatch(makeToast(errors.message, "danger"));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Update My Password
export const resetPassword = (password, passwordConfirm, token, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ password, passwordConfirm });

    try {
        const res = await axios.patch(`http://localhost:5000/api/user/resetPassword/${token}`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(makeToast('Password Reset Seccessfully', "success"));

        dispatch(loadUser());
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data;
        if (errors) {
            dispatch(makeToast(errors.message, "danger"));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};


//Logout / Clear Profile
export const logout = () => dispatch => {

    try {
        dispatch({ type: LOGOUT });
        dispatch({ type: CLEAR_USER });
        window.location.reload()
        // history ("/");
    } catch (err) {
        console.log(err);

    }

};
