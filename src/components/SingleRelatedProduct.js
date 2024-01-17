// Package
import { Link } from 'react-router-dom';
import logo from '../logo.svg'
// for context api 
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CurrencyContext, CartContext, UserContext } from './Context';

// props means property
function SingleRelatedProduct(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ProductInWishlist, setProductInWishlist] = useState(false);
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState([false]);
    const { cartData, setCartData } = useContext(CartContext);
    const { CurrencyData } = useContext(CurrencyContext);
    // Use for wishList at login
    const userContext = useContext(UserContext);
    if (!props.product.image) {
        props.product.image = logo;
    }
    // style for image
    const imgStyle = {
        width: '100%',
        height: '10vw',
        objectFit: 'contain'
    };
    const product_id = props.product.id
    const productData = props.product
    // for cart and wishlist
    useEffect(() => {
        checkProductInCart(product_id);
        checkProductInWishlist(baseUrl + '/check-in-wishlist/', product_id);
    }, []);
    // check function cart
    function checkProductInCart(product_id) {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        if (cartJson != null) {
            cartJson.map((cart) => {
                if (cart != null && cart.product.id == product_id) {
                    setcartButtonClickStatus(true);
                }
            });
        }
    }
    // for cart fuctionality two way once data is session and cookeies thane send to database
    const cartAddButtonHandler = () => {
        // for mutiple product
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        var cartData = {
            'product': {
                'id': props.product.id,
                'title': props.product.title,
                'price': props.product.price,
                'usd_price': props.product.usd_price,
                'image': props.product.image,
            },
            'user': {
                'id': 1
            },
            'total_amount': 10
        }

        // add cart data in local storage take only string so convert json to str
        if (cartJson != null) {
            cartJson.push(cartData);
            var cartString = JSON.stringify(cartJson);
            localStorage.setItem('cartData', cartString)
            setCartData(cartJson);
        } else {
            var newCartList = []
            newCartList.push(cartData)
            var cartString = JSON.stringify(newCartList);
            localStorage.setItem('cartData', cartString)
        }
        setcartButtonClickStatus(true)
    }
    const cartRemoveButtonHandler = () => {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart, index) => {
            if (cart != null && cart.product.id == productData.id) {
                // delete cartJson[index]
                cartJson.splice(index, 1)
            }
        });
        var cartString = JSON.stringify(cartJson);
        localStorage.setItem('cartData', cartString)
        setcartButtonClickStatus(false)
        setCartData(cartJson)
    }
    // For save in WishList
    function saveInWishList() {
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData()
        formData.append('customer', customerId);
        formData.append('product', productData.id);

        // Submit Data
        axios.post(baseUrl + '/wishlist/', formData)
            .then(function (response) {
                if (response.data.id) {
                    setProductInWishlist(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // Check in Wishlist
    function checkProductInWishlist(baseUrl, product_id) {
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData()
        formData.append('customer', customerId);
        formData.append('product', product_id);

        // Submit Data
        axios.post(baseUrl, formData)
            .then(function (response) {
                if (response.data.bool == true) {
                    setProductInWishlist(true);
                } else {
                    setProductInWishlist(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
           
                {/* Product box */}
                <div className="card">
                    <Link to={`/product/${props.product.slug}/${props.product.id}`}><img src={props.product.image} className="card-img-top" style={imgStyle} alt="..." /></Link>
                    <div className="card-body">
                        <Link to={`/product/${props.product.slug}/${props.product.id}`}><h4 className="card-title">{props.product.title}</h4></Link>
                        {
                            CurrencyData != 'usd' && <h5 className="card-title text-muted">Price : Rs. {props.product.price}</h5>
                        }
                        {
                            CurrencyData == 'usd' && <h5 className="card-title text-muted">Price : $ {props.product.usd_price}</h5>
                        }

                    </div>

                    <div className="card-footer">
                        {!cartButtonClickStatus &&
                            <>
                                <button type='button' onClick={cartAddButtonHandler} title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus fa-1x"></i></button>
                            </>
                        }
                        {cartButtonClickStatus &&
                            <>
                                <button type='button' onClick={cartRemoveButtonHandler} title='Remove to Cart' className='btn btn-warning btn-sm'><i className="fa-solid fa-cart-plus fa-1x"></i></button>
                            </>
                        }
                        {/* <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-plus fa-1x"></i></button> */}
                        {
                            (userContext && !ProductInWishlist) && <button onClick={saveInWishList} title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart fa-1x"></i></button>
                        }
                        {
                            userContext == null && <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1 disabled'><i className="fa fa-heart fa-1x"></i></button>
                        }
                        {
                            (userContext && ProductInWishlist) && <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1 disabled'><i className="fa fa-heart fa-1x"></i></button>
                        }
                        {/* <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart fa-1x"></i></button> */}
                    </div>
                </div>
            {/* Product box end */}
        </>
    );
}
export default SingleRelatedProduct;