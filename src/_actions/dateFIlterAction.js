import * as types from "./types";


//Save Filter Date to Store
export const setFilteredDate = (formdata) => dispatch => {
    try {
        const data = formdata;
        // console.log(data)
        dispatch({
            type: types.SET_DATE,
            payload: data
        });
    } catch (err) {
        console.log(err)
    }
};