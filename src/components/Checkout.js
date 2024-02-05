// Package
import { Link } from 'react-router-dom';
// for coupan
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
// context
import { useContext } from 'react';
import { CartContext, CurrencyContext } from './Context';


function Checkout() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [allCoupanList, setallCoupanList] = useState([])
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState([false]);
    const { cartData, setCartData } = useContext(CartContext);
    const { CurrencyData } = useContext(CurrencyContext);

    if (cartData == null || cartData.length == 0) {
        var cartItems = 0;
    }
    else {
        var cartItems = cartData.length;
    }
    // function for total price
    var sum = 0;
    if (cartItems > 0) {
        cartData.map((item, index) => {
            if (CurrencyData == 'inr' || CurrencyData == undefined) {
                sum += parseFloat(item.product.price);

            } else if (CurrencyData == 'usd') {
                sum += parseFloat(item.product.usd_price);
            }

        });
    }
    // for coupan
    const inputHandler = (event) => {
    };
    useEffect(() => {
        fetchdata(baseUrl + '/coupan/');
    }, []);
    // fetch all coupan list
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setallCoupanList(data);
            });
    }

    // for remove item from cart
    const cartRemoveButtonHandler = (product_id) => {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart, index) => {
            if (cart != null && cart.product.id == product_id) {
                // delete cartJson[index]
                cartJson.splice(index, 1)
            }
        });
        var cartString = JSON.stringify(cartJson);
        localStorage.setItem('cartData', cartString)
        setcartButtonClickStatus(false)
        setCartData(cartJson)
    }

    return (
        <>
            <div className='container mt-4' >
                <h3 className="mb-4">All Items({cartItems})</h3>
                {cartItems != 0 &&
                    <div className='row'>
                        <div className='col-md-9 col-12'>
                            <div className='table-responsive'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Sr no.</th>
                                            <th>Products</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems &&
                                            cartData.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td><Link to={`/product/${item.product.slug}/${item.product.id}`}><img src={item.product.image} className="img-thumbnail" width='80' alt="..." /></Link>
                                                            <p><Link to={`/product/${item.product.slug}/${item.product.id}`} className='text-decoration-none'>{item.product.title}</Link></p>
                                                        </td>
                                                        {
                                                            (CurrencyData == 'inr' || CurrencyData == undefined) && <td>Rs. {item.product.price}</td>
                                                        }
                                                        {
                                                            CurrencyData == 'usd' && <td>$ {item.product.usd_price}</td>
                                                        }

                                                        <td>

                                                            <button type='button' onClick={() =>
                                                                cartRemoveButtonHandler(item.product.id)} title='Remove to Cart' className='btn btn-danger ms-1'><i className="fa-solid fa-cart-plus fa-1x"></i> Remove to Cart</button>

                                                        </td>
                                                    </tr>

                                                )
                                            })

                                        }

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Coupans</th>
                                            <th style={{ width: 210 }}>
                                                <Form className='text-light'>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Select name='code' onChange={inputHandler} aria-label="Default select example">
                                                            <option selected>Select Coupan code</option>
                                                            {
                                                                allCoupanList.map((item, index) => <option selected={item.id == allCoupanList.code} value={item.id}>{item.code}</option>)
                                                            }
                                                            <Form.Control type="select" id='code' />
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Form>
                                            </th>
                                            <td>Rs.-100</td>
                                            <th><button type='button' className='btn text-white btn-sm btn-success btn-outline-none'>Apply Coupan</button></th>
                                        </tr>
                                        <tr>
                                            <th>Total Items<span className='text-success'> ({cartData.length})</span></th>
                                            <th>Total Price</th>
                                            {
                                                (CurrencyData == 'inr' || CurrencyData == undefined) && <th>Rs. {sum}</th>
                                            }
                                            {
                                                CurrencyData == 'usd' && <th>$ {sum}</th>
                                            }
                                            <th><Link to='/products' className='btn btn-sm btn-primary'><i className='fa fa-plus-circle'></i> Add more items</Link></th>
                                        </tr>
                                        <tr>
                                            <td colSpan='4' align='center'>
                                                <Link to='/' className='btn btn-primary mt-2 border-solid'>Continue Shopping</Link>
                                                <Link to='/confirm-order' className='btn btn-success mt-2 ms-1 broder-solid'>Proceed</Link>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                }
                {cartItems == 0 &&
                    <>
                        <p>Your CartItems is Empty! Please Go On Click Continue Shopping Thane Add to Cart Your Products.Thank You. </p>
                        <Link to='/' className='btn btn-primary mt-2 border-solid'>Continue Shopping</Link>
                    </>
                }
            </div>
        </>
    );
}
export default Checkout;