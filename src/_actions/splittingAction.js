import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";
import makeToast from '../utils/toaster';

const URI = 'http://localhost:5000/api'


// Get current Splitting
export const getCurrentSplitting = id => async dispatch => {

    try {
        const res = await axios.get(`${URI}/qty/splitting/${id}`);
        dispatch({
            type: types.GET_SPLITTING,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get Splittings with price
export const getSplittings = () => async dispatch => {
    try {
        const res = await axios.get(`${URI}/map/splitting`);
        dispatch({
            type: types.GET_SPLITTINGS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { status: err.response }
        });
    }
};



//Get Daily overall total with date & manufacturer wise Splitting 

export const getDailyTotal = (mfcId, month, year) => async dispatch => {

    try {
        const res = await axios.get(`${URI}/map/splitting/manufacturer/date/${mfcId}?month=${month}&year=${year}`);
        dispatch({
            type: types.GET_DAILY_TOTAL_SPLITTINGS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { status: err.response }
        });
    }
};




//Get Monthly overall total with date & manufacturer wise Splitting 

export const getMonthlyTotal = (mfcId, month, year) => async dispatch => {
    try {
        const res = await axios.get(`${URI}/map/splitting/manufacturer/monthly/${mfcId}?month=${month}&year=${year}`);
        dispatch({
            type: types.GET_MONTHLY_TOTAL_SPLITTINGS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { status: err.response }
        });
    }
};


// //Get Mapped Splittings with Based on Manufacturer 
// export const getMfcSplittings = (mfcId) => async dispatch => {
//     try {
//         const res = await axios.get(`${URI}/map/splitting/manufacturer/${mfcId}`);
//         dispatch({
//             type: types.GET_MAP_MFC_SPLITTINGS,
//             payload: res.data.data
//         });
//         console.log(res.data.data)
//     } catch (err) {
//         dispatch({
//             type: types.SPLITTING_ERROR,
//             payload: { status: err.response }
//         });
//     }
// };






//Get Qtys Splittings with Based on Manufacturer 
export const getMfcQtySplittings = (mfcId) => async dispatch => {
    try {
        const res = await axios.get(`${URI}/qty/splitting/manufacturer/${mfcId}`);
        dispatch({
            type: types.GET_MFC_QTY_SPLITTINGS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { status: err.response }
        });
    }
};

//Get Splittings only Quantity 
export const getSplittingsQty = () => async dispatch => {
    try {
        const res = await axios.get(`${URI}/qty/splitting`);
        dispatch({
            type: types.GET_SPLITTINGS_QTY,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { status: err.response }
        });
    }
};

// Add Splitting
export const addSplitting = (formData, processId, history) => async dispatch => {
    try {
        const res = await axios.post(`${URI}/qty/splitting/${processId}`, formData);
        dispatch({
            type: types.ADD_SPLITTING,
            payload: res.data
        });

        makeToast("success", "Added Succesfully")

        history.push(`/Splitting/${processId}`);

    } catch (err) {
        const errors = err.response.data;

        if (errors) {
            makeToast("error", "Something Went Wrong")
        }

        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Edit Splitting
export const editSplitting = (formData, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.patch(`${URI}/qty/splitting/${id}`, formData, config);

        dispatch({
            type: types.GET_SPLITTING,
            payload: res.data
        });

        makeToast("success", "Edited Succesfully")


        history.push(`/Splitting/${id}`);
    } catch (err) {
        const errors = err.response.data;

        if (errors) {
            makeToast("error", "Something Went Wrong")

        }

        dispatch({
            type: types.SPLITTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Delete Splitting
export const deleteSplitting = (id) => async dispatch => {

    if (
        window.confirm(
            "Are You Sure to Delete?"
        )
    ) {
        try {
            await axios.delete(`${URI}/qty/splitting/${id}`);
            dispatch({
                type: types.DELETE_SPLITTING,
                payload: id
            });
            makeToast("info", "Deleted Succesfully")
            window.location.reload()

        } catch (err) {
            dispatch({
                type: types.SPLITTING_ERROR
            });
        }
    }
};

//Set Current Splitting
export const setCurrentSplitting = (id) => async dispatch => {


    dispatch({
        type: types.SET_CURRENT_SPLITTING,
        payload: id
    });
};

