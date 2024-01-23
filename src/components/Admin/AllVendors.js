import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';


function AllVendors() {
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [VendorList, setVendorList] = useState([]);

    useEffect(() => {
        fetchdata(baseApiUrl + '/vendors/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setVendorList(data);
            });
    }
    // For delete button
    function showConfirm(vendor_id) {
        var _confirm = window.confirm("Are you sure you want to delete vendor profile?")
        if (_confirm) {
            fetch(baseApiUrl + '/vendor/'+ vendor_id, { 
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status==204) {
                        fetchdata(baseApiUrl + '/vendors/');
                    }

                });
        }
    }
    // style for Profile image
    const profileimg={
        height : '100',
        width : '100%'
    }

    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9 col-12 mb-2 mt-3'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Vd_Id</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Address</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        VendorList.map((item, index) => <tr>
                                            <td>{index+1}</td>
                                            <td>{item.id}</td>
                                            <td>
                                                {item.user.first_name} {item.user.last_name}
                                            </td>
                                            <td>{item.user.username}</td>
                                            <td>{item.user.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.address}</td>
                                            <td><img src={`http://127.0.0.1:8000/${item.profile_img}`}  style={profileimg} alt={item.profile_img} /></td>
                                            <td width='8%'>
                                                {/* <Link to={`/seller/customer/${item.customer.id}/orderitems`} className='btn btn-primary btn-sm'>Orders</Link> */}
                                                <button onClick={()=>showConfirm(item.id)} className='btn btn-danger btn-sm ms-1'>Delete</button>
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
export default AllVendors;