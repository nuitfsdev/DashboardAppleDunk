import axiosInstance from "./axiosInstance";
const getAllNV = async () => {
    let query = `/api/nhanvien`;
    return await axiosInstance.get(query);
};

const getNVById = async (id) => {
    let query = `/api/nhanvien/${id}`;
    return await axiosInstance.get(query);
};

const getOrderByMaKH = async (id) => {
    let query = `/don-hang?makh=${id}`;
    return await axiosInstance.get(query);
};

const createKH = async (data) => {
    return await axiosInstance.post("/api/nhanvien/", data);
};
const deleteNV = async (id) => {
    return await axiosInstance.delete(`/api/nhanvien/${id}`);
};

const updateNV = async (id,data) => {
    return await axiosInstance.put(`/api/nhanvien/${id}`,data);
};

export default {
    getAllNV,
    getNVById,
    getOrderByMaKH,
    deleteNV,
    createKH,
    updateNV
    
};
