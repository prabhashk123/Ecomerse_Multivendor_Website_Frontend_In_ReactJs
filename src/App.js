// import logo from './logo.svg';
// import './App.css';

// for bootstrap
import 'bootstrap/dist/css/bootstrap.css';
// Website
// link header
import Header from './components/Header/header';
// linked home
import Home from './components/Home';
// linked Footer
import Footer from './components/Footer/footer';
// lonked categories
import Categories from './components/Categories';
// roter
import { Routes, Route } from 'react-router-dom';
// Category Product
import CategoryProducts from './components/CategoryProducts';
// Tags
import TagProducts from './components/TagProducts';
// All Products
import AllProducts from './components/AllProducts';
// ProductDetail
import ProductDetail from './components/ProductDetail';
// Checkout
import Checkout from './components/Checkout';
import ConfirmOrder from './components/ConfirmOrder';
import OrderSuccess from './components/OrderSuccess';
import OrderFaliure from './components/OrderFaliure';
// Customer pannel
import Register from './components/Customer/Register';
import Login from './components/Customer/Login';
import Dashboard from './components/Customer/Dashboard';
import Logout from './components/Customer/Logout';
import Oders from './components/Customer/Orders';
import Wishlist from './components/Customer/Wishlist';
import ChangePassword from './components/Customer/ChangePassword';
import Profile from './components/Customer/Profile';
import AddressList from './components/Customer/AddressList';
import AddAddress from './components/Customer/AddAddress';
import AddReview from './components/Customer/AddReview';
import UpdateAddress from './components/Customer/UpdateAddress';
import AllCustomer from './components/Admin/AllCustomer';
// Admin Pannel
import AdminDashboard from './components/Admin/AdminDashboard';
import AboutUs from './components/Admin/AboutUs';
import AdminLogin from './components/Admin/AdminLogin';
import AdminLogout from './components/Admin/AdminLogout';
import AdminCategory from './components/Admin/AdminCategory';
import AddCategory from './components/Admin/AddCategory';
import UpdateCategory from './components/Admin/UpdateCategory';
import AllVendorProducts from './components/Admin/AllVendorProducts';
import AllCustomersOrders from './components/Admin/AllCustomersOrders';
import AllVendors from './components/Admin/AllVendors';
import AllReports from './components/Admin/AllReports';
// Seller/Vendor Pannel
import AllSellers from './components/AllSellers';
import SellerDetail from './components/Seller/SellerDetail';
import SellerRegister from './components/Seller/SellerRegister';
import SellerLogin from './components/Seller/SellerLogin';
import SellerLogout from './components/Seller/SellerLogout';
import SellerDashboard from './components/Seller/SellerDashboard';
import SellerProducts from './components/Seller/SellerProducts';
import AddProduct from './components/Seller/AddProduct';
import UpdateProduct from './components/Seller/UpdateProduct';
import VendorOders from './components/Seller/VendorOders';
import Customer from './components/Seller/Customer';
import CustomerOders from './components/Seller/CustomerOrder';
import Reports from './components/Seller/Reports';
import DailyReports from './components/Seller/DailyReports';
import MonthlyReports from './components/Seller/MonthlyReport';
import YearlyReports from './components/Seller/YearlyReport';
import VendorProfile from './components/Seller/VendorProfile';
import VendorChangePassword from './components/Seller/VendorChangePassword';
// Context Api without data pass props
import { CartContext, CurrencyContext } from './components/Context';
import { useState } from 'react';
const checkCart = localStorage.getItem('cartData');
const currentCurrency = localStorage.getItem('currency');

function App() {
  const [cartData, setCartData] = useState(JSON.parse(checkCart));
  const [CurrencyData, setCurrencyData] = useState(currentCurrency);

  return (
    <CurrencyContext.Provider value={{ CurrencyData, setCurrencyData }}>
      <CartContext.Provider value={{ cartData, setCartData }}>
        <Header />
        <Routes>
          {/* Admin Panel */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/owner/about' element={<AboutUs />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/logout' element={<AdminLogout />} />
          <Route path='/admin/category' element={<AdminCategory />} />
          <Route path='/admin/addcategory' element={<AddCategory />} />
          <Route path='/admin/update-category/:category_id' element={<UpdateCategory />} />
          <Route path='admin/allvendorproducts' element={<AllVendorProducts />} />
          <Route path='/admin/allcustomersorders' element={<AllCustomersOrders />} />
          <Route path='/admin/allcustomers' element={<AllCustomer />} />
          <Route path='/admin/allvendors' element={<AllVendors />} />
          <Route path='/admin/allreports' element={<AllReports />} />
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/category/:category_slug/:category_id' element={<CategoryProducts />} />
          <Route path='/products/:tag' element={<TagProducts />} />
          <Route path='/product/:product_slug/:product_id' element={<ProductDetail />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/confirm-order' element={<ConfirmOrder />} />
          {/* Customer Panel */}
          <Route path='/order/success' element={<OrderSuccess />} />
          <Route path='/order/faliure' element={<OrderFaliure />} />
          <Route path='/customer/register' element={<Register />} />
          <Route path='/customer/login' element={<Login />} />
          <Route path='/customer/dashboard' element={<Dashboard />} />
          <Route path='/customer/orders' element={<Oders />} />
          <Route path='/customer/wishlist' element={<Wishlist />} />
          <Route path='/customer/profile' element={<Profile />} />
          <Route path='/customer/changepassword' element={<ChangePassword />} />
          <Route path='/customer/addresses' element={<AddressList />} />
          <Route path='/customer/add_address' element={<AddAddress />} />
          <Route path='/customer/add-review/:product_id' element={<AddReview />} />
          <Route path='/customer/update-address/:address_id' element={<UpdateAddress />} />
          <Route path='/customer/logout' element={<Logout />} />
          {/* Seller/Vendor Panel*/}
          <Route path='/sellers' element={<AllSellers />} />
          <Route path='/seller/:seller_username/:seller_id' element={<SellerDetail/>} />
          <Route path='/seller/login' element={<SellerLogin />} />
          <Route path='/seller/logout' element={<SellerLogout />} />
          <Route path='/seller/register' element={<SellerRegister />} />
          <Route path='/seller/dashboard' element={<SellerDashboard />} />
          <Route path='/seller/products' element={<SellerProducts />} />
          <Route path='/seller/addproduct' element={<AddProduct />} />
          <Route path='/seller/update-product/:product_id' element={<UpdateProduct />} />
          <Route path='/seller/vendoroders' element={<VendorOders />} />
          <Route path='/seller/customers' element={<Customer />} />
          <Route path='/seller/customer/:customer_id/orderitems' element={<CustomerOders />} />
          <Route path='/seller/reports' element={<Reports />} />
          <Route path='/seller/daily-report' element={<DailyReports />} />
          <Route path='/seller/monthly-report' element={<MonthlyReports />} />
          <Route path='/seller/yearly-report' element={<YearlyReports />} />
          <Route path='/seller/vendorprofile' element={<VendorProfile />} />
          <Route path='/seller/vendorchangepassword' element={<VendorChangePassword />} />
        </Routes>
        <Footer />

      </CartContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
