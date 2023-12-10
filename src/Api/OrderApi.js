/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getAllOrders = async (makh = null) => {
    let query = `/api/don-hang?pageSize=999`;
    if (makh) {
        query = query.concat(`&makh=${makh}`)
    }
    return await axiosInstance.get(query);
};

const getOrderById = async (id) => {
    let query = `/api/don-hang/${id}`;
    return await axiosInstance.get(query);
};

const createOrder = async (data) => {
    return await axiosInstance.post("/api/don-hang", data);
};

const updateOrder = async (id, data) => {
    return await axiosInstance.put(`/api/don-hang/${id}`, data);
};

const deleteOrder = async (madh) => {
    return await axiosInstance.delete(`/api/don-hang?madh=${madh}`);
};


export default {getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder};

