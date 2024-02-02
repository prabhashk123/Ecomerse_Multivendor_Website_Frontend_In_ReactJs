import Dropdown from 'react-bootstrap/Dropdown';
import SellerSidebar from './SellerSidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CustomerOders() {
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const baseUrl = 'http://127.0.0.1:8000';
    const vendor_id = localStorage.getItem('vendor_id');
    const {customer_id}=useParams();
    const [OrderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetchdata(`${baseApiUrl}/vendor/${vendor_id}/customer/${customer_id}/orderitems`);
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
                    fetchdata(`${baseApiUrl}/vendor/${vendor_id}/customer/${customer_id}/orderitems`);
            }
            });
    }
    
    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <SellerSidebar />
                    </div>
                    <div className='col-md-9 col-12 mb-2 mt-3'>
                        {/* <h3><Link to='/seller/addproduct' className='btn btn-primary mb-2 float-end'><i className='fa fa-plus-circle'></i> Add Product</Link></h3> */}
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Cus_id</th>
                                        <th>Order_id</th>
                                        <th>Item_id</th>
                                        <th>prod_id</th>
                                        <th>Product</th>
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
                                            <td><Link><img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width='80' alt="..." /></Link>
                                                <p><Link className='text-decoration-none'>{item.product.title}</Link></p>
                                            </td>
                                            <td>Rs. {item.product.price}</td>
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
                                                        {/* <Dropdown.Item href="#">Approve</Dropdown.Item>
                                                        <Dropdown.Item href="#">Sent</Dropdown.Item> */}
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
export default CustomerOders;