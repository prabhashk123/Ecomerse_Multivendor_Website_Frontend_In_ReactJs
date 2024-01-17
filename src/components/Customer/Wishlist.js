import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CurrencyContext } from '../Context';
import axios from 'axios';



function Wishlist() {

    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const baseUrl = 'http://127.0.0.1:8000';
    const customerId = localStorage.getItem('customer_id');
    const [WishItems, setWishItems] = useState([]);
    const { CurrencyData } = useContext(CurrencyContext);


    useEffect(() => {
        fetchdata(baseApiUrl + '/customer/' + customerId + '/wishitems/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setWishItems(data);
                // console.log(data);
            });
    }

    // For Remove From WishList
    function removeFromWishList(wishList_id) {
        const formData = new FormData()
        formData.append('wishlist_id', wishList_id);
        // Submit Data
        axios.post(baseApiUrl + '/remove-from-wishlist/', formData)
            .then(function (response) {
                if (response.data.bool == true) {
                    document.getElementById('row' + wishList_id).remove();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9 col-12 mb-3'>
                        <div className='row'>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Products</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            WishItems.map((item, index) => {
                                                return <tr id={`row${item.id}`}>
                                                    <td>{index + 1}</td>
                                                    <td><Link><img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width='80' alt="..." /></Link>
                                                        <p><Link>{item.product.title}</Link></p>
                                                    </td>
                                                    {
                                                        CurrencyData != 'usd' && <td>Rs. {item.product.price}</td>
                                                    }
                                                    {
                                                        CurrencyData == 'usd' && <td>${item.product.usd_price}</td>
                                                    }

                                                    <td><button className='btn btn-danger btn-sm' onClick={() => removeFromWishList(item.id)}>Remove</button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                    {/* <tfoot>
                        <tr>
                            <th>Total Items</th>
                            <th>Total Price</th>
                            <th>Rs. 2000</th>
                        </tr>
                        <tr>
                            <td colSpan='3' align='center'>
                                <Link to='/categories' className='btn btn-primary mt-2 border-solid'>Continue Shopping</Link>
                                <Link to="#" className='btn btn-success mt-2 ms-1 broder-solid'>Proceed to Payment</Link>
                            </td>
                        </tr>
                    </tfoot> */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default Wishlist;