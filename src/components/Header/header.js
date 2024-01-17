import { Link } from "react-router-dom";
// reactbootstrap dropdown
import NavDropdown from 'react-bootstrap/NavDropdown';
// for context api
import { useContext, useState } from "react";
import { UserContext, CartContext, CurrencyContext } from "../Context";

function Header(props) {
  const userContext = useContext(UserContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { CurrencyData, setCurrencyData } = useContext(CurrencyContext);
  // For seller/vendor
  const checkVendor = localStorage.getItem('vendor_login');

  if (cartData == null) {
    var cartItems = 0;
  }
  else {
    var cartItems = cartData.length;
  }
  // function for currency
  const changeCurrency = (e) => {
    var _currency = e.target.value;
    localStorage.setItem('currency', _currency);
    setCurrencyData(_currency);
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to='/'>Python market place</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/checkout">My Cart ({cartItems})</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/checkout">New Order(5)</Link>
            </li>
            {/* Seller/Vendor pannel */}

            <NavDropdown title="Vendor Panel" id="nav-dropdown">
              {
                checkVendor &&
                <>
                  <NavDropdown.Item eventKey="4.1"><Link to='/seller/dashboard'>Dashboard</Link></NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4"><Link to='/seller/logout'>LogOut</Link></NavDropdown.Item>
                </>
              }
              {
                !checkVendor &&
                <>
                  <NavDropdown.Item eventKey="4.2"><Link to='/seller/register'>Register</Link></NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3"><Link to='/seller/login'>Login</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              } 
            </NavDropdown>
            {/* Customer Pannel */}
            {/* My account */}
            <NavDropdown title="My Account" id="nav-dropdown">
              {userContext != 'true' &&
                <>
                  <NavDropdown.Item eventKey="4.2"><Link to='/customer/register'>Register</Link></NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3"><Link to='/customer/login'>Login</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              }
              {userContext == 'true' &&
                <>
                  <NavDropdown.Item eventKey="4.1"><Link to='/customer/dashboard'>Dashboard</Link></NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4"><Link to='/customer/logout'>LogOut</Link></NavDropdown.Item>

                </>
              }
            </NavDropdown>
            <li className="nav-item">
              <span className="nav-link text-light">
                <select onChange={changeCurrency}>
                  <option value='inr'>INR</option>
                  <option value='usd'>USD</option>
                </select>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header