import React from 'react';
import { useState } from 'react';
import Navbar from '../../Components/Bar/Navbar/Navbar';
import Sidebar from '../../Components/Bar/Sidebar/Sidebar';
import classes from './Guarantee.module.scss';
import TableGuarantee from '../../Components/DataTable/TableGuarantee/TableGuarantee';
import HandleApiGuarantee from '../../Api/Guarantee';

function Guarantee(){
    const [sdt,setSdt] = useState("09877763123");

    const handleChangeSDT = (e)=>{
        //nếu là số thì cho lưu
        if (!isNaN(e.target.value))
            setSdt(e.target.value);
    }

    const [data, setData] = useState([]);

    const handleSearchGuarantee = () => {
        if(sdt!=""){
            HandleApiGuarantee.getBHBySDT(sdt)
            .then((response) => {
              const newData = response.map(item => ({
                  ...item,
                  id: item.mabh // Thêm trường dữ liệu mới
                  }));
                  setData(newData)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else console.log(sdt)
    }
    return(
        <div className={classes.list_page}>
            <Sidebar />
            <div className={classes.list_page_main}>
                <Navbar type={'guarantee'} />
                <div className={classes.data_table}>
                    <div className={classes.btnn}>
                        <label htmlFor='sdt'>Nhập số điện thoại khách hàng</label> <br/>
                        <input type="tel" value={sdt} onChange={handleChangeSDT} name='sdt'/>
                        <button type="button" onClick={handleSearchGuarantee}>Tìm</button>
                    </div>

                    {/* select the content of the table  */}

                    {data.length !== 0 && (() => {
                        return (
                            <>
                            <div>
                                <b>Khách hàng:</b> {data[0].hoten}
                            </div>
                            <div style={{marginTop:30}}>
                                <TableGuarantee data={data} />
                            </div>
                            </>
                        );
                        })()}

                    
                </div>
            </div>
        </div>
    );
}

export default Guarantee;