import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import OrderRows from '../OrderRow';


function Oders() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const customer_d = localStorage.getItem('customer_id');
    const [OrderItems, setOrderItems] = useState([]);


    useEffect(() => {
        fetchdata(baseUrl + '/customer/' + customer_d + '/orderitems/');
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
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9 col-12 mb-3 mt-3'>
                        <div className='row'>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sl No.</th>
                                            <th>Ord_Id</th>
                                            <th>Item_Id</th>
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