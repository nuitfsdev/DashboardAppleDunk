/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getAllStore = async () => {
    return await axiosInstance.get(`/api/store`);
};

const getStoreById = async (id) => {
    return await axiosInstance.get(`/api/store/${id}`);
};

const getStoreByDistrict = async (code) => {
    return await axiosInstance.get(`/api/store/district?code=${code}`);
};

const getStoreByProvince = async (code) => {
    return await axiosInstance.get(`/api/store/province?code=${code}`);
};

const deleteStoreById = async (id) => {
    return await axiosInstance.delete(`/api/store/${id}`);
};

export default {
    getAllStore,
    getStoreById,
    getStoreByDistrict,
    getStoreByProvince,
    deleteStoreById
};
