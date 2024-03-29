import logo from '../logo.svg'
// link SingleProduct.js
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';
// dunemic data
import { useParams } from "react-router-dom";


function TagProducts() {
    // whole url pass in baseUrl
    const configs=require('./Configs'); 
    const baseUrl=configs.URL;
    // product backend
    const [Products, setProducts] = useState([]);
    // Pagination
    const [totalResult, settotalResult] = useState(0);
    const {tag}=useParams()
    

    useEffect(() => {
        fetchdata(baseUrl + '/products/'+tag);
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
        links.push(<li className="page-item"><Link className="page-link" onClick={() => changeUrl(baseUrl + `/products/${tag}/?page=${i}`)} to={`/products/${tag}/?page=${i}`}>{i}</Link></li>)
    };

    function changeUrl(baseUrl) {
        fetchdata(baseUrl);

    };
    return (
        <section className='container mt-4'>
            <h3 className="mb-4">All Products</h3>
            <div className="row mb-4">
                {
                    Products.map((product, index) => <SingleProduct key={index} product={product} />)
                }
            </div>
            {/* Pagination */}
            <nav aria-label="Page navigation example">
                {/*print {totalResult} */}
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
export default TagProducts;