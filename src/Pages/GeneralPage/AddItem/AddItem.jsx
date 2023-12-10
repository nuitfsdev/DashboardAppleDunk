import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import Input from '../../../Components/Input/Input';
import Navbar from '../../../Components/Bar/Navbar/Navbar';
import Sidebar from '../../../Components/Bar/Sidebar/Sidebar';
import noImage from '../../../Assets/Images/no-results.png';
import classes from './AddItem.module.scss';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link, history } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

function AddNew({ inputs, titlee, type }) {
    let dynamicInpVal;

    // dynamically change the state values
    switch (type) {
        case 'CUSTOMER':
            dynamicInpVal = {
                username: '',
                name: '',
                email: '',
                password: '',
                address: '',
                age: ''
            };
            break;
        case 'EMPLOYEE':
                dynamicInpVal = {
                    username: '',
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    age: ''
                };
                break;    
        case 'PRODUCT':
            dynamicInpVal = {
                tensanpham: '',
                loaisanpham: '',
                masp: '',
                hinh: '',
                gia: '',
                rom: '',
                mausac: '',
                ram: '',
                chip: '',
                baomat: '',
                chongnuoc: '',
                sac: '',
                dophangiai: '',
                kichthuoc: '',
                camera: '',
                khoiluong: '',
                hedieuhanh: '',
                nguongoc: '',
                chatlieu: '',
                kichthuocmanhinh: '',
                loaiphukien: '',
                congnghe: '',
                congsuat: '',
                baohanh: ''
            };
        break;
        case 'NEWS':
            dynamicInpVal = {
                title: '',
                image: '',
                dateSource: '',
                description: '',
                category: '',
                detail: '',
            };
            break;
        case "PROMOTION":
            dynamicInpVal = {
                makm: '',
                apdung: '',
                phantramkm: '',
                batdau: '',
                ketthuc: '',
                title: '',
                image: '',
                description: '',
                dateSource: '',
                detail: '',
                category: ''
            };
            break;
        case "STORE":
            dynamicInpVal = {
                name: '',
                provinceCode: '',
                districtCode: '',
            };
            break;
        case "GUARANTEE":
            dynamicInpVal = {
                mota: '',
                tinhtrangbaohanh: '',
                ngbaohanh: '',
            };
        default:
            break;
    }
    const [formInp, setFormInp] = useState(dynamicInpVal);

    const [ file, setFile] = useState('');

    const image = false;
    
    const {id} = useParams();

    const GetApiPost = (type) => {
        switch (type) {
            case "PRODUCT":
                return "http://localhost:3001/api/product";
            case "CUSTOMER":
                return "http://localhost:3001/api/auth/"    
            case "STORE":
                return "http://localhost:3001/api/store/"   
            case "EMPLOYEE":
                return "http://localhost:3001/api/nhanvien"
            case "PROMOTION":
                return "http://localhost:3001/api/khuyenmai"
            case "GUARANTEE":
                return `http://localhost:3001/api/baohanh/ctbh/${id}`
            default:
                break;
        }
    }
    const navigate = useNavigate();

    function AddNewItem(type) {
        console.log(type);
        axios.post(GetApiPost(type), formInp)
        .then(response => {
            console.log(response.data);
                })
        .then(()=>navigate(-1))
        .catch(error => {
            console.error(error);
        });   
    }
    
    const handleSuccessAction = () => {
        Swal.fire({
            title: "Success",
            icon: "success",
            text: "Update successfully",
            button: "Ok"    
        });
      };
    const handleChange = (e) => {
        setFormInp({ ...formInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AddNewItem(type);
        console.log(formInp);
        Swal.fire({
            title: "Thành công",
            icon: "success",
            text: "Thêm thành công",
            confirmButtonText: 'Ok',  
        })
        .then((result) => {
            if (result.isConfirmed) {
                console.log("OKKKKKK");
              // If user clicks "Yes", navigate to another page using React Router's Link
              // Replace "/another-page" with the desired URL
            };
        })
    };
    return (
        <div className={classes.add_new}>
            <Sidebar />

            <div className={classes.new_page}>
                <Navbar type={type} />

                <div className={classes.new_page_main}>
                    <div className={classes.new_page_content}>
                        <div className={classes.image}>
                            <p className={classes.add_new_user}>{titlee}</p>
                            <img src={file ? URL.createObjectURL(file) : noImage} alt="" />
                            <div className={classes.form_inp}>
                                <label htmlFor="file" className={classes.uploadImages}>
                                    Tải ảnh lên 
                                    {/* <DriveFolderUploadIcon className={classes.file_icon} /> */}
                                </label>

                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={classes.form}>
                                    {inputs.map((detail) => (
                                        <Input
                                            key={detail.id}
                                            {...detail}
                                            value={formInp[detail.name]}
                                            onChange={handleChange}
                                        />
                                    ))}

                            </div>

                            <button type="submit" className={classes.submit_btn}>
                                Tạo mới
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNew;
