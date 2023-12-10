import React from 'react';
import Chart from '../../Components/Chart/Chart';
import ItemLists from '../../Components/ItemLists/ItemLists';
import Navbar from '../../Components/Bar/Navbar/Navbar';
import ProgressBar from '../../Components/Bar/ProgressBar/ProgressBar';
import Sidebar from '../../Components/Bar/Sidebar/Sidebar';
import classes from './Home.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Home() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const exportToExcel = (dataInput) => {
        console.log("Excute");
        const worksheet = XLSX.utils.json_to_sheet(dataInput);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        return data;
    };
    const handleExportClick = () => {
        const excelData = exportToExcel(data);
        saveAs(excelData, 'data.xlsx');
      };
    useEffect(() => {
        axios.get('http://localhost:3001/api/totalRevenueByMonth')
            .then(response => {
                setData(response.data.monthAndRevenue);
                setTotal(response.data.totalRevenue);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    const mystyle = {
        marginRight: '20px',
        cursor: 'pointer',
        color: "white",
        backgroundColor: "#1a9506",
        padding: "10px",
        fontSize: "16px",
        fontFamily: "Arial",
        borderRadius: '4px',
        border: 'none',
        marginLeft: '30px'
    };



    //
    return (
        <div className={classes.home}>
            <Sidebar />

            <div className={classes.home_main}>
                {/* <Navbar /> */}
                <h1 className={classes.title}>Thống kê</h1>

                <div className={classes.bg_color} />

                <div className={classes.home_items}>
                    <ItemLists type="customer" />
                    <ItemLists type="order" />
                    <ItemLists type="new" />
                    <ItemLists type="employee" />
                </div>

                <div className={classes.chart_sec}>
                    <ProgressBar />
                    <label>Biểu đồ 1. Biểu đồ biểu thị số lượng các loại sản phẩm</label>
                </div>

                <div className={classes.column}>
                    <div className={classes.title}>
                        <p>Doanh thu theo tháng</p>
                        <button style={mystyle} onClick={handleExportClick}>Xuất ra file Excel</button>
                    </div>
                    <div className={classes.revenue}>
                        <p>Tổng doanh thu hiện tại:</p>
                        <p className={classes.totalRevenue}>{total.toLocaleString()}</p>
                        <img src='https://cdn-icons-png.flaticon.com/512/32/32730.png' width="24" height="22"></img>
                    </div>

                    <BarChart width={1100} height={600} data={data} className={classes.chart}>
                        <CartesianGrid strokeDasharray="4 5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#FFBB28" />
                    </BarChart>
                    <label>Biểu đồ 2. Biểu đồ doanh thu từng tháng</label>

                </div>


            </div>
        </div>
    );
}

export default Home;
