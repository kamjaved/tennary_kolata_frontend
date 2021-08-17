import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

const URI = 'http://localhost:5000/api'

// Get current Manufacturer
export const getCurrentManufacturer = id => async dispatch => {
    try {
        const res = await axios.get(`/api/user/manufacturer/${id}`);

        dispatch({
            type: types.GET_MANUFACTURER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.MANUFACTURER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get all Manufacturers
export const getManufacturers = () => async dispatch => {
    try {
        const res = await axios.get(`${URI}/manufacturer`);
        dispatch({
            type: types.GET_MANUFACTURERS,
            payload: res.data.data
        });
        console.log(res.data.data)
    } catch (err) {
        dispatch({
            type: types.MANUFACTURER_ERROR,
            payload: { status: err.response }
        });
    }
};

// Add Manufacturer
export const addManufacturer = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/user/manufacturer", formData);
        dispatch({
            type: types.ADD_MANUFACTURER,
            payload: res.data
        });

        dispatch(setAlert("Manufacturer Added", "success"));

        history.push("/manufacturer");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.MANUFACTURER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Edit Manufacturer
export const editManufacturer = (formData, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.patch(`/api/user/manufacturer/${id}`, formData, config);

        dispatch({
            type: types.GET_MANUFACTURER,
            payload: res.data
        });

        dispatch(setAlert("Manufacturer Updated", "success"));

        history.push("/manufacturer");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.MANUFACTURER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete Manufacturer
export const deleteManufacturer = id => async dispatch => {
    if (
        window.confirm(
            "To enable the user back call OWM Support Center. Confirm Disable?"
        )
    ) {
        try {
            await axios.patch(`/api/user/manufacturer/${id}`);
            dispatch({
                type: types.DELETE_MANUFACTURER,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: types.MANUFACTURER_ERROR
            });
        }
    }
};

//Set Current Manufacturer
export const setCurrentManufacturer = manufacturer => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_MANUFACTURER,
        payload: manufacturer
    });
};

// Clear Manufacturer
export const clearManufacturer = () => async dispatch => {
    dispatch({ type: types.CLEAR_MANUFACTURER });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
