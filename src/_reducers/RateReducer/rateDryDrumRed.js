/* eslint-disable import/no-anonymous-default-export */
import * as types from "../../_actions/RateAction/rateTypes";


const initialState = {
    drydrumRate: null,
    // drydrumID: '',
    filterDryDrumRate: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_CURRENT_DRYDRUM:
            return {
                ...state,
                drydrumRate: payload,
                loading: false
            };
        case types.FILTER_DRYDRUM_RATE:
            return {
                ...state,
                filterDryDrumRate: payload,
                loading: false
            };

        case types.GET_MFC_QTY_DRYDRUMS:
            return {
                ...state,
                drydrumsMfcQty: payload,
                loading: false
            };
        case types.GET_DRYDRUMS_QTY:
            return {
                ...state,
                drydrumsQty: payload,
                loading: false
            };
        case types.ADD_DRYDRUM:
            return {
                ...state,
                drydrum: payload,
                loading: false
            };
        case types.SET_CURRENT_DRYDRUM:
            return {
                ...state,
                drydrum: action.payload
            };

        case types.DELETE_DRYDRUM:
            return {
                ...state,
                drydrums: state.drydrums.filter(drydrum => drydrum._id !== action.payload),
                loading: false
            };
        case types.DRYDRUM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
