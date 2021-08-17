/* eslint-disable import/no-anonymous-default-export */
import * as types from "../_actions/types";


const initialState = {
    filteredDate: [],
    loading: true

};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_DATE:
            return {
                ...state,
                filteredDate: payload,
                loading: false
            };

        default:
            return state;
    }
}