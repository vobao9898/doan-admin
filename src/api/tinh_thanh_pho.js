import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

var URL = "http://localhost:8080";

// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

// export const Them = (data) => {
//     return authAxios.post(`/api/khach_hang`, data);
// };

export const getList = () => {
    return authAxios.get(`/api/tinh_thanh_pho`);
};

export const update = (data) => {
    return authAxios.post(`/api/tinh_thanh_pho/update`, data);
};
export const page = (data) => {
    return authAxios.post(`/api/tinh_thanh_pho/page`, data);
};

export const pageSearch = (data) => {
    return authAxios.post(`/api/tinh_thanh_pho/pageSearch`, data);
};

export const getPageTotal = () => {
    return authAxios.get(`/api/tinh_thanh_pho/pageTotal`);
};


export const getPageSearchTotal = () => {
    return authAxios.get(`/api/tinh_thanh_pho/pageSearchTotal`);
};

export const deletetinh_thanh_pho = (data) => {
    return authAxios.post(`/api/tinh_thanh_pho/delete`, data);
};