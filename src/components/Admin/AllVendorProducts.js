// link SingleProduct.js
// import SingleProduct from '../SingleProduct';
import { Link } from 'react-router-dom';
// api data fetch from server in react  useState our data
import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Dropdown } from 'react-bootstrap';

function AllVendorProducts() {
    // whole url pass in baseUrl
    const baseUrl = 'http://127.0.0.1:8000/api';
    // product backend
    const [ProductData, setProductData] = useState([]);
    // Pagination
    const [totalResult, settotalResult] = useState(0);

    useEffect(() => {
        fetchdata(baseUrl + '/products');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data.results);
                settotalResult(data.count);
            });
    };

    // create link for pagination 
    // var links = [];
    // var limit=1;
    // var totalLinks=totalResult/limit;
    // for (let i = 1; i <= totalLinks; i++) {
    //     links.push(<li className="page-item"><Link className="page-link" onClick={()=>changeUrl(baseUrl+`/products/?page=${i}`)} to={`/products/?page=${i}`}>{i}</Link></li>)
    // };

    // function changeUrl(baseUrl) {
    //     // console.log(baseUrl);
    //     // setbaseUrl(baseUrl);
    //     fetchdata(baseUrl);

    // };
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

    return (
        // <section className='container mt-4'>
        //     <h3 className="mb-4">All Vendors Products</h3>
        //     <div className="row mb-4">

        //         {
        //             Products.map((product, index) => <SingleProduct key={index} product={product} />)
        //         }


        //     </div>

        //     <nav aria-label="Page navigation example">
        //         print {totalResult}
        //         <ul className="pagination">
        //             <li className="page-item">
        //                 <Link className="page-link" href="#" aria-label="Previous">
        //                     <span aria-hidden="true">&laquo;</span>
        //                 </Link>
        //             </li>
        //              {links} 
        //             <li className="page-item">
        //                 <Link class="page-link" href="#" aria-label="Next">
        //                     <span aria-hidden="true">&raquo;</span>
        //                 </Link>
        //             </li>
        //         </ul>
        //     </nav> 

        // </section>
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <AdminSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    {/* <h3><Link to='/seller/addproduct' className='btn btn-primary mb-2 float-end'><i className='fa fa-plus-circle'></i> Add Product</Link></h3> */}
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Vend_Id</th>
                                    <th>Prod_Id</th>
                                    <th>Vend_Name</th>
                                    <th>Vend_Username</th>
                                    <th>Vend_Email</th>
                                    <th>Vend_Mobile</th>
                                    <th>Product</th>
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
                                            <td>{product.id}</td>
                                            <td>Prabhash Kumar</td>
                                            <td>Vendoradmin</td>
                                            <td>vendor@gmail.com</td>
                                            <td>9570588189</td>
                                            <td><Link className='text-decoration-none' to={`/seller/update-product/${product.id}`}>{product.title}</Link></td>
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
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        Change Status
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            {
                                                                !product.publish_status && <span className='text-danger'>Approve</span>
                                                            }
                                                            {
                                                                product.publish_status && <span className='text-danger'>Reject</span>
                                                            }
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {/* <Link to='#' className='btn btn-info'>View</Link> */}
                                                <Link to={`/seller/update-product/${product.id}`} className='btn btn-primary mt-1'>Edit</Link>
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
