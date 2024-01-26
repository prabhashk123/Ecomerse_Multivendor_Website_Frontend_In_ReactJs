import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Vendorproductdetails() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [productData, setProductData] = useState([]);
    const [productImgs, setProductImgs] = useState([]);
    // const [productTags, setproductTags] = useState([]);
    const { product_id } = useParams();

    useEffect(() => {
        fetchdata(baseUrl + '/product/' + product_id);
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data);
                setProductImgs(data.product_imgs);
                // setproductTags(data.tag_list);
            });
    }

    return (
        <section className='container ms-5'>
            <br />
            <h4 className='mt-5'>Product Images</h4>
            <div className='row'>
                <div className='col col-md-3'>
                    <div>
                        <img src={productData.image} className="img-thumbnail" alt={productData.title} />
                    </div>
                    {
                        productImgs.map((img, index) => {
                            return <div>
                                <img src={img.image} className="img-thumbnail" alt={productData.title} />
                            </div>
                        })
                    }
                </div>
                <div className='container col-md-6'>
                    <h4 className='text-dark '>Product Details</h4>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th className='bg-secondary'>Key</th>
                                <th className='bg-secondary'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='bg-primary text-light'>Category Id </td>
                                <td className='bg-dark text-light'>{productData.category}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Id </td>
                                <td className='bg-dark text-light'>{productData.id}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Name</td>
                                <td className='bg-dark text-light'>{productData.title}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Desc</td>
                                <td className='bg-dark text-light'>{productData.detail}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Usd_Price</td>
                                <td className='bg-dark text-light'>{productData.usd_price}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Price</td>
                                <td className='bg-dark text-light'>{productData.price}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Slug</td>
                                <td className='bg-dark text-light'>{productData.slug}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Tags</td>
                                <td className='bg-dark text-light'>{productData.tags}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Url</td>
                                <td className='bg-dark text-light'>{productData.demo_url}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Files</td>
                                <td className='bg-dark text-light'>{productData.product_file}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Rating</td>
                                <td className='bg-dark text-light'>{productData.product_ratings}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Downloads</td>
                                <td className='bg-dark text-light'>{productData.downloads}</td>
                            </tr>
                            <tr>
                                <td className='bg-primary text-light'>Product Url</td>
                                <td className='bg-dark text-light'>{productData.demo_url}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
export default Vendorproductdetails;