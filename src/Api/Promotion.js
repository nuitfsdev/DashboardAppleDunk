import axiosInstance from "./axiosInstance";

const getAllKM = async()=>{
    return await axiosInstance.get(`api/khuyenmai`);
}

const getKMByID = async(id)=>{
    return await axiosInstance.get(`api/khuyenmai/${id}`);
}

const getKMByMaKM = async(makm)=>{
    return await axiosInstance.get(`api/khuyenmaibyMaKM/${makm}`);
}

const getKMByApdung = async(apdung)=>{
    return await axiosInstance.get(`api/khuyenmai/apdung/${apdung}`);
}

const getKMByApdungAndPhanTram = async(apdung,phantramkm)=>{
    return await axiosInstance.get(`api/khuyenmai/apdung&phantram/${apdung}/${phantramkm}`);
}

const addKM = async(data)=>{
    return await axiosInstance.post(`api/khuyenmai/`, data);
}

const updateKM = async(id, data)=>{
    return await axiosInstance.put(`api/khuyenmai/${id}`, data);
}

const deleteKM = async(id)=>{
    return await axiosInstance.delete(`api/khuyenmai/${id}`);
}

export default {
    getAllKM,
    getKMByID,
    getKMByMaKM,
    getKMByApdung,
    getKMByApdungAndPhanTram,
    addKM,
    updateKM,
    deleteKM
}