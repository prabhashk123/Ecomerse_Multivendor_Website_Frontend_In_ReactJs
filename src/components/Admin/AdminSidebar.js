import axios from 'axios';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function AdminSidebar() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    // for Notifications count
    const[notifiData,setnotifiData]=useState([])
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/vendor/allnotificatons/')
            .then((res)=>{
                console.log(res);
                setnotifiData(res.data);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    return (
        
        <ListGroup as="ul">
            <Link className='text-decoration-none text-dark' to='/admin/dashboard'><ListGroup.Item as="li" active>Dashboard</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/allvendorproducts'><ListGroup.Item as="li">Vendors Products</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/category'><ListGroup.Item as="li">Category</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/addcategory'><ListGroup.Item as="li">Add Category</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/allcustomersorders'><ListGroup.Item as="li">Orders</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/allcustomers'><ListGroup.Item as="li">Customers</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/allvendors'><ListGroup.Item as="li">Vendors</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/allreports'><ListGroup.Item as="li">Reports</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/coupan'><ListGroup.Item as="li">Coupan</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/admin/allnotifications'><ListGroup.Item as="li">Notifications<span className="badge rounded  badge-danger">{notifiData.length}</span></ListGroup.Item></Link>
            {/* <Link to='/admin/vendorprofile'><ListGroup.Item as="li">Profile</ListGroup.Item></Link> */}
            {/* <Link to='/admin/vendorchangepassword'><ListGroup.Item as="li">Change Password</ListGroup.Item></Link> */}
            <ListGroup.Item as="li" className='text-danger'><Link className='text-decoration-none text-danger' to='/admin/logout'>LogOut</Link></ListGroup.Item>
        </ListGroup>
    );
}
export default AdminSidebar;