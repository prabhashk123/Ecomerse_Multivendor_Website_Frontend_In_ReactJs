import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleRelatedProduct from './SingleRelatedProduct';
// For carousel
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
// context api
import { UserContext, CartContext, CurrencyContext } from './Context';
// for related product owl carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function ProductDetail() {
    // whole url pass in baseUrl
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    // product backend
    const [productData, setProductData] = useState([]);
    const [productImgs, setProductImgs] = useState([]);
    const [productTags, setproductTags] = useState([]);
    const [relatedproducts, setRelatedProducts] = useState([]);
    const { product_slug, product_id } = useParams();
    // add to cart
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState([false]);
    const { cartData, setCartData } = useContext(CartContext);
    // for currency
    const { CurrencyData } = useContext(CurrencyContext);
    // Use for wishList at login
    const userContext = useContext(UserContext);
    const [ProductInWishlist, setProductInWishlist] = useState(false);

    useEffect(() => {
        fetchdata(baseUrl + '/product/' + product_id);
        fetchRelatedData(baseUrl + '/related-products/' + product_id)
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
                    setcartButtonClickStatus(true)
                }
            });
        }
    }
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data);
                setProductImgs(data.product_imgs);
                setproductTags(data.tag_list);
            });
    }

    // For realted producta
    function fetchRelatedData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setRelatedProducts(data.results);
            });
    };
    //for tags not map use for loop make arrya
    const tagslinks = []
    for (let i = 0; i < productTags.length; i++) {
        // remove extra space use tram
        let tag = productTags[i].trim();
        tagslinks.push(<Link className='badge bg-secondary text-white me-1' to={`/products/${tag}`}>{tag}</Link>)
    }

    // for cart fuctionality two way once data is session and cookeies thane send to database
    const cartAddButtonHandler = () => {
        // for mutiple product
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        var cartData = {
            'product': {
                'id': productData.id,
                'title': productData.title,
                'price': productData.price,
                'usd_price': productData.usd_price,
                'image': productData.image,
            },
            'user': {
                'id': 1
            }
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
        let cartJson = JSON.parse(previousCart) || []; // Default to empty array
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
        console.log(productData);
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
    //  // function for total price
    // var sum = 0;
    // // if (cartItems > 0) {
    //     // productData.map((item, index) => {
    //         if (CurrencyData == 'inr' || CurrencyData == undefined) {
    //             sum += parseFloat(productData.price);

    //         } else if (CurrencyData == 'usd') {
    //             sum += parseFloat(productData.usd_price);
    //         }

    //     // });
    // // }

    return (
        <section className="container">
            <br/>
            {/* Carosel for 1 box */}
            <div className="row mt-5">
                <div className='col mb-4 mt-3'>
                    <Carousel className='carousel-dark' data-bs-theme="light">
                        {
                            productImgs.map((img, index) => {
                                if (index == 0) {
                                    return <Carousel.Item>
                                        <img src={img.image} className="img-thumbnail mb-5" alt={index} />
                                    </Carousel.Item>
                                }
                                else {
                                    return <Carousel.Item>
                                        <img src={img.image} className="img-thumbnail mb-5" alt="..." />
                                    </Carousel.Item>
                                }
                            })
                        }
                    </Carousel>
                </div>
                {/* Carosel end single box */}

                <div className="col-8">
                    <h3>{productData.title}</h3>
                    <p>{productData.detail}</p>
                    {
                        CurrencyData != 'usd' && <h5 className="card-title">Price : Rs. {productData.price}</h5>
                    }
                    {
                        CurrencyData == 'usd' && <h5 className="card-title">Price : $ {productData.usd_price}</h5>
                    }
                    {
                        productData.vendor && <p><strong>Seller : </strong><Link to={`/seller/${productData.vendor.user?.username}/${productData.vendor.id}`} className='text-decoration-none text-dark'>{productData.vendor.user?.first_name} {productData.vendor.user?.last_name}</Link></p>
                    }
                    <p className='mt-3'>
                        <Link title='Demo' to={productData.demo_url} target='_blank' className='btn btn-dark'><i className="fa-solid fa-circle-play"></i> Demo
                        </Link>
                        {!cartButtonClickStatus &&
                            <>
                                <button type='button' onClick={cartAddButtonHandler} title='Add to Cart' className='btn btn-success ms-1'><i className="fa-solid fa-cart-plus fa-1x"></i> Add to Cart</button>
                            </>
                        }
                        {cartButtonClickStatus &&
                            <>
                                <button type='button' onClick={cartRemoveButtonHandler} title='Remove to Cart' className='btn btn-secondary ms-1'><i className="fa-solid fa-cart-plus fa-1x"></i> Remove to Cart</button>
                            </>
                        }
                        {/* <Link title='Buy Now' to='/confirm-order' className='btn btn-warning ms-1'><i className="fa-solid fa-bag-shopping"></i>Buy Now</Link> */}
                        <button title='Buy Now' className='btn btn-warning ms-1'><i className="fa-solid fa-bag-shopping"></i> Buy Now</button>
                        {
                            (userContext && !ProductInWishlist) && <button onClick={saveInWishList} title='Add to Wishlist' className='btn btn-danger ms-1'><i className="fa fa-heart fa-1x"></i> Wishlist</button>
                        }
                        {
                            userContext == null && <button title='Add to Wishlist' className='btn btn-danger ms-1 disabled'><i className="fa fa-heart fa-1x"></i> Wishlist</button>
                        }
                        {
                            (userContext && ProductInWishlist) && <button title='Add to Wishlist' className='btn btn-danger ms-1 disabled'><i className="fa fa-heart fa-1x"></i> Wishlist</button>
                        }
                    </p>
                    <hr />
                    <div className='producttags mt-4'>
                        <h5>Tags..</h5>
                        <p>
                            {tagslinks}
                        </p>
                    </div>
                </div>
            </div>

            {/* Related_product for carousel */}
            {relatedproducts.length > 0 &&
                <>
                    <h3 className='mt-5 mb-3 text-center'>Related Products</h3>
                    <OwlCarousel className='owl-theme' items={4} loop margin={10}>
                        {
                            relatedproducts.map((product, index) => {
                                return <div class='item'>
                                    <SingleRelatedProduct product={product} />
                                </div>
                            })}
                    </OwlCarousel>

                    {/* <h3 className='mt-5 mb-3 text-center'>Related Products</h3>
                    <div className='col mb-4'>
                        <Carousel className='carousel-dark' data-bs-theme="light">
                            {
                                relatedproducts.map((product, index) => {
                                    if (index === 0) {
                                        return <Carousel.Item>
                                            <SingleRelatedProduct product={product} />
                                            <img src={logo} className="img-thumbnail mb-5" alt={index} />
                                        </Carousel.Item>
                                    }
                                    else {
                                        return <Carousel.Item>
                                            <SingleRelatedProduct product={product} />
                                        </Carousel.Item>
                                    }
                                })
                            }
                        </Carousel>
                    </div> */}
                </>
            }
            {/* Related product */}

        </section>
    );
}
export default ProductDetail;