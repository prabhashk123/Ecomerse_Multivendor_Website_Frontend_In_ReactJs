function AdminLogout() {
    localStorage.removeItem('owner_login');
    localStorage.removeItem('owner_username');
    localStorage.removeItem('owner_id');
    window.location.href='/admin/login'
}
export default AdminLogout;