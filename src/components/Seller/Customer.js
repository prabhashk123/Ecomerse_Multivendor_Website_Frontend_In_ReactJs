import SellerSidebar from './SellerSidebar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Customer() {
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [CustomerList, setCustomerList] = useState([]);

    useEffect(() => {
        fetchdata(baseApiUrl + '/vendor/' + vendor_id + '/customers/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCustomerList(data);
            });
    }
        // For delete button
        function showConfirm(customer_id) {
            var _confirm = window.confirm("Are you sure you want to delete this order!?")
            if (_confirm) {
                fetch(baseApiUrl + '/delete-customer-orders/' + customer_id, {
                    method: 'DELETE'
                })
                    .then((response) => {
                        if (response.bool==true) {
                            fetchdata(baseApiUrl + '/seller/customer/'+customer_id+'/orderitems');
                        }
    
                    });
            }
        }


    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12 mt-3'>
                        <SellerSidebar />
                    </div>
                    <div className='col-md-9 col-12 mt-3'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sl N0.</th>
                                        <th>C_Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        CustomerList.map((item, index) => <tr>
                                            <td>{index+1}</td>
                                            <td>{item.customer.id}</td>
                                            <td>
                                                {item.user.first_name} {item.user.last_name}
                                            </td> 
                                            <td>{item.user.email}</td>
                                            <td>{item.customer.mobile}</td>
                                            <td>
                                                <Link to={`/seller/customer/${item.customer.id}/orderitems`} className='btn btn-primary btn-sm'>Orders</Link>
                                                <button onClick={()=>showConfirm(item.customer.id)} className='btn btn-danger btn-sm ms-1'>Remove from list</button>
                                            </td> 
                                        </tr>)
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
export default Customer;