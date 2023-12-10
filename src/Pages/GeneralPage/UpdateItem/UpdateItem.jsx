import React, { useState, useEffect } from "react";
import Input from "../../../Components/Input/Input";
import macbook from "../../../Assets/Images/macbook_pro.png";
import classes from "./UpdateItem.module.scss";
import EmployeeApi from "../../../Api/EmployeeApi";
import Promotion from "../../../Api/Promotion"
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";

const UpdateItem = ({ inputs, titlee, type }) => {
    const navigate = useNavigate();
    const params = useParams();
    console.log(type);
    let dynamicInpVal;
    const [formInp, setFormInp] = useState(dynamicInpVal);
    //const [formInp, setFormInp] = useState(dynamicInpVal);
    const GetItemById = (id) => {
        axios
            .get(`http://localhost:3001/api/product/${id}`)
            .then((response) => {
                setFormInp(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    //CUSTOMER
    const GetCustomerById = (id) => {
        axios
            .get(`http://localhost:3001/api/auth/${id}`)
            .then((response) => {
                setFormInp(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const UpdateCustomerById = (id) => {
        console.log("ok");
        console.log(id);
        axios
            .put(`http://localhost:3001/api/auth/${id}`, {
                hoten: formInp.hoten,
                diachi: formInp.diachi,
                ngaysinh: formInp.ngaysinh,
                sdt: formInp.sdt,
            })
            .then((response) => {
                console.log("Update successfully!" + response);
            })
            .catch((error) => {
                console.error("Update error", error);
            });
    };

    //END OF CUSTOMER

    // EMPLOYEE
    const GetNVById = (id) => {
        EmployeeApi.getNVById(id)
            .then((response) => {
                setFormInp(response);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const UpdateNVById = (id) => {
        console.log("ok");
        console.log(id);
        EmployeeApi.updateNV(id, {
                hoten: formInp.hoten,
                role: formInp.role,
                email: formInp.email,
                sdt: formInp.sdt,
            })
            .then((response) => {
                console.log("Update successfully!" + response);
            })
            .catch((error) => {
                console.error("Update error", error);
            });
    };

    //END OF EMPLOYY

    //STORE
    const GetStoreById = (id) => {
        axios
            .get(`http://localhost:3001/api/store/${id}`)
            .then((response) => {
                setFormInp(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const UpdateStoreById = (id) => {
        console.log(id);
        axios
            .put(`http://localhost:3001/api/store/${id}`, {
                name: formInp.name,
                provinceCode: Number(formInp.provinceCode),
                districtCode: Number(formInp.districtCode),
            })
            .then(() => {
                Swal.fire({
                    title: "Cập nhật thành công!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 800,
                });
                console.log(formInp);
            })
            .catch((err) => console.log(err));
    };
    //END OF STORE

    //PROMOTION
    const batdauFormat = (value) =>{
        const datebd = new Date(value);
        return `${datebd.getDate()}/${datebd.getMonth() + 1}/${datebd.getFullYear()}`;
    }

    const ketthucFormat = (value)=>{
        const datekt = new Date(value);
        return `${datekt.getDate()}/${datekt.getMonth() + 1}/${datekt.getFullYear()}`;
    }
    const GetKMById = (id) => {
        Promotion.getKMByID(id)
        .then((response) => {
            response.batdau = batdauFormat(response.batdau);
            response.ketthuc = ketthucFormat(response.ketthuc);
            setFormInp(response);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const UpdateKMById = (id) => {
        //đổi lại cho đúng định dạng ngày tháng để update
        const bd = formInp.batdau.split("/");
        formInp.batdau = `${parseInt(bd[1])}/${parseInt(bd[0])}/${parseInt(bd[2])}`;
        const kt = formInp.ketthuc.split("/");
        formInp.ketthuc =  `${parseInt(kt[1])}/${parseInt(kt[0])}/${parseInt(kt[2])}`;

        Promotion.updateKM(id, {
            apdung: formInp.apdung,
            phantramkm: formInp.phantramkm,
            batdau: formInp.batdau,
            ketthuc: formInp.ketthuc,
            title: formInp.title,
            image: formInp.image,
            description: formInp.description,
            dateSource: formInp.dateSource,
            detail: formInp.detail,
            category: formInp.category
        })
            .then(() => {
                Swal.fire({
                    title: "Cập nhật thành công!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 800,
                });
                console.log(formInp);
            })
            .catch((err) => console.log(err));
    };
    //END PROMOTION 

    //GUARANTEE
    const GetCTBHById = (id, ctbhId) => {
        axios
            .get(`http://localhost:3001/api/baohanh/ctbh/${id}/${ctbhId}`)
            .then((response) => {
                setFormInp(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const UpdateCTBHById = (id, ctbhId) => {
        console.log(id);
        axios
            .put(`http://localhost:3001/api/baohanh/ctbh/${id}/${ctbhId}`, {
				ngbaohanh: formInp.ngbaohanh,
                mota: formInp.mota,
                tinhtrangbaohanh: formInp.tinhtrangbaohanh
            })
            .then(() => {
                Swal.fire({
                    title: "Cập nhật thành công!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 800,
                });
                console.log(formInp);
            })
            .catch((err) => console.log(err));
    };
    //END GUARANTEE

    useEffect(() => {
        //console.log(params.productId);
        if (type === "CUSTOMER") {
            GetCustomerById(params.customerId);
        } else if (type === "STORE") {
            GetStoreById(params.storeId);
        } else if(type==="EMPLOYEE")
        {
            GetNVById(params.employeeId)
        } else if(type==="PROMOTION"){
            GetKMById(params.promotionId)
        }else if(type==="GUARANTEE"){
            GetCTBHById(params.guaranteeId, params.ctbhId)
        } else {
            GetItemById(params.productId);
        }

       

    }, []);
    const UpdateItemById = (id) => {
        console.log("ok");
        console.log(id);
        axios
            .put(`http://localhost:3001/api/product/${id}`, formInp)
            .then((response) => {
                console.log("Update successfully!" + response);
            })
            .catch((error) => {
                console.error("Update error", error);
            });
    };

    const handleChange = (e) => {
        setFormInp({ ...formInp, [e.target.name]: e.target.value });
    };
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(type);
        if (type === "PRODUCT") {
            UpdateItemById(params.productId);
            Swal.fire({
                title: "Cập nhật thành công",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
        }
        if (type === "CUSTOMER") {
            UpdateCustomerById(params.customerId);
            Swal.fire({
                title: "Cập nhật thành công",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
            console.log(formInp);
        }
        if (type === "STORE") {
            UpdateStoreById(params.storeId);
        }
        if (type === "EMPLOYEE") {
            UpdateNVById(params.employeeId);
            Swal.fire({
                title: "Cập nhật thành công",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
            navigate(-1);
        }
        if(type === "PROMOTION"){
            UpdateKMById(params.promotionId);
            Swal.fire({
                title: "Cập nhật thành công",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
        }
        if(type === "GUARANTEE"){
            UpdateCTBHById(params.guaranteeId, params.ctbhId);
            Swal.fire({
                title: "Cập nhật thành công",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
        }
    };

    return (
        <div className={classes.new_page_main}>
             
            <div className={classes.add_new_item}>
                <h1>{titlee}</h1>
            </div>
            <div className={classes.new_page_form}>
                {/*<div className={classes.containerImg}>
					<img src={macbook}></img>
					<img src={macbook}></img>
					<img src={macbook}></img>
					<img src={macbook}></img>
				</div>*/}
                <form onSubmit={handleSubmit}>
                    {inputs.map((detail) => (
                        <Input
                            key={detail.id}
                            {...detail}
                            value={formInp ? formInp[detail.name] : ""}
                            onChange={handleChange}
                        />
                    ))}
                    <div className={classes.wrap}>
                        <button type="submit" className={classes.button}>
                            Cập nhật

                        </button>
                        <button onClick={(e)=>goBack(e)} className={classes.button} style={{marginLeft:"100px"}}>
                            Quay lại

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
