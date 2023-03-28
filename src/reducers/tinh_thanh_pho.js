import * as contant from '../contants/tinh_thanh_pho';
import * as api from './../api/tinh_thanh_pho'
// import Moment from 'moment';
const initialState = {
    tinhEditting: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.SET_TINHTHANHPHO_EDITTING:
            {
                let { data } = action.payload;
                return {
                    ...state,
                    tinhEditting: data,
                };
            }
        case contant.SET_TINHTHANHPHO_EDITTING_NULL:
            {
                return {
                    ...state,
                    tinhEditting: {},
                };
            }
        default:
            return state;
    }
};

export default reducer;