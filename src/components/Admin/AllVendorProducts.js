import { Link } from 'react-router-dom';
// api data fetch from server in react  useState our data
import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Dropdown } from 'react-bootstrap';

function AllVendorProducts() {
    const configs=require('../Configs'); 
    const baseUrl=configs.URL;
    const [ProductData, setProductData] = useState([]);
 
    useEffect(() => {
        fetchdata(baseUrl + '/products');
    }, []);
// fetch api data
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data.results);
            });
    };
    // For delete products
    function showConfirm(product_id) {
        var _confirm = window.confirm("Are you sure you want to delete this product?")
        if (_confirm) {
            fetch(baseUrl + '/product/' + product_id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status == 204) {
                        fetchdata(baseUrl + '/products/');
                    }
                });
        }
    }
    // For Update Product Status
    function changeProductStatus(product_id, status) {
        fetch(baseUrl + '/product-modify/' + product_id + '/', {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'publish_status': status })
        })
            .then(function(response){
                if(response.status==200){
                fetchdata(baseUrl + '/products')
            }
            });
    }
    return (
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
                                    <th>Sl No.</th>
                                    <th>Vend_Id</th>
                                    <th>Prod_Id</th>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Usd_Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ProductData.map((product, index) => {
                                        return <tr>
                                            <td>{index + 1}</td>
                                            <td>{product.vendor}</td>
                                            <td>{product.id}</td>
                                            <td>
                                                <img src={product.image} className="img-thumbnail" width='80' alt="..." />
                                                <p>{product.title}</p></td>
                                            <td>&#8377;{product.price}</td>
                                            <td>${product.usd_price}</td>
                                            <td>
                                                {
                                                    product.publish_status && <span className='text-success'><i className='fa fa-check-circle'></i>Published</span>
                                                }
                                                {
                                                    !product.publish_status && <span className='text-danger'><i className='fa fa-spinner fa-spin  text-dark'></i>Pending</span>
                                                }
                                            </td>
                                            <td width='19%'>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Change Status
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            {
                                                                !product.publish_status &&  <a className='text-decoration-none text-success' href='#' onClick={() => changeProductStatus(product.id, true)}>Published</a>
                                                            }
                                                            {
                                                                product.publish_status &&  <a className='text-decoration-none text-danger' href='#' onClick={() => changeProductStatus(product.id, false)}>Pending</a>
                                                            }
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <Link to={`/product/${product.id}`} className='btn btn-info'>View</Link>
                                                {/* <Link to={`/seller/update-product/${product.id}`} className='btn btn-primary mt-1'>Edit</Link> */}
                                                <button type='button' onClick={() => showConfirm(product.id)} className='btn btn-danger mt-1 ms-2'>Delete</button>
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
    );
}
export default AllVendorProducts;
