import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TableChartIcon from '@mui/icons-material/TableChart';
import DiscountIcon from '@mui/icons-material/Discount';
import StoreIcon from '@mui/icons-material/Store';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import GroupsIcon from '@mui/icons-material/Groups';
import React, { useContext } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../../ColorContext/darkContext';
import { useState, useEffect } from 'react';
import images from '../../../Assets/Images';
import './Sidebar.scss';

function Sidebar() {
    
    const { darkMode, dispatch } = useContext(ColorContext);
    const [user, setUser] = useState('');
    const loadDataFromLocalStorage = () => {
        const userLocalData = localStorage.getItem('user');
        const userData=JSON.parse(userLocalData);
        if (userData) {
          setUser(userData.hoten);
        }
      };
    useEffect(() => {
        // Load data from localStorage when the component mounts
        loadDataFromLocalStorage();
      }, []);

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', height: "100%" }}>
                    {/* <h3 className="text_none">APPLEDUNK</h3> */}
                    <img src={images.logo} alt="Logo" className='logoImg' />
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Trang chủ</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Thống kê
                        </li>
                    </Link>

                    <p className="spann">lists</p>
                    <Link to="/customers" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Quản lý khách hàng
                        </li>
                    </Link>
                    <Link to="/employees" style={{ textDecoration: 'none' }}>
                        <li>
                            <GroupsIcon className="icon" /> Quản lý nhân viên
                        </li>
                    </Link>
                    <Link to="/promotions" style={{ textDecoration: 'none' }}>
                        <li>
                            < LoyaltyIcon className="icon" /> Quản lý khuyến mãi
                        </li>
                    </Link>
                    <Link to="/products" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Quản lý sản phẩm
                        </li>
                    </Link>
                    <Link to="/news" style={{ textDecoration: 'none' }}>
                        <li>
                            <LibraryBooksIcon className="icon" /> Quản lý tin tức
                        </li>
                    </Link>
                    <Link to="/orders" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Quản lý đơn hàng
                        </li>
                    </Link>
                    <Link to="/stores" style={{ textDecoration: 'none' }}>
                        <li>
                            <StoreIcon className="icon" /> Quản lý cửa hàng
                        </li>
                    </Link>
                    <Link to="/invoices" style={{ textDecoration: 'none' }}>
                        <li>
                            <DiscountIcon className="icon" /> Quản Lý hóa đơn
                        </li>
                    </Link>    
                    <Link to="/guarantee" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Quản lý bảo hành
                        </li>
                    </Link>
                    <p className="spann">Cài đặt</p>
                    <p className="user"><AccountCircleIcon className="icon" /> {user || "Nhân viên"} </p>
                    <Link to="/login" >
                        <li>
                            <LogoutIcon className="icon" /> Đăng Xuất
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
