// link SingleProduct.js
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
// api data fetch from server in react  useState our data
import { useState, useEffect } from 'react';

function AllProducts() {

    // demo data
    // const products = [
    //     {
    //         'title': 'Python',
    //         'price': 200
    //     },
    //     {
    //         'title': 'Django',
    //         'price': 300
    //     },
    //     {
    //         'title': 'react',
    //         'price': 400
    //     },
    // ]
    // Dynamic data fetch

    // whole url pass in baseUrl
    const baseUrl = 'http://127.0.0.1:8000/api';
    // product backend
    const [Products, setProducts] = useState([]);
    // Pagination
    const [totalResult, settotalResult] = useState(0);
    // baseUrl no need directily pass
    // const [baseUrl, setbaseUrl] = useState(baseurl+"/products/")
    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/products/", { mode: 'cors' })
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data.results))
    // });
    // best use this
    //    Before rendering useeffect data

    useEffect(() => {
        fetchdata(baseUrl + '/products');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results);
                settotalResult(data.count);
            });
    };

    // create link for pagination 
    var links = [];
    var limit = 1;
    var totalLinks = totalResult / limit;
    for (let i = 1; i <= totalLinks; i++) {
        links.push(<li className="page-item"><Link className="page-link" onClick={() => changeUrl(baseUrl + `/products/?page=${i}`)} to={`/products/?page=${i}`}>{i}</Link></li>)
    };

    function changeUrl(baseUrl) {
        // console.log(baseUrl);
        // setbaseUrl(baseUrl);
        fetchdata(baseUrl);
    };
    
    return (
        <section className='container'>
            <br />
            <h3 className="mb-2 mt-5">All Products</h3>
            <div className="row mt-2">
                {/* Product box */}
                {/* map basicalliy iterate(loop) the data */}
                {/* Send single object */}
                {Products.filter(product => product.publish_status === true).map((product, index) => (
                    <SingleProduct key={index} product={product} />
                ))}
                {/* Product box  end*/}
            </div>
            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <Link className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                    </li>
                    {links}
                    <li className="page-item">
                        <Link class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Pagination end */}
        </section>


    );
}
export default AllProducts;
