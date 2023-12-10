/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getAllNews = async (category = null) => {
    let query = `/api/tin-tuc?pageSize=999`;
    if (category) {
        query = query.concat(`&category=${category}`)
    }
    return await axiosInstance.get(query);
};

const getNewsById = async (id) => {
    let query = `/api/tin-tuc/${id}`;
    return await axiosInstance.get(query);
};

const createNews = async (data) => {
    return await axiosInstance.post("/api/tin-tuc", data);
};

const updateNews = async (id, data) => {
    return await axiosInstance.put(`/api/tin-tuc/${id}`, data);
};

const deleteNews = async (id) => {
    return await axiosInstance.delete(`/api/tin-tuc/${id}`);
};


export default {getAllNews, getNewsById, createNews, updateNews, deleteNews};

