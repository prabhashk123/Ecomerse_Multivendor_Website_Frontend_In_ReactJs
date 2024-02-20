import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function AdminCategory() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const [CategoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchdata(baseUrl + '/categories/')
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data);
                // console.log(data);
            });
    }
    // console.log(ProductData);
    // For delete button
    function showConfirm(category_id) {
        var _confirm = window.confirm("Are you sure you want to delete this category?")
        if (_confirm) {
            fetch(baseUrl + '/category/' + category_id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status == 204) {
                        fetchdata(baseUrl + '/categories/')
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
                    <div className='col-md-9 col-12 mb-2 mt-3'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <td colSpan='6'>
                                            <Link to='/admin/addcategory' className='btn btn-primary'><i className='fa fa-plus-circle'></i> Add Category</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Cat_Id</th>
                                        <th>Category</th>
                                        <th>Detail</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        CategoryData.map((category, index) => {
                                            return <tr>
                                                <td>{index + 1}</td>
                                                <td>{category.id}</td>
                                                <td>
                                                    <Link to={`/admin/update-category/${category.id}`}>
                                                        <img src={`http://127.0.0.1:8000/${category.cat_img}`} className="img-thumbnail" width='80' alt="..." />
                                                    </Link>
                                                    <Link className='text-decoration-none' to={`/admin/update-category/${category.id}`}>{category.title}</Link>
                                                </td>
                                                <td>{category.detail}</td>
                                                <td width='26%'>
                                                    <Link to='/categories' className='btn btn-info'>View</Link>
                                                    <Link to={`/admin/update-category/${category.id}`} className='btn btn-primary ms-1'>Edit</Link>
                                                    <button type='button' onClick={() => showConfirm(category.id)} className='btn btn-danger ms-1'>Delete</button>

                                                </td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
}
export default AdminCategory;