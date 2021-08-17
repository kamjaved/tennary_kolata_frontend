import axios from "axios";
import * as types from "./types";
import makeToast from '../utils/toaster';

const URI = 'http://localhost:5000/api'


// Get current DryDrum
export const getCurrentDryDrum = id => async dispatch => {

    try {
        const res = await axios.get(`${URI}/qty/drydrum/${id}`);
        dispatch({
            type: types.GET_DRYDRUM,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: types.DRYDRUM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get DryDrums with price
export const getDryDrums = () => async dispatch => {
    try {
        const res = await axios.get(`${URI}/map/drydrum`);
        dispatch({
            type: types.GET_DRYDRUMS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.DRYDRUM_ERROR,
            payload: { status: err.response }
        });
    }
};



//Get Mapped DryDrums with Based on Manufacturer 
export const getMfcDryDrums = (mfcId) => async dispatch => {
    try {
        const res = await axios.get(`${URI}/map/drydrum/manufacturer/${mfcId}`);
        dispatch({
            type: types.GET_MAP_MFC_DRYDRUMS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.DRYDRUM_ERROR,
            payload: { status: err.response }
        });
    }
};

//Get Qtys DryDrums with Based on Manufacturer 
export const getMfcQtyDryDrums = (mfcId) => async dispatch => {
    try {
        const res = await axios.get(`${URI}/qty/drydrum/manufacturer/${mfcId}`);
        dispatch({
            type: types.GET_MFC_QTY_DRYDRUMS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.DRYDRUM_ERROR,
            payload: { status: err.response }
        });
    }
};

//Get DryDrums only Quantity 
export const getDryDrumsQty = () => async dispatch => {
    try {
        const res = await axios.get(`${URI}/qty/drydrum`);
        dispatch({
            type: types.GET_DRYDRUMS_QTY,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.DRYDRUM_ERROR,
            payload: { status: err.response }
        });
    }
};

// Add DryDrum
export const addDryDrum = (formData, processId, history) => async dispatch => {
    try {
        const res = await axios.post(`${URI}/qty/drydrum/${processId}`, formData);
        dispatch({
            type: types.ADD_DRYDRUM,
            payload: res.data
        });

        makeToast("success", "Added Succesfully")

        history.push(`/Dry-Drum/${processId}`);

    } catch (err) {
        const errors = err.response.data;

        if (errors) {
            makeToast("error", "Something Went Wrong")
        }

        dispatch({
            type: types.DRYDRUM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Edit DryDrum
export const editDryDrum = (formData, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.patch(`${URI}/qty/drydrum/${id}`, formData, config);

        dispatch({
            type: types.GET_DRYDRUM,
            payload: res.data
        });

        makeToast("success", "Edited Succesfully")


        history.push(`/Dry-Drum/${id}`);
    } catch (err) {
        const errors = err.response.data;

        if (errors) {
            makeToast("error", "Something Went Wrong")

        }

        dispatch({
            type: types.DRYDRUM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Delete DryDrum
export const deleteDryDrum = (id) => async dispatch => {

    if (
        window.confirm(
            "Are You Sure to Delete?"
        )
    ) {
        try {
            await axios.delete(`${URI}/qty/drydrum/${id}`);
            dispatch({
                type: types.DELETE_DRYDRUM,
                payload: id
            });

            makeToast("info", "Deleted Succesfully")
            window.location.reload()
        } catch (err) {
            dispatch({
                type: types.DRYDRUM_ERROR
            });
        }
    }
};

//Set Current DryDrum
export const setCurrentDryDrum = (id) => async dispatch => {


    dispatch({
        type: types.SET_CURRENT_DRYDRUM,
        payload: id
    });
};

