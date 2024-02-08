// Package
import { Link } from 'react-router-dom';
// for coupan
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
// context
import { useContext } from 'react';
import { CartContext, CurrencyContext } from './Context';

function Checkout() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [couponCode, setcouponCode] = useState([])
    const [discountValue, setdiscountValue] = useState('')
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
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
    // function for total price without coupon
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
    // for coupan function
    const inputHandler = (event) => {
        setcouponCode({
            ...couponCode,
            [event.target.name]: event.target.value
        });
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
    // submit coupon data send server
    const submitHandler = () => {
        if (couponCode.code == null) {
            setErrorMsg("Please select your coupon code here.");
            setSuccessMsg("");
            return;
        }
        const couponData = new FormData();
        couponData.append('code', couponCode.code);
        // submit data form
        axios.post(baseUrl + '/apply-coupon/', couponData)
            .then(function (response) {
                console.log(response)
                if (response.data.discount) {
                    const { discount_value } = response.data;
                    setdiscountValue(discount_value)
                    setcouponCode({
                        'code': '',
                    });
                    setErrorMsg('');
                    setSuccessMsg('coupon applied successfully!!');
                }
                else {
                    setSuccessMsg('');
                    setErrorMsg(response.data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // caculate total price if coupon exists
    const total = sum - discountValue
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
            <div className='container mt-5' >
                <br />
                <h3 className="mb-4">All Items({cartItems})</h3>
                {SuccessMsg && <p className='container text-success'><strong>{SuccessMsg}</strong></p>}
                {ErrorMsg && <p className='container text-danger'><strong>{ErrorMsg}</strong> </p>}
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
                                                                allCoupanList.map((item, index) => <option key={index} selected={item.id == allCoupanList.code} value={item.code}>{item.code}</option>)
                                                            }
                                                            <Form.Control type="select" id='code' />
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Form>
                                            </th>
                                            <td>
                                                {
                                                    (CurrencyData == 'inr' || CurrencyData == undefined) && <td>Rs. - {discountValue}</td>
                                                }
                                                {
                                                    CurrencyData == 'usd' && <td>$ - {discountValue}</td>
                                                }
                                            </td>
                                            <th><button type='button' onClick={submitHandler} className='btn text-white btn-sm btn-success btn-outline-none'>Apply Coupan</button></th>
                                        </tr>
                                        {/* <tr>
                                            <th>Total Items<span className='text-success'> ({cartData.length})</span></th>
                                            <th>Total Price</th>
                                            {
                                                (CurrencyData == 'inr' || CurrencyData == undefined) && <th>Rs. {sum}</th>
                                            }
                                            {
                                                CurrencyData == 'usd' && <th>$ {sum}</th>
                                            }

                                            <th><Link to='/products' className='btn btn-sm btn-primary'><i className='fa fa-plus-circle'></i> Add more items</Link></th>
                                        </tr> */}
                                        {
                                            !discountValue &&
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
                                        }
                                        {
                                            discountValue &&
                                            <tr>
                                                <th>Total Items<span className='text-success'> ({cartData.length})</span></th>
                                                <th>Total Price</th>
                                                {
                                                    (CurrencyData == 'inr' || CurrencyData == undefined) && <th>Rs. {total}</th>
                                                }
                                                {
                                                    CurrencyData == 'usd' && <th>$ {total}</th>
                                                }
                                                <th><Link to='/products' className='btn btn-sm btn-primary'><i className='fa fa-plus-circle'></i> Add more items</Link></th>
                                            </tr>
                                        }
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