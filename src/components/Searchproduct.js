// link SingleProduct.js
import SingleProduct from './SingleProduct';
import { useParams } from 'react-router-dom';
// api data fetch from server in react  useState our data
import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchProduct() {
    const configs=require('./Configs'); 
    const baseUrl=configs.URL;
    const [Products, setProducts] = useState([]);
    // useparam use for backend url match variable
    const {searchproductstring} = useParams();
 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(baseUrl + '/search-products/' + searchproductstring+'/');
                console.log(response)
                setProducts(response.data.results);
                // console.log(response.data.results)
            } catch (error) {
                console.log(error);
            }
            
        };
      
        fetchProducts();
    }, [searchproductstring]); // Include searchProductString in the dependency array
    return (
        <section className='container'>
            <br />
            <h3 className="mb-2 mt-5">Searched for<span className='text-primary'> {searchproductstring}</span></h3>
            <div className="row mt-2">
                {
                    Products.map((product, index) => <SingleProduct key={index} product={product} />)
                }
            </div>
        </section>


    );
}
export default SearchProduct;
