/* eslint-disable import/no-anonymous-default-export */
import * as types from "../../_actions/RateAction/rateTypes";

const initialState = {
    globalPrices: [],
    globalPrice: null,
    filterDryDrumRate: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_ALL_GLOBAL_PRICES:
            return {
                ...state,
                globalPrices: payload,
                loading: false
            };

        case types.GET_CURRENT_GLOBAL_PRICE:
            return {
                ...state,
                globalPrice: payload,
                loading: false
            };



        // case types.ADD_DRYDRUM:
        //     return {
        //         ...state,
        //         globalPrices: payload,
        //         loading: false
        //     };
        case types.SET_CURRENT_GLOBAL_PRICE:
            return {
                ...state,
                globalPrice: action.payload
            };

        case types.DELETE_GLOBAL_PRICE:
            return {
                ...state,
                globalPrices: state.globalPrices.filter(globalPrices => globalPrices._id !== action.payload),
                loading: false
            };
        case types.GLOBAL_PRICE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
