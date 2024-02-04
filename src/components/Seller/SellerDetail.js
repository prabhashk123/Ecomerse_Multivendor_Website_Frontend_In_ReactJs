import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleProduct from '../SingleProduct';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
// context api
// import { UserContext, CurrencyContext } from './Context';

function SellerDetail() {
    // whole url pass in baseUrl
    const baseUrl = 'http://127.0.0.1:8000/api';
    const {seller_username,seller_id } = useParams();
    // product backend
    const [ProductList, setProductList] = useState([]);
    //vendordictdefine for undefine data
    const [VendorData, setVendorData] = useState({
        'profile_img': '',
        'user': {
            'username': '',
            'first_name': '',
            'last_name': '',
            'total_products': 0
        }
    });
  
    useEffect(() => {
        fetchProductdata(baseUrl + '/vendor-products/' + seller_id);
        fetchVendorctdata(baseUrl + '/vendor/' + seller_id);
    }, []);
    // Fuction for Api Fatch
    function fetchProductdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductList(data);               
            });
    }
    function fetchVendorctdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setVendorData(data);
            });
    }
    // console.log(VendorData);
    return (
        <section className="container mt-4">
            <br />
            <div className='row mt-4'>
                <div className='col-3'>
                    <img src={VendorData.profile_img} className="img-thumbnail" alt={VendorData.user.username} />
                </div>
                <div className='col-9'>
                    {
                        VendorData.user.first_name && <h3>{VendorData.user.first_name} {VendorData.user.last_name} </h3>
                    }
                    {
                        !VendorData.user.first_name && <h3>{VendorData.user.username}</h3>
                    }
                    <p>Mobile: +91-{VendorData.mobile} <br />
                        Email: {VendorData.user.email}<br/>
                        Address: {VendorData.address}<br/>
                        Total Products: {VendorData.total_products}
                    </p>
                </div>
            </div>
            <div className='row'>
                <span><h3 className='mt-3 text-dark'>Related Seller All Products.</h3></span>
                {
                    ProductList.map((product, index) => <SingleProduct key={index} product={product} />)
                }
            </div>

        </section>
    );
}
export default SellerDetail;