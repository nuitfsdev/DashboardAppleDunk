import React from 'react';
import Chart from '../../Components/Chart/Chart';
import Navbar from '../../Components/Bar/Navbar/Navbar';
import Sidebar from '../../Components/Bar/Sidebar/Sidebar';
import TableList from '../../Components/DataTable/TableProduct/TableProduct';
import userPic from '../../Assets/Images/portrait.png';
import classes from './Detail.module.scss';

function Detail() {
    // const { userId, productId } = useParams();
    return (
        <div className={classes.details}>
            <Sidebar />

            <div className={classes.detail_page_main}>
                <Navbar />

                <div className={classes.user_info}>
                    <div className={classes.user_detail}>
                        <img src={userPic} alt="user" className={classes.user_image} />

                        <div className={classes.user_detailss}>
                            <p className={classes.name}>Name: Nguyen Thanh Trung</p>
                            <p>Email: thanhtrung@gmail.com</p>
                            <p>Address: Quang Binh Province</p>
                            <p>Age: 21</p>
                        </div>
                    </div>

                    <div className={classes.user_chart}>
                        <Chart height={390} title="User spending" />
                    </div>
                </div>

                <div className={classes.table}>
                    <div className={classes.title}>Last Orders</div>
                    <TableList />
                </div>
            </div>
        </div>
    );
}

export default Detail;
