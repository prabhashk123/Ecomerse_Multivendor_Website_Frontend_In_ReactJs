function SellerLogout() {
    localStorage.removeItem('vendor_login');
    localStorage.removeItem('vendor_username');
    localStorage.removeItem('vendor_id');
    window.location.href='/seller/login'
}
export default SellerLogout;