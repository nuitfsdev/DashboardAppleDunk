import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import classes from "./TableInvoice.module.scss";

function TableInvoice({ type }) {
    const [data, setData] = useState([]);
    const handleDlt = (id) => {
        axios
            .delete(`http://localhost:3001/api/hoa-don/${id}`)
            .then((response) => {
                console.log("Item deleted successfully.");
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    };
    const handleSuccessAction = async (id) => {
        const notification = await Swal.fire({
            title: "Delete this item",
            icon: "warning",
            text: "Do you want to delete this item?",
            button: "Ok",
            showCancelButton: true,
            confirmButtonText: "Ok",
        });
        if (notification.isConfirmed) {
            handleDlt(id);
            Swal.fire({
                title: "Delete successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
            });
            GetAllInvoice();
        }
    };

    const GetAllInvoice = () => {
        axios
            .get("http://localhost:3001/api/hoa-don")
            .then((response) => {
                let index = 0;
                const fetchedData = response.data.listHoaDon.map((item) => {
                    index = index + 1;
                    return {
                        ...item,
                        id: index,
                    };
                });
                setData(fetchedData);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        GetAllInvoice();
    }, [data]);

    console.log(data);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 50,
            headerAlign: "center",
            renderCell: (param) => (
                <div className={classes.userr}>{param.row.id}</div>
            ),
        },
        {
            field: "mahd",
            headerName: "Mã hóa đơn",
            width: 140,
            headerAlign: "center",
            renderCell: (param) => (
                <div className={classes.userr}>{param.row.mahd}</div>
            ),
        },
        {
            field: "makh",
            headerName: "Mã khách hàng ",
            width: 140,
            headerAlign: "center",
            renderCell: (param) => (
                <div className={classes.productName}>
                    {param.row.makh}
                </div>
            ),
        },
        // {
        //     field: "manv",
        //     headerName: "Mã Nhân Viên",
        //     width: 120,
        //     headerAlign: "center",
        //     renderCell: (param) => (
        //         <div className={classes.productType}>
        //             {param.row.manv}
        //         </div>
        //     ),
        // },
        {
            field: "ngayxuathd",
            headerName: "Ngày xuất hóa đơn",
            width: 170,
            headerAlign: "center",
            renderCell: (param) => (
                <div className={classes.productType}>
                    {param.row.ngayxuathd}
                </div>
            ),
        },
        {
            field: "trigia",
            headerName: "Trị giá",
            width: 170,
            headerAlign: "center",
            renderCell: (param) => <div>{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(param.row.trigia)}</div>,
        },
        // {
        //     field: "phuongthucthanhtoan",
        //     headerName: "Phương thức thanh toán",
        //     width: 150,
        //     headerAlign: "center",
        //     renderCell: (param) => <div>{param.row.phuongthucthanhtoan}</div>,
        // },
        {
            field: "tinhtrang",
            headerName: "Tình trạng",
            width: 140,
            headerAlign: "center",
            renderCell: (param) => <div>{param.row.tinhtrang}</div>,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 290,
            headerAlign: "center",
            renderCell: (params) => (
                <div className={classes.actionn}>
                    <Link to={`/invoices/${params.row._id}`}>
                        <button type="button" className={classes.view_btn}>
                            Xem
                        </button>
                    </Link>
                    <button
                        type="button"
                        className={classes.delete_btn}
                        onClick={() => handleSuccessAction(params.row._id)}
                    >
                        Xóa
                    </button>
                    {/* <Link 
                        to={`/invoices/updatenew/${params.row._id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <button type="button" className={classes.update_btn}>
                            Sửa
                        </button>
                    </Link> */}
                    {/* <button>Export PDF File</button> */}
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
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: "primary.light",
                    "& .MuiDataGrid-cell:hover": {
                        color: "primary.main",
                    },
                }}
            />
        </div>
    );
}

export default TableInvoice;
