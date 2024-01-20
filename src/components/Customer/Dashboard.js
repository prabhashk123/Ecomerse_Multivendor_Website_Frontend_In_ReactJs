import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';

function Dashboard(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    var customer_id = localStorage.getItem('customer_id');
    const [CountList, setCountList] = useState({
        'totalOrders': 0,
        'totalWishList': 0,
        'totalAddress': 0,
    });

    useEffect(() => {
        fetchdata(baseUrl + '/customer/dashboard/' + customer_id + '/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCountList({
                    'totalOrders': data.totalOrders,
                    'totalWishList': data.totalWishList,
                    'totalAddress': data.totalAddress,
                });
                
            });
    }

    return (
        <>
            <section>
                <div className='row ms-5 mt-3'>

                    <div className='col-md-3 col-12 mt-5'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9 col-12 mt-5'>
                        <div className='row'>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Total Orders</h4>
                                        <h4 className='text-warning'><Link to='/customer/orders'>{CountList.totalOrders}</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Total Wishlists</h4>
                                        <h4><Link to='/customer/wishlist'>{CountList.totalWishList}</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Total Addresses</h4>
                                        <h4><Link to='/customer/addresses'>{CountList.totalAddress}</Link></h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </section>


        </>
    );
}
export default Dashboard;