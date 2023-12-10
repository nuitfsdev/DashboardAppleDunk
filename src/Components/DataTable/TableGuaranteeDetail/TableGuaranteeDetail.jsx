import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import classes from './TableGuaranteeDetail.module.scss';
import Navbar from '../../Bar/Navbar/Navbar';
import Sidebar from '../../Bar/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import HandleApiGuarantee from '../../../Api/Guarantee';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function TableGuaranteeDetail(){
    
    const [data, setData] = useState([]);
    const {guaranteeId} = useParams();

    const columns = [
        {
            field: 'id',
            headerName: 'Lần Thứ',
            width: 100,
            renderCell: (param) => (
                <div className={classes.userr}>{param.row.id}</div>
            ),
        },
        { 
            field: 'ngbaohanh', 
            headerName: 'Ngày bảo hành',
            width: 150 ,
            renderCell: (param) => (
                <div className={`status ${param.row.ngbaohanh}`}>{param.row.ngbaohanh}</div>
            ),
        },
        {
            field: 'mota',
            headerName: 'Mô tả',
            width: 400,
            renderCell: (param) => (
                <div className={`status ${param.row.mota}`}>{param.row.mota}</div>
            ),
        },
        { 
            field: 'tinhtrangbaohanh', 
            headerName: 'Tình trạng bảo hành', 
            width: 400,
            renderCell: (param) => (
                <div className={`status ${param.row.tinhtrangbaohanh}`}>{param.row.tinhtrangbaohanh}</div>
            ),
        },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 270,
            renderCell: (params) => (
                <div className={classes.actionn}>
                    <button
                        type="button"
                        className={classes.delete_btn}
                        onClick={() => handleDlt(guaranteeId, params.row._id)}
                    >
                        Xóa
                    </button>
                    <Link 
                        to={`/guarantee/updatenews/${guaranteeId}/${params.row._id}`}
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

    useEffect(() => {
        HandleApiGuarantee.getBHByID(guaranteeId)
        .then((response) => {
            const newData = response.chitietbaohanh.map(item => ({
                ...item,
                id: item.lanthu // Thêm trường dữ liệu mới
            }));
            setData(newData)
        })
        .catch((error) => {
        console.log(error);
        });
    });

    const handleDlt = async(guaranteeId, ctbhId) => {
    //xác nhận xóa
    const notification = await Swal.fire({
        title: "Xóa thông tin này",
        icon: "warning",
        text: "Bạn muốn xóa thông tin bảo hành này",
        button: "Ok",
        showCancelButton: true,
        confirmButtonText: "Ok",
    });
    //nếu chọn yes
    if (notification.isConfirmed) {
        HandleApiGuarantee.DeleteCTBH(guaranteeId, ctbhId)
        .then((response) => {
            Swal.fire({
                title: "Xóa thành công",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
        })
        .catch((error) => {
            console.error("Error deleting item:", error);
        });
    }
};

    return (
        <div className={classes.list_page}>
            <Sidebar />
            <div className={classes.list_page_main}>
                <Navbar />
                <div className={classes.data_table}>
                    <div className={classes.btnn}>
                        <Link
                            to={`/guarantee/addnew/${guaranteeId}`}
                            style={{ textDecoration: "none" }}
                        >
                            <button type="button">Thêm mới</button>
                        </Link>
                    </div>
                    <DataGrid
                        className={classes.data_grid}
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    );
}

export default TableGuaranteeDetail;
