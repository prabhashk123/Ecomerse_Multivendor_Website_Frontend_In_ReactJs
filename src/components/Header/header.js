//for not full page reloads use useNavgate redirect page
import { Link, useNavigate } from "react-router-dom";
// css for header navbar
import '../Styles/header.css';
// reactbootstrap dropdown
import NavDropdown from 'react-bootstrap/NavDropdown';
// for context api data send inside component
import { useContext, useState } from "react";
import { UserContext, CartContext, CurrencyContext } from "../Context";

function Header(props) {
  const { cartData, setCartData } = useContext(CartContext);
  const { CurrencyData, setCurrencyData } = useContext(CurrencyContext);
  // for not reload full page use for redirect path
  const navigate = useNavigate();
  // for product search
  const [searchProductString, setsearchProductString] = useState({
    'search': ""
  });
  // For seller/vendor Panel
  const checkVendor = localStorage.getItem('vendor_login');
  const vendor_username = localStorage.getItem('vendor_username');
  // customer panel
  const userContext = useContext(UserContext);
  const customer_username = localStorage.getItem('customer_username');
  // for Admin Panel
  const checkAdmin = localStorage.getItem('owner_login');
  const owner_username = localStorage.getItem('owner_username');
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
  // handle input search change
  const inputSearchHandler = (event) => {
    setsearchProductString({
      ...searchProductString,
      [event.target.name]: event.target.value
    });
  };
  // search functionlaity for products
  const searchProduct = () => {
    if (searchProductString.search !== '') {
      navigate('/search/' + searchProductString.search)
      // console.log(searchProductString.search)
    }
    // Check if the selected option is "All Categories".
    const selectedCategory = document.querySelector('.form-select').value;
    if (selectedCategory === 'search-alias=alc' && searchProductString.search === '' ) {
      navigate('/categories')
    }
    const selectedProducts = document.querySelector('.form-select').value;
    if (selectedProducts === 'search-alias=alp' && searchProductString.search === '' ) {
      // redirected by whole page
      // window.location.href = '/products'
      // use navigate to redirect page without all page reloading
      navigate('/products')
    }
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
              <form className="input-group">
                <select style={Style} className="form-select" aria-label="Default select example">
                  <option selected>Deals</option>
                  <option value="search-alias=alc">All Categories</option>
                  <option value="search-alias=alexa-laptops">Laptops</option>
                  <option value="search-alias=mobiles">Mobiles</option>
                  <option value="search-alias=electronic">Electronic</option>
                  <option value="search-alias=watchs">Watchs</option>
                  <option value="search-alias=blancket">Blanket</option>
                  <option value="search-alias=shoes">Shoes</option>
                  <option value="search-alias=books">Books</option>
                  <option value="search-alias=kitchens">Home & kitchens</option>
                  <option value="search-alias=alp">All products</option>
                  <option value="search-alias=mixe">Mixer & Grinder</option>
                  <option value="search-alias=alexa-stovekraft">Stovekraft</option>
                  <option value="search-alias=iron">Iron</option>
                  <option value="search-alias=sneakers">Sneakers shoes</option>
                  <option value="search-alias=prabhash">Prabhash</option>
                  <option value="search-alias=dell">Dell-Inspiron-3000</option>
                </select>
                <input className="form-control w-50" name="search" id="search" onChange={inputSearchHandler} type="search" placeholder="Search in website" aria-label="Search" />
                <label className="form-label" htmlFor="form1" />
                <button onClick={searchProduct} className="btn btn-warning" type="button"><i className="fa fa-search" /></button>
              </form>
            </div>
            {/* end search bar */}
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
              {
                vendor_username ?
                  <NavDropdown title={vendor_username} id="nav-dropdown">
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
                  </NavDropdown> :
                  <NavDropdown title='Vendor Panel' id="nav-dropdown">
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
              }
              {/* Customer Pannel */}
              {customer_username ?
                <NavDropdown title={customer_username} id="nav-dropdown">
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
                </NavDropdown> :
                <NavDropdown title="Account" id="nav-dropdown">
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
              }
              {/* Admin Pannel */}
              {
                owner_username ?
                  <NavDropdown title={owner_username} id="nav-dropdown">
                    {
                      checkAdmin ?
                        <>
                          <NavDropdown.Item eventKey="4.1"><Link className='text-decoration-none' to='/admin/dashboard'>Dashboard</Link></NavDropdown.Item>
                          <NavDropdown.Item eventKey="4.4"><Link className='text-decoration-none' to='/admin/logout'>LogOut</Link></NavDropdown.Item>
                        </>
                        // '?' means if  and ':' means else and '&&' this means only a particular statement is shown
                        :
                        <>
                          <NavDropdown.Item eventKey="4.3"><Link className='text-decoration-none' to='/admin/login'>Login</Link></NavDropdown.Item>
                        </>
                    }
                    <NavDropdown.Divider />
                  </NavDropdown> :
                  <NavDropdown title='Admin Panel' id="nav-dropdown">
                    {
                      checkAdmin ?
                        <>
                          <NavDropdown.Item eventKey="4.1"><Link className='text-decoration-none' to='/admin/dashboard'>Dashboard</Link></NavDropdown.Item>
                          <NavDropdown.Item eventKey="4.4"><Link className='text-decoration-none' to='/admin/logout'>LogOut</Link></NavDropdown.Item>
                        </>
                        // '?' means if  and ':' means else and '&&' this means only a particular statement is shown
                        :
                        <>
                          <NavDropdown.Item eventKey="4.3"><Link className='text-decoration-none' to='/admin/login'>Login</Link></NavDropdown.Item>
                        </>
                    }
                    <NavDropdown.Divider />
                  </NavDropdown>
              }
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
                <NavDropdown.Item eventKey="4.1"><Link className='text-decoration-none' to='/contact'>ContactUs</Link></NavDropdown.Item>
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