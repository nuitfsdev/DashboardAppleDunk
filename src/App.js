import { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import { InputDetails } from './InputDetails';
import Home from './Pages/Home/Home';
import AddNew from './Pages/GeneralPage/AddItem/AddItem';
import NewsDetail from './Pages/NewsManagement/NewsDetail/NewsDetail'
import NewsAdd from './Pages/NewsManagement/NewsAdd/NewsAdd'
//import Blogs from './Pages/News/News';
import DefaultLayoutPage from './Pages/DefaultLayoutPage/DefaultLayoutPage';
import Detail from './Pages/Detail/Detail';
import Login from './Pages/Login/Login';
import UpdateItem from './Pages/GeneralPage/UpdateItem/UpdateItem';
import ViewNew from './Pages/GeneralPage/ViewItem/ViewItem';
import { useParams } from 'react-router-dom';
import Guarantee from './Pages/Guarantee/Guarantee';
import TableGuaranteeDetail from './Components/DataTable/TableGuaranteeDetail/TableGuaranteeDetail';

import DetailCustomer from './Components/DataTable/TableCustomer/CustomerView.jsx/DetailCustomer';


import './app.scss';

import UpdateNews from './Pages/NewsManagement/UpdateNews/UpdateNews';
import OrderDetail from './Components/DataTable/TableOrder/OrderComponent/OrderDetail';

const userInpDetails = InputDetails.userInpDetails;
const productInpDetails = InputDetails.productInpDetails;
const blogInputs = InputDetails.blogInputs;
const promotionInpDetails = InputDetails.promotionInputs;
const storeInpDetails = InputDetails.storeInputs;
const orderInpDetails = InputDetails.orderInpDetails

const guaranteeInpDetails = InputDetails.guaranteeInputs;
const invoiceInputDetails = InputDetails.invoiceInputs;


function App() {
    const { darkMode } = useContext(ColorContext);
    
    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                       

                        {/* Product */}
                        <Route path="products">
                            <Route index element={<DefaultLayoutPage type="product" />} />
                            <Route path=":productId" element={< ViewNew inputs={productInpDetails}
                                        titlee="Xem chi tiết sản phẩm"
                                        type="PRODUCT"/>} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={productInpDetails}
                                        titlee="Thêm mới sản phẩm"
                                        type="PRODUCT"
                                    />

                                }
                            />
                            <Route path="updatenew/:productId"
                                element={
                                    <UpdateItem inputs={productInpDetails}
                                        type="PRODUCT"
                                        titlee="Cập nhật sản phẩm"
                                    />
                                }></Route>
                        </Route>

                        {/* Customer */}
                        <Route path="customers">
                            <Route index element={<DefaultLayoutPage type="customer" />} />
                            <Route path=":customerId" element={<DetailCustomer />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={userInpDetails}
                                        titlee="Thêm khách hàng mới"
                                        type="CUSTOMER"
                                    />
                                }
                            />
                            <Route path="updatenew/:customerId"
                                element={
                                    <UpdateItem inputs={InputDetails.userUpDetails}
                                        type="CUSTOMER"
                                        titlee="Cập nhật khách hàng"
                                    />
                                }></Route>
                        </Route>

                        {/* Promotion */}
                        <Route path="promotions">
                            <Route index element={<DefaultLayoutPage type="promotion" />} />
                            <Route path=":promotionId" element={< ViewNew inputs={promotionInpDetails}
                                        titlee="Xem khuyến mãi"
                                        type="PROMOTION"/>} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={promotionInpDetails}
                                        titlee="Thêm khuyến mãi"
                                        type="PROMOTION"
                                    />
                                }
                            />
                            <Route path="updatenew/:promotionId"
                                element={
                                    <UpdateItem inputs={promotionInpDetails}
                                        type="PROMOTION"
                                        titlee="Cập nhật khuyến mãi"
                                    />
                                }></Route>
                        </Route>

                        {/* Order */}
                        <Route path="orders">
                            <Route index element={<DefaultLayoutPage type="order" />} />
                            <Route path=":orderId" element={<OrderDetail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={orderInpDetails}
                                        titlee="Add New Customer"
                                        type="CUSTOMER"
                                    />
                                }
                            />
                            <Route path="updateorder/:orderId"
                                element={
                                    <UpdateItem inputs={orderInpDetails}
                                        type="CUSTOMER"
                                        titlee="Update Current Customer"
                                    />
                                }></Route>
                        </Route>

                        {/* Employee */}
                        <Route path="employees">
                            <Route index element={<DefaultLayoutPage type="employee" />} />
                            <Route path=":employeeId" element={<Detail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={InputDetails.employeeInpDetails}
                                        titlee="Thêm nhân viên mới"
                                        type="EMPLOYEE"
                                    />
                                }
                            />
                            <Route path="updatenew/:employeeId"
                                element={
                                    <UpdateItem inputs={InputDetails.employeeUpDetails}
                                        type="EMPLOYEE"
                                        titlee="Cập nhật nhân viên"
                                    />
                                }></Route>
                        </Route>

                       

                        {/* Store */}
                        <Route path="stores">
                            <Route index element={<DefaultLayoutPage type="store" />} />
                            <Route path=":storeId" element={<Detail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={storeInpDetails}
                                        titlee="Thêm cửa hàng"
                                        type="STORE"
                                    />
                                }
                            />
                            <Route path="updatenew/:storeId"
                                element={
                                    <UpdateItem inputs={storeInpDetails}
                                        type="STORE"
                                        titlee="Cập nhật cửa hàng"
                                    />
                                }></Route>
                        </Route>

                        {/* News */}
                        <Route path="news">
                            <Route index element={<DefaultLayoutPage type="news" />} />
                            <Route path=":slug" element={<NewsDetail />} />
                            <Route
                                path="addnew"
                                element={
                                    <NewsAdd />
                                }
                            />
                            <Route 
                                path='updatenews/:slug'
                                element={
                                    <UpdateNews />
                                }
                             />
                        </Route>

                        {/* Guarantee */}
                        <Route path="guarantee">
                            <Route index element={<Guarantee/>} />
                            <Route path=":guaranteeId" element={<TableGuaranteeDetail/>}/>
                            <Route
                                path="addnew/:id"
                                element={
                                    <AddNew
                                        inputs={guaranteeInpDetails}
                                        titlee="Thêm chi tiết bảo hành"
                                        type="GUARANTEE"
                                    />
                                }
                            />
                            <Route path="updatenews/:guaranteeId/:ctbhId"
                                element={
                                    <UpdateItem inputs={guaranteeInpDetails}
                                        type="GUARANTEE"
                                        titlee="Cập nhật chi tiết bảo hành"
                                    />
                                }></Route>
                        </Route>

                        {/* invoice */}
                        <Route path="invoices">
                            <Route index element={<DefaultLayoutPage type="invoice" />} />
                            {/* <Route path=":invoiceId" element={<BlogDetail />} /> */}
                            <Route path=":invoiceId" element={< ViewNew inputs={invoiceInputDetails}
                                        titlee="View New Invoice"
                                        type="INVOICE"/>} />
                          
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
