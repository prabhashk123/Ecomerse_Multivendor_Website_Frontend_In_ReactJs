import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const[allProductData,setallProductData]=useState([])
    const[allCustomerData,setallCustomerData]=useState([])
    const[allOrderData,setallOrderData]=useState([])
    useEffect(()=>{
        fetchallorders(baseUrl+'/orders/');
        fetchallproducts(baseUrl+'/products');
        fetchallcustomers(baseUrl+'/customers');
    },[]);
    // for products
    function fetchallproducts(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setallProductData(data.results);
            });
    };
     // for orders
     function fetchallorders(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setallOrderData(data);
            });
    };
    // for customers
    function fetchallcustomers(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setallCustomerData(data);
            });
    };
    return (
        <>
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-3 col-12 mt-5'>
                    <AdminSidebar />  
                </div>
                <div className='col-md-9 col-12 mt-5'>
                    <div className='row'>
                    <div className='col-md-3 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Products</h4>
                                    <h4><Link to='/admin/allvendorproducts/'>{allProductData.length}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Orders</h4>
                                    <h4><Link to='/admin/allcustomersorders'>{allOrderData.length}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Customers</h4>
                                    <h4><Link to='/admin/allcustomers/'>{allCustomerData.length}</Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default AdminDashboard;