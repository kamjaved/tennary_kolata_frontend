/* eslint-disable import/no-anonymous-default-export */
import * as types from "../_actions/types";

const initialState = {
    allProcess: null,
    allProcesses: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_ALL_PROCESS:
            return {
                ...state,
                allProcess: payload,
                loading: false
            };
        case types.GET_ALL_PROCESSES:
            return {
                ...state,
                allProcesses: payload,
                loading: false
            };
        case types.ADD_ALL_PROCESS:
            return {
                ...state,
                allProcess: payload,
                loading: false
            };
        case types.SET_CURRENT_ALL_PROCESS:
            return {
                ...state,
                allProcess: action.payload
            };


        case types.CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case types.DELETE_ALL_PROCESS:
            return {
                ...state,
                allProcesses: state.allProcesses.filter(allProcess => allProcess._id !== action.payload),
                loading: false
            };

        case types.ALL_PROCESS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
