import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./TableStore.module.scss";
import api from "../../../Api/StoreApi";
import Swal from "sweetalert2";

function TableStore({ type }) {
    const [data, setData] = useState();

    useEffect(() => {
        api.getAllStore().then((result) => {
            setData(result.listStores);
        });
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Bạn muốn xóa cửa hàng không?",
            showDenyButton: true,
            confirmButtonText: "Có",
            denyButtonText: "Không",
            customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                api.deleteStoreById(id)
                    .then(async (res) => {
                        await Swal.fire("Xóa thành công!", "", "success");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            renderCell: (param) => <div>{param.row._id}</div>,
        },
        {
            field: "name",
            headerName: "Tên cửa hàng",
            width: 400,
        },
        {
            field: "provinceCode",
            headerName: "Mã tỉnh/thành phố",
            width: 180,
        },
        {
            field: "districtCode",
            headerName: "Mã quận/huyện",
            width: 180,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 300,
            renderCell: (params) => (
                <div className={classes.actionn}>
                    {/* <Link to={params.row._id}>
                        <button type="button" className={classes.view_btn}>
                            Xem
                        </button>
                    </Link> */}
                    <button
                        type="button"
                        className={classes.delete_btn}
                        onClick={() => handleDelete(params.row._id)}
                    >
                        Xóa
                    </button>
                    <Link
                        to={`/stores/updatenew/${params.row._id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <button type="button" className={classes.update_btn}>
                            Sửa
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className={classes.blog_page}>
            <div className={classes.blog_page_main}>
                <div className={classes.blog_page_table}>
                    {data && (
                        <DataGrid
                            rowHeight={100}
                            getRowId={(row) => row._id}
                            className={classes.data_grid}
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TableStore;
