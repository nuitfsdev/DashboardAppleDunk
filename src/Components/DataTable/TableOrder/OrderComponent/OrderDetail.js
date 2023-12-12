/* eslint-disable react/no-array-index-key */
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useEffect, useState } from 'react';
import classes from './OrderDetail.module.scss';
import { useParams } from 'react-router-dom'
import api from '../../../../Api/OrderApi'
import parse from "html-react-parser"
import Sidebar from '../../../Bar/Sidebar/Sidebar';
import Navbar from '../../../Bar/Navbar/Navbar';

function OrderDetail() {
    const [order, setOrder] = useState();
    const { id } = useParams();

    useEffect(() => {
        api.getOrderById().then(result => {console.log(result);setOrder(result)})
    }, [id])



    return (
        <div className={classes.blog_details}>
            <Sidebar />

            <div className={classes.detail_page_main}>
                <Navbar type={'order'} />

                <div className={classes.blog_detailss}>
                    
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
