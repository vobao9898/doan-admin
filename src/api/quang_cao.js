import axios from "axios";
import axiosService from "./axiosService";
const token = JSON.parse(localStorage.getItem("token"));
var url_upload = "api/upload";
var URL = "http://localhost:8080";
var url_quang_cao = "api/quang_cao";

// var url_get_loia_giay = ''
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});
// const authAxiosDelete = axios.create({
//     baseURL: URL,

//     headers: {
//         Authorization: `Bearer ${token}`,
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     },
// });

export const upload = (file) => {
    let formData = new FormData();
    const config = {
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "content-type": "multipart/form-data",
        },
    };
    formData.append("image", file);
    return axios.post(`${URL}/${url_upload}`, formData, config);
};

export const getQuangCao = () => {
    return authAxios.get(`/api/quang_cao`);
};

export const ThemQuangCao = (data) => {
    return axiosService.post(`${URL}/${url_quang_cao}`, data);
};

export const pageQuangCao = (data) => {
    return authAxios.post(`/api/quang_cao/page`, data);
};

export const updateQuangCao = (data) => {
    return authAxios.patch(`/api/quang_cao`, data);
};

export const deleteQuangCao = (data) => {
    return authAxios.post(`/api/quang_cao/delete`, data);
};