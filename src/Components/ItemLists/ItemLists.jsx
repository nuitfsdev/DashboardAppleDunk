import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FeedIcon from '@mui/icons-material/Feed';
import BadgeIcon from '@mui/icons-material/Badge';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './itemlists.module.scss';
import axios from 'axios';

function ItemLists({ type }) {
    const [customer,setCustomer] = useState(0);
    const [order,setOrder] = useState(0);
    const [news , setNews] = useState(0);
    const [employee,setEmployee] = useState(0);
    const GetAllCustomer = () => {
        axios.get('http://localhost:3001/api/auth')
        .then(response => {
            setCustomer(response.data.totalKH);
        })
    }
    const GetAllOrders = () => {
        axios.get('http://localhost:3001/api/don-hang')
        .then(response => {
            setOrder(response.data.totalOrder);
        })
    }
    const GetAllNews = () => {
        axios.get('http://localhost:3001/api/tin-tuc')
        .then(response => {
            setNews(response.data.totalNews);
        })
    }
    const GetAllEmployees = () => {
        axios.get('http://localhost:3001/api/nhanvien')
        .then(response => {
            setEmployee(response.data.length);
        })
    }
    useEffect(() => {
        GetAllCustomer();
        GetAllOrders();
        GetAllNews();
        GetAllEmployees();
    },[]);

    let data;

    
    switch (type) {
        case 'customer':
            data = {
                title: 'Khách hàng',
                count: customer,
                icon: (
                    <PermIdentityIcon
                        style={{
                            color: '#FF74B1',
                            width: 32,
                            height: 32,
                        }}
                        className="icon"
                    />
                ),
                link: 'Xem tất cả khách hàng',
                linkto: '/customers',
            };
            break;
        case 'order':
            data = {
                title: 'Đơn hàng',
                count: order,

                icon: (
                    <LocalGroceryStoreOutlinedIcon
                        style={{
                            color: '#AC7088',
                            width: 32,
                            height: 32,
                        }}
                        className="icon"
                    />
                ),
                link: 'Xem tất cả đơn hàng',
                linkto: '/orders',
            };
            break;
        case 'new':
            data = {
                title: 'Tin tức',
                count: news,
                icon: (
                    <FeedIcon
                        style={{
                            color: '#367E18',
                            width: 32,
                            height: 32,
                        }}
                        className="icon"
                    />
                ),
                link: 'Xem tất cả tin tức',
                linkto: '/news'
            };
            break;
        case 'employee':
            data = {
                title: 'Nhân viên',
                count: employee,
                icon: (
                    <BadgeIcon
                        style={{
                            color: '#AC7088',
                            width: 32,
                            height: 32,
                        }}
                        className="icon"
                    />
                ),
                link: 'Xem tất cả nhân viên',
                linkto: '/employees',
            };
            break;
        default:
            break;
    }

    return (
        <div className={classes.item_listss}>
            <div className={classes.name}>
                <p>{data.title}</p>
            </div>
            {/* Note right there */}

            <div className={classes.counts}>
                {data.count}
            </div>

            <div className={classes.see_item}>
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
