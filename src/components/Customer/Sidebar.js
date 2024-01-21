import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <ListGroup as="ul">
            <Link to='/customer/dashboard'><ListGroup.Item as="li" active>Dashboard</ListGroup.Item></Link>
            <Link to='/customer/orders'><ListGroup.Item as="li">Orders</ListGroup.Item></Link>
            <Link to='/customer/wishlist'><ListGroup.Item as="li">Wishlist</ListGroup.Item></Link>
            <Link to='/customer/profile'><ListGroup.Item as="li">Profile</ListGroup.Item></Link>
            <Link to='/customer/changepassword'><ListGroup.Item as="li">Change Password</ListGroup.Item></Link>
            <Link to='/customer/addresses'><ListGroup.Item as="li">Addresses</ListGroup.Item></Link>
            <ListGroup.Item as="li" className='text-danger'><Link to='/customer/logout'>LogOut</Link></ListGroup.Item>
        </ListGroup>
    );
}
export default Sidebar;