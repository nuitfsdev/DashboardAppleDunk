import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import TableCustomer from '../../Components/DataTable/TableCustomer/TableCustomer';
import Navbar from '../../Components/Bar/Navbar/Navbar';
import Sidebar from '../../Components/Bar/Sidebar/Sidebar';
import TableProduct from '../../Components/DataTable/TableProduct/TableProduct';
import TablePromotion from '../../Components/DataTable/TablePromotion/TablePromotion';
import TableOrder from '../../Components/DataTable/TableOrder/TableOrder';
import TableEmployee from '../../Components/DataTable/TableEmployee/TableEmployee';
import TableStore from '../../Components/DataTable/TableStore/TableStore';
import TableNews from '../../Components/DataTable/TableNews/TableNews';
import TableInvoice from '../../Components/DataTable/TableInvoice/TableInvoice';
import axios from 'axios';
import classes from './DefaultLayoutPage.module.scss';
import { Margin } from '@mui/icons-material';
import {saveAs} from 'file-saver';

function DefaultLayoutPage({ type }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(acceptedFiles[0]);
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:3001/api/importProductExcel', formData)
            .then(response => {
                console.log("Upload file successfully!");
                console.log(response);
            })
            .catch(error => {
                console.log("Error", error);
            })
    };
    //
    function DownloadProductExcel() {
        axios.get('http://localhost:3001/api/exportProductExcel',{
			responseType: 'blob',
		  })
            .then(response => {
                console.log("Download file successfully!");
                console.log(response);
                const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      			saveAs(blob, 'ProductData.xlsx');
            })
            .catch(error => {
                console.log("Error", error);
            })
    };
    function DownloadInvoiceExcel() {
        axios.get('http://localhost:3001/api/exportInvoiceExcel',{
			responseType: 'blob',
		  })
            .then(response => {
                console.log("Download file successfully!");
                console.log(response);
                const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      			saveAs(blob, 'InvoiceData.xlsx');
            })
            .catch(error => {
                console.log("Error", error);
            })
    };
    function DownloadPromotionExcel() {
        axios.get('http://localhost:3001/api/exportPromotionExcel',{
			responseType: 'blob',
		  })
            .then(response => {
                console.log("Download file successfully!");
                console.log(response);
                const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      			saveAs(blob, 'PromotionData.xlsx');
            })
            .catch(error => {
                console.log("Error", error);
            })
    };

    function Table({ type }) {
        const mystyle = {
            marginRight: '20px',
            cursor: 'pointer',
            color: "white",
            marginBottom: "20px",
            backgroundColor: "#1A9506",
            padding: "10px",
            fontSize: "16px",
            fontFamily: "Arial",
            fontWeight: "bold",
            borderRadius: '4px',
            border: 'none'
        };
        switch (type) {
            case 'customer':
                return(
                    <div>
                        <TableCustomer />
                    </div>
                );
            case 'product':

                return (
                    <div >
                        <div style={{ display: 'flex' }}>
                            <Dropzone onDrop={handleFileDrop} accept=".xlsx,.xls">
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <button style={mystyle}>Nhập sản phẩm từ Excel</button>
                                    </div>
                                )}
                            </Dropzone>
                            <button style={mystyle} onClick={DownloadProductExcel}>Xuất danh sách sản phẩm</button>
                        </div>

                        <TableProduct />
                    </div>
                );
            case 'promotion':
                return (
                    <div>
                        <button style={mystyle} onClick={DownloadPromotionExcel}>Xuất ra file excel</button>
                        <TablePromotion />
                    </div>
                );
            case 'order':
                return <TableOrder />;
            case 'employee':
                return <TableEmployee />;
            case 'store':
                return <TableStore />;
            case 'invoice':
                    
                return(
                    <div>
                        <button style={mystyle} onClick={DownloadInvoiceExcel}>Xuất ra file excel</button>
                        <TableInvoice />;
                    </div>
                );
            default:
                return <TableNews />;
        }
    }

    function Title({ type }) {
        const mystyle = {
            textAlign: 'center',
            margin: '20px 0'
        };
        switch (type) {
            case 'customer':
                return(
                    <h2 style={mystyle}>Quản lý khách hàng</h2>
                );
            case 'product':

                return (
                    <h2 style={mystyle}>Quản lý sản phẩm</h2>
                );
            case 'promotion':
                return (
                    <h2 style={mystyle}>Quản lý khuyến mãi</h2>
                );
            case 'order':
                return (
                    <h2 style={mystyle}>Quản lý đơn hàng</h2>
                );
            case 'employee':
                return (
                    <h2 style={mystyle}>Quản lý nhân viên</h2>
                );
            case 'store':
                return (
                    <h2 style={mystyle}>Quản lý cửa hàng</h2>
                );
            case 'invoice':
                    
                return(
                    <h2 style={mystyle}>Quản lý hóa đơn</h2>
                );
            default:
                return (
                    <h2 style={mystyle}>Quản lý tin tức</h2>
                );
        }
    };

    let linkPath;
    let title;
    switch (type) {
        case "product":
            linkPath = "products";
            title = "sản phẩm";
            break;
        case "customer":
            linkPath = "customers";
            title = "khách hàng";
            break;
        case "order":
            linkPath = "orders";
            title = "đơn hàng";
            break;
        case "employee":
            linkPath = "employees";
            title = "nhân viên";
            break;
        case "promotion":
            linkPath = "promotions";
            title = "khuyến mãi";
            break;
        case "store":
            linkPath = "stores";
            title = "cửa hàng";
            break;
        case 'invoice':
            linkPath = 'invoices';
            title = "hóa đơn";
            break;
      default:
        linkPath = 'news';
        title = "";
        break;
    }
    return (
        <div className={classes.list_page}>
            <Sidebar />

            <div className={classes.list_page_main}>
                <Navbar type={type}/>
                {/* <Title type={type} /> */}
                <div className={classes.data_table}>
                    <div className={classes.btnn}>
                        <Link
                            to={`/${linkPath}/addnew`}
                            style={{ textDecoration: "none" }}
                        >
                            <button type="button">Thêm {title} mới</button>
                        </Link>
                    </div>

                    {/* select the content of the table  */}
                    <Table type={type} />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayoutPage;
//{type === 'customer' ? <TableCustomer /> : <TableProduct type='product'/>}
