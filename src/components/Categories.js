// import logo from '../logo.svg';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function Categories() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const baseImgUrl='http://127.0.0.1:8000'
    const [categories, setCategories] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    useEffect(() => {
        fetchdata(baseUrl + '/categories');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
                // settotalResult(data);
                // console.log(data);
            });
    };
    // style for image
    const imgStyle = {
        width: '100%',
        height: '10vw',
        objectFit: 'contain'
    };
    // pagination
    // function changeUrl(baseUrl) {
    //     fetchdata(baseUrl);
    // };
    // var links = [];
    // var limit=1;
    // var totalLinks=totalResult/limit;
    // for (let i=1; i<=totalLinks; i++) {
    //     links.push(<li className="page-item"><Link className="page-link" onClick={()=>changeUrl(baseUrl+`/categories/?page=${i}`)} to={`/categories/?page=${i}`}>{i}</Link></li>)
    // };
    return (

        <section className="container">
            {/* All catogries */}
            <br/>
            <h4 className='mb-3 mt-5'><strong>Shop By Category(All)</strong></h4>
            <div className="row mb-2">
                {
                    categories.map((category,index) =>
                        <div className="col-12 col-md-3 mb-4">
                            <div className="card">
                                <Link to={`/category/${category.title}/${category.id}`}>
                                    <img src={`${baseImgUrl}/${category.cat_img}`} style={imgStyle} className="card-img-top" alt={category.title} />
                                </Link>
                                <div className="card-body">
                                    <h4 className="card-title"><Link className='text-decoration-none text-primary' to={`/category/${category.title}/${category.id}`}>{category.title}</Link></h4>
                                </div>
                                <div className="card-footer">
                                    Product Downloads: {category.totala_downloads}
                                </div>
                            </div>
                        </div>
                    )
                };
                {/*  Categories box */}
                {/* Categories box end */}
            </div>

            {/* All categories end */}
            {/* Pagination */}
            {/* <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li class="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    LINKS {links}
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav> */}

            {/* Pagination end */}

        </section>

    );
}
export default Categories;