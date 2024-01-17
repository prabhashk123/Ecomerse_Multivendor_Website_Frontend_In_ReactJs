import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import OrderRows from '../OrderRow';


function Oders() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const customerId = localStorage.getItem('customer_id');
    const [OrderItems, setOrderItems] = useState([]);


    useEffect(() => {
        fetchdata(baseUrl + '/customer/' + customerId + '/orderitems/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setOrderItems(data);
                // console.log(data);
            });
    }
    // console.log(OrderItems);

    return (
        <>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9 col-12 mb-3'>
                        <div className='row'>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Ord_Id</th>
                                            <th>Products</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            OrderItems.map((item, index) => {
                                                return <OrderRows item={item} key={index} index={index} />

                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default Oders;