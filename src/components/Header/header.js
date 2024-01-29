import { Link } from "react-router-dom";
// css for header navbar
import '../Styles/header.css';
// reactbootstrap dropdown
import NavDropdown from 'react-bootstrap/NavDropdown';
// for context api data send inside component
import { useContext, useState } from "react";
import { UserContext, CartContext, CurrencyContext } from "../Context";

function Header(props) {
  const userContext = useContext(UserContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { CurrencyData, setCurrencyData } = useContext(CurrencyContext);
  // For seller/vendor Panel
  const checkVendor = localStorage.getItem('vendor_login');
  // for Admin Panel
  const checkAdmin = localStorage.getItem('owner_login');
  // Conditions for Cart
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
  // for selected and search
  const Style = {
    position: 'static',
    display: 'flex',
    width: '90px'
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid overflow-none" >
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to='/'>Python</Link>
            {/* for options and search bar in Navbar */}
            <div>
              <form className=" input-group">
                <select style={Style} className="form-select" aria-label="Default select example">
                  <option selected>Deals</option>
                  <option value="search-alias=aps">All Categories</option>
                  <option value="search-alias=alexa-skills">Alexa Skills</option>
                  <option value="search-alias=amazon-devices">Amazon Devices</option>
                  <option value="search-alias=fashion">Amazon Fashion</option>
                  <option value="search-alias=nowstore">Amazon Fresh</option>
                  <option value="search-alias=amazon-pharmacy">Amazon Pharmacy</option>
                  <option value="search-alias=appliances">Appliances</option>
                  <option value="search-alias=mobile-apps">Apps &amp; Games</option>
                  <option value="search-alias=audible">Audible Audiobooks</option>
                  <option value="search-alias=baby">Baby</option>
                  <option value="search-alias=beauty">Beauty</option>
                  <option value="search-alias=stripbooks">Books</option>
                  <option value="search-alias=automotive">Car &amp; Motorbike</option>
                  <option value="search-alias=apparel">
                    Clothing &amp; Accessories
                  </option>
                  <option value="search-alias=collectibles">Collectibles</option>
                  <option value="search-alias=computers">
                    Computers &amp; Accessories
                  </option>
                  <option value="search-alias=electronics">Electronics</option>
                  <option value="search-alias=furniture">Furniture</option>
                  <option value="search-alias=lawngarden">Garden &amp; Outdoors</option>
                  <option value="search-alias=gift-cards">Gift Cards</option>
                  <option value="search-alias=grocery">
                    Grocery &amp; Gourmet Foods
                  </option>
                  <option value="search-alias=hpc">Health &amp; Personal Care</option>
                  <option value="search-alias=kitchen">Home &amp; Kitchen</option>
                  <option value="search-alias=industrial">
                    Industrial &amp; Scientific
                  </option>
                  <option value="search-alias=jewelry">Jewellery</option>
                  <option value="search-alias=digital-text">Kindle Store</option>
                  <option value="search-alias=luggage">Luggage &amp; Bags</option>
                  <option value="search-alias=luxury-beauty">Luxury Beauty</option>
                  <option value="search-alias=dvd">Movies &amp; TV Shows</option>
                  <option value="search-alias=popular">Music</option>
                  <option value="search-alias=mi">Musical Instruments</option>
                  <option value="search-alias=office-products">Office Products</option>
                  <option value="search-alias=pets">Pet Supplies</option>
                  <option value="search-alias=instant-video">Prime Video</option>
                  <option value="search-alias=shoes">Shoes &amp; Handbags</option>
                  <option value="search-alias=software">Software</option>
                  <option value="search-alias=sporting">
                    Sports, Fitness &amp; Outdoors
                  </option>
                  <option value="search-alias=specialty-aps-sns">
                    Subscribe &amp; Save
                  </option>
                  <option value="search-alias=home-improvement">
                    Tools &amp; Home Improvement
                  </option>
                  <option value="search-alias=toys">Toys &amp; Games</option>
                  <option value="search-alias=under-ten-dollars">Under ₹500</option>
                  <option value="search-alias=videogames">Video Games</option>
                  <option value="search-alias=watches">Watches</option>
                </select>
                <input className="form-control w-50" type="search" placeholder="Search in website" aria-label="Search" />
                <label className="form-label" htmlFor="form1" />
                <button className="btn btn-warning" type="submit"><i className="fa fa-search" /></button>
              </form>
            </div>
            {/* end search */}
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
                    <NavDropdown.Item eventKey="4.1"><Link className='text-decoration-none' to='/seller/dashboard'>Dashboard</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.4"><Link className='text-decoration-none' to='/seller/logout'>LogOut</Link></NavDropdown.Item>
                  </>
                }
                {
                  !checkVendor &&
                  <>
                    <NavDropdown.Item eventKey="4.2"><Link className='text-decoration-none' to='/seller/register'>Register</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3"><Link className='text-decoration-none' to='/seller/login'>Login</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                }
              </NavDropdown>
              {/* Customer Pannel */}
              <NavDropdown title="My Account" id="nav-dropdown">
                {userContext != 'true' &&
                  <>
                    <NavDropdown.Item eventKey="4.2"><Link className='text-decoration-none' to='/customer/register'>Register</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3"><Link className='text-decoration-none' to='/customer/login'>Login</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                }
                {userContext == 'true' &&
                  <>
                    <NavDropdown.Item eventKey="4.1"><Link className='text-decoration-none' to='/customer/dashboard'>Dashboard</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.4"><Link className='text-decoration-none' to='/customer/logout'>LogOut</Link></NavDropdown.Item>
                  </>
                }
              </NavDropdown>
              {/* Admin Pannel */}
              <NavDropdown title="Admin Panel" id="nav-dropdown">
                {
                  checkAdmin &&
                  <>
                    <NavDropdown.Item eventKey="4.1"><Link className='text-decoration-none' to='/admin/dashboard'>Dashboard</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3"><Link className='text-decoration-none' to='/owner/about'>About Us</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.4"><Link className='text-decoration-none' to='/admin/logout'>LogOut</Link></NavDropdown.Item>
                  </>
                }
                {
                  !checkAdmin &&
                  <>
                    <NavDropdown.Item eventKey="4.3"><Link className='text-decoration-none' to='/admin/login'>Login</Link></NavDropdown.Item>
                  </>
                }
                <NavDropdown.Divider />
              </NavDropdown>
              {/* Admin Pannel end */}
              <li className="nav-item">
                <span className="nav-link text-dark">
                  <select onChange={changeCurrency}>
                    <option value='inr'>INR</option>
                    <option value='usd'>USD</option>
                  </select>
                </span>
              </li>
              <NavDropdown title="Help!" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1"><Link className='text-decoration-none' to='/contact'>Contact</Link></NavDropdown.Item>
                <NavDropdown.Item eventKey="4.4"><Link className='text-decoration-none' to='/about'>About</Link></NavDropdown.Item>
              </NavDropdown>
            </ul>
          </div>
        </div>
      </nav>
      {/* // end first navbar */}
    </>
  );
}
export default Header