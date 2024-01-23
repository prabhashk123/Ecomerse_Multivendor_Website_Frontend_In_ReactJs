import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <ListGroup as="ul">
            <Link className='text-decoration-none text-dark' to='/customer/dashboard'><ListGroup.Item as="li" active>Dashboard</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/customer/orders'><ListGroup.Item as="li">Orders</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/customer/wishlist'><ListGroup.Item as="li">Wishlist</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/customer/profile'><ListGroup.Item as="li">Profile</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/customer/changepassword'><ListGroup.Item as="li">Change Password</ListGroup.Item></Link>
            <Link className='text-decoration-none text-dark' to='/customer/addresses'><ListGroup.Item as="li">Addresses</ListGroup.Item></Link>
            <ListGroup.Item as="li"><Link to='/customer/logout' className='text-decoration-none text-danger'>LogOut</Link></ListGroup.Item>
        </ListGroup>
    );
}
export default Sidebar;