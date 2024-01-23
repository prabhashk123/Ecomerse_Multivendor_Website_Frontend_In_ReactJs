import SellerSidebar from './SellerSidebar';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

function SellerDashboard() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    var vendor_id = localStorage.getItem('vendor_id');
    const [VendorData, setVendorData] = useState({
        'totalOrders': 0,
        'totalProducts': 0,
        'totalCustomers': 0,
    });
    // without useeffect its render multiple time repeat infinite loop
    useEffect(() => {
        fetchdata(baseUrl + '/vendor/'+ vendor_id +'/dashboard/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setVendorData({
                    'totalOrders': data.totalOrders,
                    'totalProducts': data.totalProducts,
                    'totalCustomers': data.totalCustomers,
                });
            });
    }

    return (
        <>  
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-3 col-12 mt-3'>
                    <SellerSidebar />  
                </div>
                <div className='col-md-9 col-12 mt-3'>
                    <div className='row'>
                    <div className='col-md-3 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Products</h4>
                                    <h4><Link to='/seller/products/'>{VendorData.totalProducts}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Orders</h4>
                                    <h4><Link to='/seller/vendoroders/'>{VendorData.totalOrders}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Customers</h4>
                                    <h4><Link to='/seller/customers/'>{VendorData.totalCustomers}</Link></h4>
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
export default SellerDashboard;