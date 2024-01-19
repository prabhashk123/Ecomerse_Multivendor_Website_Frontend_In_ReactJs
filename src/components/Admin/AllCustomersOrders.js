import Dropdown from 'react-bootstrap/Dropdown';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AllCustomersOrders() {
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const baseUrl = 'http://127.0.0.1:8000';
    const owner_id = localStorage.getItem('owner_id');
    const [OrderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetchdata(baseApiUrl + '/orderitems/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setOrderItems(data);
                // console.log(data);
            });
    }
    // For order status
    function changeOrderStatus(order_id, status) {
        fetch(baseApiUrl + '/order-modify/' + order_id + '/', {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'order_status': status })
        })
            // .then((response) => response.json())
            .then(function(response){
                if(response.status==200){
                fetchdata(baseApiUrl +'/orderitems/')
            }
            });
    }

    return (
        <>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <AdminSidebar/>
                    </div>
                    <div className='col-md-9 col-12 mb-2'>
                        {/* <h3><Link to='/seller/addproduct' className='btn btn-primary mb-2 float-end'><i className='fa fa-plus-circle'></i> Add Product</Link></h3> */}
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>C_Id</th>
                                        <th>Ord_Id</th>
                                        <th>Items_Id</th>
                                        <th>Prod_Id</th>
                                        <th>Vend_Id</th>
                                        <th>Products</th>
                                        <th>Price</th>
                                        {/* <th>Usd_Price</th> */}
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        OrderItems.map((item, index) => <><tr>
                                            <td>{index+1}</td>
                                            <td>{item.customer.id}</td>
                                            <td>{item.order.id}</td>
                                            <td>{item.id}</td>
                                            <td>{item.product.id}</td>
                                            <td>{item.product.vendor.mobile}</td>
                                            <td><Link><img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width='80' alt="..." /></Link>
                                                <p><Link className='text-decoration-none'>{item.product.title}</Link></p>
                                            </td>
                                            <td>Rs. {item.product.price}</td>
                                            {/* <td>Rs. {item.product.usd_price}</td> */}
                                            <td>
                                                {
                                                    item.order.order_status && <span className='text-success'><i className='fa fa-check-circle'></i>Completed</span>
                                                }

                                                {
                                                    !item.order.order_status && <span className='text-danger'><i className='fa fa-spinner fa-spin  text-dark'></i>Pending</span>
                                                }
                                            </td>

                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Change Status
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            {
                                                                !item.order.order_status && <a className='text-decoration-none text-success' href='#' onClick={() => changeOrderStatus(item.order.id, true)}>Complete</a>
                                                            }
                                                            {
                                                                item.order.order_status && <a className='text-decoration-none text-danger' href='#' onClick={() => changeOrderStatus(item.order.id, false)}>Pending</a>
                                                            }
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </td>
                                        </tr >
                                        </>)
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div >


        </>
    );
}
export default AllCustomersOrders;