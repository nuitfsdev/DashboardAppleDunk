import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import man from '../../../Assets/Images/portrait.png';
import classes from './TableCustomer.module.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import CustomerApi from '../../../Api/CustomerApi';

const userData = [
    {
        id: '1',
        username: 'dangbalinh',
        email: 'linha1xp@gmail.com',
        image: man,
        address: 'HCMC City',
        age: '24',
    }
];

function TableCustomer({type}) {
    const [data, setData] = useState(userData);

    /*const handleDlt = (id) => {
        setData(data.filter((item) => item.id !== id));
    };*/
    const GetAllProduct = () => {
        CustomerApi.getAllKH()
            .then((response) => {
                let index = 0;
                const fetchedData = response.listKH.map((item) => {
                    index = index + 1;
                    return {
                        ...item,
                        id: index,
                    };
                });
                setData(fetchedData);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        GetAllProduct();
    }, []);


    const handleDlt = (id) => {
        CustomerApi.deleteKH(id)
            .then((response) => {
                console.log("Item deleted successfully.");
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    };



    const handleSuccessAction = async (id) => {
        const notification = await Swal.fire({
            title: "Xóa khách hàng này?",
            icon: "warning",
            text: "Bạn có muốn xóa khách hàng này không?",
            button: "Ok",
            showCancelButton: true,
            confirmButtonText: "Ok",
        });
        if (notification.isConfirmed) {
            handleDlt(id);
            Swal.fire({
                title: "Xóa thành công",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
            GetAllProduct();
            window.location.reload()
        }
    };








    const columns = [
        {
            field: 'id',
            headerName: 'Mã Khách hàng',
            width: 120,
            renderCell: (param) => (
                <div className={classes.userr}>
                    {param.row.makh}
                </div>
            ),
        },
        {
            field: 'image',
            headerName: 'Hình đại diện',
            width: 120,
            renderCell: (param) => (
                <div className={classes.userr}>
                    <img src={param.row.image.length>0?param.row.image[0].url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNjtjpEZtAtYMoeDfg6PO5DoGrpAhCA79Jg&usqp=CAU"} alt="User Image" className={classes.userr_image} />
                </div>
            ),
        },
        {
            field: 'hoten',
            headerName: 'Tên',
            width: 180,
            renderCell: (param) => (
                <div className={`status ${param.row.address}`}>{param.row.hoten}</div>
            )
        },
        { field: 'email', headerName: 'Email', width: 280 },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            width: 150,
            renderCell: (param) => (
                <div className={`status ${param.row.address}`}>{param.row.diachi}</div>
            ),
        },
        { field: 'age', headerName: 'Ngày sinh', width: 120,renderCell: (param) => (
                <div className={`status ${param.row.address}`}>{param.row.ngaysinh}</div>
            ),
     },
        {
            field: 'action',
            headerName: 'Hành Động',
            width: 270,
            renderCell: (params) => (
                <div className={classes.actionn}>
                    <Link to={`/customers/${params.row._id}`}>
                        <button type="button" className={classes.view_btn}
                        onClick={()=>{console.log("BAM VIEW")}}
                        >
                            Xem
                        </button>
                    </Link>
                    <button
                        type="button"
                        className={classes.delete_btn}
                        onClick={() =>  handleSuccessAction(params.row._id)}
                    >
                        Xóa
                    </button>
                    <Link 
                        to={`/customers/updatenew/${params.row._id}`}
                        style={{ textDecoration: 'none' }}
                        
                    >
                        <button
                            type="button"
                            className={classes.update_btn}

                        >Sửa</button>

                    </Link>
                    
                </div>
            ),
        },
    ];

    return (
        <div className={classes.data_table}>
            <DataGrid
                className={classes.data_grid}
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}

export default TableCustomer;
