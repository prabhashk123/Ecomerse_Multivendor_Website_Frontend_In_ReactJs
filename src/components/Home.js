import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Singleproduct
import SingleProduct from './SingleProduct';
// For testimonial rating and reviews
import Testimonial from './Testimonial';
import { Carousel } from 'react-bootstrap';
import SingleSeller from './Seller/SingleSeller';
// for category slider
import SquareImageSlider from './Admin/SinglieCategorySlider';

function Home(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const baseImgUrl='http://127.0.0.1:8000';
    const [products, setProducts] = useState([]);
    // const [ReviewsList, setReviewsList] = useState([]);
    const [VendorList, setVendorList] = useState([]);
    const [PopularProductsList, setPopularProductsList] = useState([]);
    const [PopularCategoryList, setPopularCategoryList] = useState([])
    useEffect(() => {
        // but needs four products so set limits
        fetchdata(baseUrl + '/products/?fetch_limit=4');
        // fetchTestimonialData(baseUrl + '/productrating/');
        fetchPopulerVendors(baseUrl + '/vendors/?fetch_limit=4');
        fetchPopulerProducts(baseUrl + '/products/?fetch_popular_products_limit=4');
        fetchPopulerCategories(baseUrl + '/categories/?fetch_popular_category_limit=4');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results);
            });
    };
    // for rating
    // function fetchTestimonialData(baseUrl) {
    //     fetch(baseUrl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setReviewsList(data);
    //             // console.log(data);
    //         });
    // }
    // for populer vendors
    function fetchPopulerVendors(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setVendorList(data);
                // console.log(data);
            });
    }
    // For Popular Products
    function fetchPopulerProducts(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setPopularProductsList(data.results);
                // console.log(data);
            });
    }
    // For Popular Categories
    function fetchPopulerCategories(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setPopularCategoryList(data);
                // console.log(data);
            });
    }
    // style for image
    const imgStyle = {
        width: '100%',
        height: '10vw',
        objectFit: 'contain'
    };
    return (
        <>
            {/* For category added in slider */}
            <div className='cat-img mt-4' id='cat-img'>
                {/* <br/> */}
                <SquareImageSlider alt='Prabhash' />
            </div>
            {/* end category slider */}
            <main className="mt-3">
                <div className="container">
                    {/* Latest Product */}
                    <h3 className="mb-2">Latest Products<Link className='float-end btn btn-dark' to="/products">View all Latest Products
                        <i class="fa-solid fa-arrow-right-long"></i></Link></h3>
                    <div className="row">
                        {/* Product box */}
                        {
                            products.map((product, index) => <SingleProduct key={index} product={product} />)
                        }
                        {/* Product box end */}

                    </div>
                    {/* Latest Product end */}

                    {/* Popular catogries */}
                    <h3 className="mb-3">Popular Categories<Link className='float-end btn btn-dark' to="/categories">View all Popular Cateogries
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </Link></h3>
                    <div className="row mb-3">
                        {/* not define single category component then define div */}
                        {
                            PopularCategoryList.map((category) => <div className="col-12 col-md-3 mb-4">
                                <div className="card">
                                    <Link to={`/category/${category.title}/${category.id}`}>
                                        <img src={`${baseImgUrl}/${category.cat_img}`} style={imgStyle} className="card-img-top" alt={category.title} />
                                    </Link>
                                    <div className="card-body">
                                        <h4 className="card-title"><h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`}>{category.title}</Link></h4></h4>
                                        <h5 className="card-title text-muted">Desc: {category.detail}</h5>
                                    </div>
                                    <div className="card-footer">
                                        Product Downloads: {category.totala_downloads}
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    {/* Popular categories end */}

                    {/* Popular Product */}
                    <h3 className="mb-3">Popular Products<Link className='float-end btn btn-dark' to="/products">View all Popular Products<i class="fa-solid fa-arrow-right-long"></i></Link></h3>
                    <div className="row mb-3">
                        {
                            PopularProductsList.map((product, index) => <SingleProduct key={index} product={product} />)
                        }
                    </div>
                    {/* Popular Product end */}

                    {/* Popular Sellers */}
                    <h3 className="mb-3">Popular Sellers<Link className='float-end btn btn-dark' to="/sellers">View all Popular Sellers
                        <i class="fa-solid fa-arrow-right-long"></i></Link></h3>
                    <div className="row mb-3">
                        {
                            VendorList.map((vendor) => <SingleSeller seller={vendor} />)
                        }
                    </div>
                    {/* Popular Sellers end */}

                    {/* Rating and Reviews */}
                    {/* <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <figure className="text-center">
                                    <blockquote className="blockquote">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        <i className='fa fa-star text-warning'></i>
                                        <i className='fa fa-star text-warning'></i>
                                        <cite title="Source Title">Customer Name</cite>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="carousel-item">
                                <figure className="text-center">
                                    <blockquote className="blockquote">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        <i className='fa fa-star text-warning'></i>
                                        <i className='fa fa-star text-warning'></i>
                                        <i className='fa fa-star text-warning'></i>
                                        <cite title="Source Title">Customer Name</cite>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="carousel-item">
                                <figure className="text-center">
                                    <blockquote className="blockquote">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        <i className='fa fa-star text-warning'></i>
                                        <i className='fa fa-star text-warning'></i>
                                        <i className='fa fa-star text-warning'></i>
                                        <i className='fa fa-star text-warning'></i>
                                        <cite title="Source Title">Customer Name</cite>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div> */}
                    <div className="container carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="true">
                        <div className='row'>
                            {/* {
                                ReviewsList.map((item, index) => <Testimonial index={index} item={item} />)
                            } */}
                            <Testimonial/>

                        </div>
                    </div>
                    {/* Carousel for Rating and Reviews end */}
                </div>
            </main>
        </>
    );
}
export default Home;