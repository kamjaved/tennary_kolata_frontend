import axios from "axios";
import * as types from "./rateTypes";
import makeToast from '../../utils/toaster';
const URI = 'http://localhost:5000/api'


// Get current RateDryDrum
export const getAllGlobalPrice = id => async dispatch => {

    try {
        const res = await axios.get(`${URI}/price/global`);
        dispatch({
            type: types.GET_ALL_GLOBAL_PRICES,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: types.GLOBAL_PRICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// Add RateDryDrum
export const addGlobalPrice = (formData, history) => async dispatch => {
    try {
        const res = await axios.post(`${URI}/price/global`, formData);
        dispatch({
            type: types.ADD_GLOBAL_PRICE,
            payload: res.data
        });

        makeToast("success", "Price Added Succesfully")

        history.push(`/global-price`);

    } catch (err) {
        const errors = err.response.data.error;

        console.log(errors)
        if (errors.name === "ValidationError") {
            makeToast("error", "Please Select Process !")
        }
        else if (errors.code === 11000) {
            makeToast("error", "This Process is Already Exist!")

        } else {
            makeToast("error", "Something Went Wrong!")
        }
        dispatch({
            type: types.GLOBAL_PRICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};




//Delete RateDryDrum
export const deleteGlobalPrice = (id) => async dispatch => {

    if (
        window.confirm(
            "Are You Sure to Delete?"
        )
    ) {
        try {
            await axios.delete(`${URI}/price/global/${id}`);
            dispatch({
                type: types.DELETE_GLOBAL_PRICE,
                payload: id
            });

            makeToast("info", "Deleted Succesfully")

            window.location.reload()
        } catch (err) {
            dispatch({
                type: types.GLOBAL_PRICE_ERROR
            });
        }
    }
};


// Get current RateDryDrum
export const getCurrentGlobalPrice = id => async dispatch => {

    try {
        const res = await axios.get(`${URI}/price/global/${id}`);
        dispatch({
            type: types.GET_CURRENT_GLOBAL_PRICE,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: types.GLOBAL_PRICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Edit RateDryDrum
export const editGlobalPrice = (formData, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.patch(`${URI}/price/global/${id}`, formData, config);

        dispatch({
            type: types.GET_CURRENT_GLOBAL_PRICE,
            payload: res.data
        });

        makeToast("success", "Edited Succesfully")


        history.push(`/global-price`);
    } catch (err) {
        const errors = err.response.data;

        if (errors) {
            makeToast("error", "Something Went Wrong")

        }

        dispatch({
            type: types.GLOBAL_PRICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



//Set Current RateDryDrum
export const setCurrentGlobalPrice = (id) => async dispatch => {


    dispatch({
        type: types.SET_CURRENT_GLOBAL_PRICE,
        payload: id
    });
};