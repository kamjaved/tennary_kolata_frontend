/* eslint-disable import/no-anonymous-default-export */
import * as types from "../_actions/types";

const initialState = {
    splitting: null,
    // splittingID: '',
    splittings: [],
    dailyTotalSplitting: [],
    monthlyTotalSplitting: [],
    splittingsMfcQty: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_SPLITTING:
            return {
                ...state,
                splitting: payload,
                loading: false
            };
        case types.GET_DAILY_TOTAL_SPLITTINGS:
            return {
                ...state,
                dailyTotalSplitting: payload,
                loading: false
            };

        case types.GET_MONTHLY_TOTAL_SPLITTINGS:
            return {
                ...state,
                monthlyTotalSplitting: payload,
                loading: false
            };

        case types.GET_MFC_QTY_SPLITTINGS:
            return {
                ...state,
                splittingsMfcQty: payload,
                loading: false
            };
        case types.GET_SPLITTINGS_QTY:
            return {
                ...state,
                splittingsQty: payload,
                loading: false
            };
        case types.ADD_SPLITTING:
            return {
                ...state,
                splitting: payload,
                loading: false
            };
        case types.SET_CURRENT_SPLITTING:
            return {
                ...state,
                splitting: action.payload
            };

        case types.DELETE_SPLITTING:
            return {
                ...state,
                splittings: state.splittings.filter(splitting => splitting._id !== action.payload),
                loading: false
            };
        case types.SPLITTING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
