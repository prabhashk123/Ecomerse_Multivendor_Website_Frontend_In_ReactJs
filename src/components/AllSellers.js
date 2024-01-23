import SingleSeller  from './Seller/SingleSeller';
import { Link } from 'react-router-dom';
// api data fetch from server in react  useState our data
import { useState, useEffect } from 'react';

function AllSellers() {
    const baseUrl='http://127.0.0.1:8000/api';
    const [SellerList, setSellerList] = useState([]);

    useEffect(() => {
        fetchdata(baseUrl+'/vendors');
    },[]);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setSellerList(data);
            });
    };
    // create link for pagination 
    // var links = [];
    // var limit=1;
    // var totalLinks=totalResult/limit;
    // for (let i = 1; i <= totalLinks; i++) {
    //     links.push(<li className="page-item"><Link className="page-link" onClick={()=>changeUrl(baseUrl+`/vendor/?page=${i}`)} to={`/vendors/?page=${i}`}>{i}</Link></li>)
    // };

    // function changeUrl(baseUrl) {
    //     fetchdata(baseUrl);
    // };

    return (
        <section className='container'>
            <br/>
            <h3 className="mt-5">All Sellers</h3>
            <div className="row">
                {
                    SellerList.map((seller) => <SingleSeller seller={seller} />)
                }
            </div>
            {/* <nav aria-label="Page navigation example">
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
            </nav> */}
        </section>

    );
}
export default AllSellers;
