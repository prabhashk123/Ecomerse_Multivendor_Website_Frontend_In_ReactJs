import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        
        <ListGroup as="ul">
            <Link className='text-decoration-none text-dark' to='/seller/dashboard'><ListGroup.Item as="li" active>Dashboard</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/seller/products'><ListGroup.Item as="li">Products</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/seller/addproduct'><ListGroup.Item as="li">Add Product</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/seller/vendoroders'><ListGroup.Item as="li">Orders</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/seller/customers'><ListGroup.Item as="li">Customers</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/seller/reports'><ListGroup.Item as="li">Reports</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/seller/vendorprofile'><ListGroup.Item as="li">Profile</ListGroup.Item></Link>
            {/* <Link className='text-decoration-none text-dark' to='/seller/contactus'><ListGroup.Item as="li">Contact Us</ListGroup.Item></Link> */}
            <Link className='text-decoration-none text-dark' to='/seller/vendorchangepassword'><ListGroup.Item as="li">Change Password</ListGroup.Item></Link>
            <ListGroup.Item as="li"><Link to='/seller/logout' className='text-decoration-none text-danger'>LogOut</Link></ListGroup.Item>
        </ListGroup>
    );
}
export default Sidebar;