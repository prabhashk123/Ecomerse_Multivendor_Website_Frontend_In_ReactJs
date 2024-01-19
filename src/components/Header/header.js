import { Link } from "react-router-dom";
import '../Styles/header.css';
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
  // for Admin
  const checkAdmin = localStorage.getItem('owner_login');

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
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to='/'>Python</Link>
          {/* for search buutons */}
          {/* <form
            id="nav-search-bar-form"
            acceptCharset="utf-8"
            action="/s/ref=nb_sb_noss"
            classname="nav-searchbar nav-progressive-attribute"
            method="GET"
            name="site-search"
            role="search"
          >
            <div classname="nav-left">
              <div id="nav-search-dropdown-card">
                <div classname="nav-search-scope nav-sprite">
                  <div classname="nav-search-facade" data-value="search-alias=aps">
                    <span
                      id="nav-search-label-id"
                      classname="nav-search-label nav-progressive-content"
                      style={{ width: "auto" }}
                    >
                      Deals
                    </span>
                    <i classname="nav-icon" />
                  </div>
                  <label
                    id="searchDropdownDescription"
                    htmlFor="searchDropdownBox"
                    classname="nav-progressive-attribute"
                    style={{ display: "none" }}
                  >
                    Select the department you want to search in
                  </label>
                  <select
                    aria-describedby="searchDropdownDescription"
                    classname="nav-search-dropdown searchSelect nav-progressive-attrubute nav-progressive-search-dropdown"
                    data-nav-digest="8FDKJBBcGM3ChmMDcN65zldPJYY="
                    data-nav-selected={0}
                    id="searchDropdownBox"
                    name="url"
                    style={{ display: "block", top: "2.5px" }}
                    tabIndex={0}
                    title="Search in"
                  >
                    <option
                      selected="selected"
                      current="true"
                      value="search-alias=todays-deals"
                    >
                      Deals
                    </option>
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
                </div>
              </div>
            </div>
            <div classname="nav-fill">
              <div classname="nav-search-field ">
                <label htmlFor="twotabsearchtextbox" style={{ display: "none" }}>
                  Search Amazon.in
                </label>
                <input
                  type="text"
                  id="twotabsearchtextbox"
                  defaultValue=""
                  name="field-keywords"
                  autoComplete="off"
                  placeholder="Search Amazon.in"
                  classname="nav-input nav-progressive-attribute"
                  dir="auto"
                  tabIndex={0}
                  aria-label="Search Amazon.in"
                  spellCheck="false"
                />
              </div>
              <div id="nav-iss-attach" />
            </div>
            <div classname="nav-right">
              <div classname="nav-search-submit nav-sprite">
                <span
                  id="nav-search-submit-text"
                  classname="nav-search-submit-text nav-sprite nav-progressive-attribute"
                  aria-label="Go"
                >
                  <input
                    id="nav-search-submit-button"
                    type="submit"
                    classname="nav-input nav-progressive-attribute"
                    defaultValue="Go"
                    tabIndex={0}
                  />
                </span>
              </div>
            </div>
          </form> */}

          {/* end search */}
          <div className="d-flex">
            <form className=" input-group">
              <select className="form-select" aria-label="Default select example">
                <option selected>Deals</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                {/* </option> */}
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

              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              <label className="form-label" htmlFor="form1" />
              <button className="btn btn-warning" type="submit"><i className="fa fa-search" /></button>


            </form>
          </div>
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
            {/* Admin Pannel */}
            <NavDropdown title="Admin Panel" id="nav-dropdown">
              {
                checkAdmin &&
                <>
                  <NavDropdown.Item eventKey="4.1"><Link to='/admin/dashboard'>Dashboard</Link></NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3"><Link to='/owner/about'>About Us</Link></NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4"><Link to='/admin/logout'>LogOut</Link></NavDropdown.Item>
                </>
              }
              {
                !checkAdmin &&
                <>
                  <NavDropdown.Item eventKey="4.3"><Link to='/admin/login'>Login</Link></NavDropdown.Item>
                </>
              }
              <NavDropdown.Divider />
            </NavDropdown>
            {/* Admin Pannel end */}
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