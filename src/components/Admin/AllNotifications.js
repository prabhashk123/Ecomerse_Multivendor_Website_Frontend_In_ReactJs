import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';

function AllNotifications() {
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const [notificationList, setnotificationList] = useState([]);

    useEffect(() => {
        fetchdata(baseApiUrl + '/vendor/allnotificatons/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setnotificationList(data);
            });
    }
    // For delete message button
    function showConfirm(notification_id) {
        var _confirm = window.confirm("Are you sure you want to delete this message")
        if (_confirm) {
            fetch(baseApiUrl + '/vendor/allnotificaton/' + notification_id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status == 204) {
                        fetchdata(baseApiUrl + '/vendor/allnotificatons/');
                    }
                });
        }
    }

    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9 col-15 mb-2 mt-3'>
                        <h5 className='text-dark'>All Notifications</h5>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Subject</th>
                                        <th>Created</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        notificationList.map((item, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.notif_created_time}</td>
                                            <td width='8%'>
                                                <button onClick={() => showConfirm(item.id)} className='btn btn-danger btn-sm ms-1'>Delete</button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
export default AllNotifications;