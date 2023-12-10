import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './TableNews.module.scss';
import api from '../../../Api/NewsApi'
import Swal from 'sweetalert2';

function TableNews({ type }) {
    const [data, setData] = useState();

    useEffect(() => {
        api.getAllNews().then(result => {
            setData(result.listNews)
        })
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn muốn xóa bài viết không?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            denyButtonText: 'Không',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                api.deleteNews(id).then(async (res) => { 
                    await Swal.fire('Xóa thành công!', '', 'success');
                    window.location.reload();
                }).catch((err) => {
                    console.log(err);
                });
            }
        })
    };

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            width: 50,
        },
        {
            field: 'image',
            headerName: 'Hinh anh',
            width: 200,
            renderCell: (param) => (
                <div className={classes.newsImage}>
                    <img src={param.row.image} alt="User" className={classes.newsImage_image} />
                </div>
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 400,
            style: { color: 'red' },
        },
        { field: 'dateSource', headerName: 'Date source', width: 200 },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 300,
            renderCell: (params) => (
                <div className={classes.actionn}>
                    <Link to={params.row.slug}>
                        <button type="button" className={classes.view_btn}>
                            Xem
                        </button>
                    </Link>
                    <button
                        type="button"
                        className={classes.delete_btn}
                        onClick={() => handleDelete(params.row.slug)}
                    >
                        Xóa
                    </button>
                    <Link to={`updatenews/${params.row.slug}`}>
                        <button
                            type="button"
                            className={classes.update_btn}
                        >
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

                    {data && <DataGrid
                        rowHeight={100}
                        getRowId={(row) => row._id}
                        className={classes.data_grid}
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />}
                </div>
            </div>
        </div>
    );
}

export default TableNews;
