import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

const URI = 'http://localhost:5000/api'

// Get current AllProcess
export const getCurrentAllProcess = id => async dispatch => {
    try {
        const res = await axios.get(`/api/user/allProcess/${id}`);

        dispatch({
            type: types.GET_ALL_PROCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.ALL_PROCESS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get all AllProcesses
export const getAllProcesses = () => async dispatch => {
    try {
        const res = await axios.get(`${URI}/allprocess`);
        dispatch({
            type: types.GET_ALL_PROCESSES,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.ALL_PROCESS_ERROR,
            payload: { status: err.response }
        });
    }
};

// Add AllProcess
export const addAllProcess = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/user/allProcess", formData);
        dispatch({
            type: types.ADD_ALL_PROCESS,
            payload: res.data
        });

        dispatch(setAlert("AllProcess Added", "success"));

        history.push("/allProcess");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.ALL_PROCESS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Edit AllProcess
export const editAllProcess = (formData, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.patch(`/api/user/allProcess/${id}`, formData, config);

        dispatch({
            type: types.GET_ALL_PROCESS,
            payload: res.data
        });

        dispatch(setAlert("AllProcess Updated", "success"));

        history.push("/allProcess");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.ALL_PROCESS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete AllProcess
export const deleteAllProcess = id => async dispatch => {
    if (
        window.confirm(
            "To enable the user back call OWM Support Center. Confirm Disable?"
        )
    ) {
        try {
            await axios.patch(`/api/user/allProcess/${id}`);
            dispatch({
                type: types.DELETE_ALL_PROCESS,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: types.ALL_PROCESS_ERROR
            });
        }
    }
};

//Set Current AllProcess
export const setCurrentAllProcess = allProcess => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_ALL_PROCESS,
        payload: allProcess
    });
};



// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
