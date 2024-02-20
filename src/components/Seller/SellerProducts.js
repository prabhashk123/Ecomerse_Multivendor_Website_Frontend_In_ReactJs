import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SellerSidebar from './SellerSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function SellerProducts() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const [ProductData, setProductData] = useState([]);
    const vendor_id = localStorage.getItem('vendor_id')

    useEffect(() => {
        fetchdata(baseUrl + '/vendor-products/' + vendor_id + '/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data);
                // console.log(data);
            });
    }
    // console.log(ProductData);
    // For delete button
    function showConfirm(product_id) {
        var _confirm = window.confirm("Are you sure you want to delete this product?")
        if (_confirm) {
            fetch(baseUrl + '/product/' + product_id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status == 204) {
                        fetchdata(baseUrl + '/vendor-products/' + vendor_id + '/');
                    }

                });
        }
    }
    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <SellerSidebar />
                    </div>
                    <div className='col-md-9 col-12 mb-2 mt-3'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <td colSpan='7'>
                                            <Link to='/seller/addproduct' className='btn btn-primary'><i className='fa fa-plus-circle'></i> Add Product</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Prod_Id</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Usd Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ProductData.map((product, index) => {
                                            return <tr>
                                                <td>{index + 1}</td>
                                                <td>{product.id}</td>

                                                <td>
                                                    <Link to={`/seller/update-product/${product.id}`}>
                                                        <img src={`http://127.0.0.1:8000/${product.image}`} className="img-thumbnail" width='80' alt="..." />
                                                    </Link>
                                                    <Link className='text-decoration-none' to={`/seller/update-product/${product.id}`}>{product.title}</Link>
                                                </td>
                                                <td>&#8377;{product.price}</td>
                                                <td>${product.usd_price}</td>
                                                <td>
                                                    {
                                                        !product.publish_status && <span className='text-danger'>Pending</span>
                                                    }
                                                    {
                                                        product.publish_status && <span className='text-success'>Published</span>
                                                    }
                                                </td>
                                                <td width='19%'>
                                                    {/* <Link to='#' className='btn btn-info'>View</Link> */}
                                                    <Link to={`/seller/update-product/${product.id}`} className='btn btn-primary ms-1'>Edit</Link>
                                                    <button type='button' onClick={() => showConfirm(product.id)} className='btn btn-danger ms-1'>Delete</button>
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
export default SellerProducts;