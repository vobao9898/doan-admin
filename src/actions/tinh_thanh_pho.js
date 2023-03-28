import * as contantGiay from '../contants/tinh_thanh_pho';


export const setTinhThanhPhoEdittings = (data) => {
    return {
        type: contantGiay.SET_TINHTHANHPHO_EDITTING,
        payload: {
            data,
        },
    };
};

export const setTinhThanhPhogEdittingNull = () => {
    return {
        type: contantGiay.SET_TINHTHANHPHO_EDITTING_NULL,
    };
};
