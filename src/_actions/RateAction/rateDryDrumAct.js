import axios from "axios";
import * as types from "./rateTypes";
import makeToast from '../../utils/toaster';
const URI = 'http://localhost:5000/api'


// Get current RateDryDrum
export const getCurrentRateDryDrum = id => async dispatch => {

    try {
        const res = await axios.get(`${URI}/price/global/${id}`);
        dispatch({
            type: types.GET_CURRENT_DRYDRUM,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: types.RATE_DRYDRUM_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Filter DryDrum Item  from GlobalRate Collection with price
export const filterDryDrum = (id) => async dispatch => {
    try {
        const res = await axios.get(`${URI}/price/global/process/${id}`);
        dispatch({
            type: types.FILTER_DRYDRUM_RATE,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.,
            payload: { status: err.response }
        });
    }
};



// Add RateDryDrum
export const addRateDryDrum = (formData, processId, history) => async dispatch => {
    try {
        const res = await axios.post(`${URI}/price/global/${processId}`, formData);
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


// Edit RateDryDrum
export const editRateDryDrum = (formData, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.patch(`${URI}/price/global/${id}`, formData, config);

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


//Delete RateDryDrum
export const deleteRateDryDrum = (id) => async dispatch => {

    if (
        window.confirm(
            "Are You Sure to Delete?"
        )
    ) {
        try {
            await axios.delete(`${URI}/price/global/${id}`);
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

//Set Current RateDryDrum
export const setCurrentRateDryDrum = (id) => async dispatch => {


    dispatch({
        type: types.SET_CURRENT_DRYDRUM,
        payload: id
    });
};

