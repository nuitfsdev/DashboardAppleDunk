import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


// import css filr
import classes from './progressBar.module.scss';
import axios from 'axios';

function ProgressBar() {
    const exportToExcel = (dataInput) => {
        console.log("Excute");
        const worksheet = XLSX.utils.json_to_sheet(dataInput);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        return data;
    };
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'pink'];

    const handleExportClick = () => {
        const excelData = exportToExcel(data);
        saveAs(excelData, 'data.xlsx');
      };
      
      

    useEffect(() => {
        axios.get('http://localhost:3001/api/percentTypeProduct')
            .then(response => {
                setData(response.data.typeAndQuantity);
                setTotal(response.data.totalQuantity);
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

    return (
        <div className={classes.progress_bar}>
            <div className={classes.top}>
                <p>Tổng sản phẩm</p>
                <button style={mystyle} onClick={handleExportClick}>Xuất ra file Excel</button>
            </div>
            <div className={classes.middle}>
                <div className={classes.progress}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="quantity"
                                nameKey="name"
                                isAnimationActive={true}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p>Tổng sản phẩm hiện tại</p>
                <p className={classes.price}>
                    {total} 
                    <DevicesOtherIcon style={{ fontSize: '40px' }} />
                </p>
            </div>

        </div>
    );
}

export default ProgressBar;
