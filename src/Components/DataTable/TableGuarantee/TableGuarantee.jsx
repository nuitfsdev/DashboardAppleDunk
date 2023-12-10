import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import React from 'react';
import classes from './TableGuarantee.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

function TableGuarantee({ data }){

    const [productMap, setProductMap] = useState({});

    const columns = [
        {
            field: 'id',
            headerName: 'MaBH',
            width: 100,
            renderCell: (param) => (
                <div className={classes.userr}>{param.row.id}</div>
            ),
        },
        { 
            field: 'MaSP', 
            headerName: 'Mã sản phẩm',
            width: 220 ,
            renderCell: (param) => (
                <div className={`status ${param.row.masp}`}>{param.row.masp}</div>
            ),
        },
        { 
            field: 'tensanpham', 
            headerName: 'Tên sản phẩm',
            width: 200 ,
            renderCell: (param) => (
                <div className={`status ${param.row.masp}`}>{productMap[param.row.masp] || 'Unknown'}</div>
            ),
        },
        {
            field: 'MaHD',
            headerName: 'Mã hóa đơn',
            width: 100,
            renderCell: (param) => (
                <div className={`status ${param.row.mahd}`}>{param.row.mahd}</div>
            ),
        },
        { 
            field: 'MaNV', 
            headerName: 'Mã nhân viên', 
            width: 100,
            renderCell: (param) => (
                <div className={`status ${param.row.manv}`}>{param.row.manv}</div>
            ),
        },
        { field: 'thoigian', headerName: 'Thời gian', width: 120 },
        { field: 'nghethan', headerName: 'Ngày hết hạn', width: 120 },
        {
            field: 'action',
            headerName: 'Hoành động',
            width: 270,
            renderCell: (params) => (
                <div className={classes.actionn}>
                    <Link to={params.row._id}>
                        <button type="button" className={classes.view_btn}>
                            Xem
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const fetchProductData = async () => {
          const promises = data.map((row) =>
            axios
              .get(`http://localhost:3001/api/product/${row.masp}`)
              .then((res) => ({ id: row.masp, name: res.data.tensanpham }))
              .catch((error) => ({ id: row.masp, name: "Unknown" }))
          );
          const products = await Promise.all(promises);
          const productDataMap = products.reduce((map, product) => {
            map[product.id] = product.name;
            return map;
          }, {});
          setProductMap(productDataMap);
        };
    
        fetchProductData();
    }, [data]);

    return (
        <div className={classes.data_table}>
            <DataGrid
                className={classes.data_grid}
                rows={[...data]}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}

export default TableGuarantee;
