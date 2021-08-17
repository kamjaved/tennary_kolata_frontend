/* eslint-disable import/no-anonymous-default-export */
import * as types from "../_actions/types";

const initialState = {
    manufacturer: null,
    manufacturers: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_MANUFACTURER:
            return {
                ...state,
                manufacturer: payload,
                loading: false
            };
        case types.GET_MANUFACTURERS:
            return {
                ...state,
                manufacturers: payload,
                loading: false
            };
        case types.ADD_MANUFACTURER:
            return {
                ...state,
                manufacturer: payload,
                loading: false
            };
        case types.SET_CURRENT_MANUFACTURER:
            return {
                ...state,
                manufacturer: action.payload
            };
        case types.CLEAR_MANUFACTURER:
            return {
                ...state,
                manufacturer: null,
                manufacturers: [],
                loading: false
            };


        case types.CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case types.DELETE_MANUFACTURER:
            return {
                ...state,
                manufacturers: state.manufacturers.filter(manufacturer => manufacturer._id !== action.payload),
                loading: false
            };
        case types.MANUFACTURER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
