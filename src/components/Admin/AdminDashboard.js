import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

function AdminDashboard() {
    // const baseUrl = 'http://127.0.0.1:8000/api';
    // var owner_id = localStorage.getItem('owner_id');
    // const [AdminData, setAdminData] = useState({
    //     'totalOrders': 0,
    //     'totalProducts': 0,
    //     'totalCustomers': 0,
    // });
    // without useeffect its render multiple time repeat infinite loop
    // useEffect(() => {
    //     fetchdata(baseUrl + '/owner/'+ owner_id +'/dashboard/');
    // }, []);

    // function fetchdata(baseUrl) {
    //     fetch(baseUrl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setAdminData({
    //                 'totalOrders': data.totalOrders,
    //                 'totalProducts': data.totalProducts,
    //                 'totalCustomers': data.totalCustomers,
    //             });
    //         });
    // }

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
                                    <h4><Link to='/seller/products/'>6</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Orders</h4>
                                    <h4><Link to='/seller/vendoroders/'>5</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Customers</h4>
                                    <h4><Link to='/seller/customers/'>7</Link></h4>
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