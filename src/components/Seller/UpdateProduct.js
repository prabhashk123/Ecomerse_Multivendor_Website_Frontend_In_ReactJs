import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SellerSidebar from './SellerSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// for param to send data
import { useParams } from 'react-router-dom';

function UpdateProduct() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const { product_id } = useParams();
    const vendor_id = localStorage.getItem('vendor_id');
    const [CategoryData, setCategoryData] = useState([]);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [IsFeaturedImageSelected, setIsFeaturedImageSelected] = useState(false);
    const [IsProductFileSelected, setIsProductFileSelected] = useState(false);
    const [IsMultipleProductImageSelected, setIsMultipleProductImageSelected] = useState(false);
    // const [IsImageDeleted, setIsImageDeleted] = useState(false);
    const [ProductImgs, setProductImgs] = useState([]);
    const [ProductData, setProductData] = useState({
        // 'vendor': '',
        'category': '',
        'title': '',
        'slug': '',
        'detail': '',
        'price': '',
        'usd_price': '',
        'tags': '',
        'image': '',
        'demo_url': '',
        'product_file': '',
        'product_imgs': '',
    });
    const inputHandler = (event) => {
        setProductData({
            ...ProductData,
            [event.target.name]: event.target.value
        });
    };
    const fileHandler = (event) => {
        setProductData({
            ...ProductData,
            [event.target.name]: event.target.files[0]
        });
        if (event.target.name == 'image') {
            setIsFeaturedImageSelected(true);
        }
        if (event.target.name == 'product_file') {
            setIsProductFileSelected(true);
        }
    };
    const multipleFilesHandler = (event) => {
        var files = event.target.files;
        if (files.length > 0) {
            setIsMultipleProductImageSelected(true);
            setProductImgs(files);
        }
    };
    // console.log(ProductData);
    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor': vendor_id
        });
        fetchdata(baseUrl + '/categories/');
        fetchProductData(baseUrl + '/product/' + product_id);
    }, []);
    // Fetch category of product
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data);
                // console.log(data);
            });
    }
    // For Product image delete
    function deleteImage(image_id) {
        axios.delete(baseUrl + '/product-img/' + image_id + '/')
            .then(function (response) {
                // console.log(response);
                if (response.status == 204) {
                    // setIsImageDeleted(true);
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    // fetch all product data
    function fetchProductData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data);
                // console.log(data);
            });

    }
    // Submit
    const submitHandler = () => {
        // for validations
        if(ProductData.demo_url==null){
            setErrorMsg("Please enter a valid demo URL.");
            setSuccessMsg("");
            return;
        }
        // send data to server
        const formData = new FormData();
        // formData.append('vendor', ProductData.vendor);
        formData.append('category', ProductData.category);
        formData.append('title', ProductData.title);
        formData.append('slug', ProductData.slug);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('usd_price', ProductData.usd_price);
        formData.append('tags', ProductData.tags);
        if (IsFeaturedImageSelected) {
            formData.append('image', ProductData.image);
        }
        formData.append('demo_url', ProductData.demo_url);
        if (IsProductFileSelected) {
            formData.append('product_file', ProductData.product_file);
        }
        formData.append('product_imgs', ProductData.product_imgs);

        // submit data form patch send partial data put send all data
        axios.patch(baseUrl + '/product/' + product_id + '/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    setErrorMsg('');
                    setSuccessMsg('Product updated successfully!!');
                    // for multiple image
                    if (IsMultipleProductImageSelected) {
                        for (let i = 0; i < ProductImgs.length; i++) {
                            const ImageFormData = new FormData();
                            ImageFormData.append('product', response.data.id);
                            ImageFormData.append('image', ProductImgs[i]);
                            // Submit multiple Image & query on url
                            axios.post(baseUrl + '/product-imgs/?from_update=1', ImageFormData)
                                .then(function (response) {
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            // End Upload img
                        }
                    }
                } else {
                    setSuccessMsg('');
                    setErrorMsg('Oops something went to wrong!!please try again later!!');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <section>
                <div className='row ms-5 mt-5'>
                    <div className='col-md-4 col-12 mb-2 mt-3'>
                        <SellerSidebar />
                    </div>
                    <div className='container bg-secondary mb-4 mt-3 w-50'>
                        <h3 className="mb-3 text-light">Update Product</h3>
                        {SuccessMsg && <p className='text-success bg-white'><strong>{SuccessMsg}</strong></p>}
                        {ErrorMsg && <p className='text-danger bg-white'><strong>{ErrorMsg}</strong> </p>}
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='Category'>Category</Form.Label>
                                <Form.Select name='category' onChange={inputHandler} aria-label="Default select example">
                                    {
                                        CategoryData.map((item, index) => <option selected={item.id == ProductData.category} value={item.id}>{item.title}</option>)
                                    }
                                    <Form.Control type="select" id='category' />
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='Title'>Title</Form.Label>
                                <Form.Control name='title' onChange={inputHandler} value={ProductData.title} type="text" id='Title' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlFor='Slug'>Slug</Form.Label>
                                <Form.Control name='slug' onChange={inputHandler} value={ProductData.slug} type="text" id='slug' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label htmlFor='INR Price'>INR Price</Form.Label>
                                <Form.Control name='price' onChange={inputHandler} value={ProductData.price} type="number" id='INR_price' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label htmlFor='USD Price'>USD Price</Form.Label>
                                <Form.Control name='usd_price' onChange={inputHandler} value={ProductData.usd_price} type="number" id='USD_price' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='Detail'>Detail</Form.Label>
                                <Form.Control name='detail' onChange={inputHandler} value={ProductData.detail} as="textarea" id='detail' rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='Tags'>Tags</Form.Label>
                                <Form.Control name='tags' onChange={inputHandler} value={ProductData.tags} as="textarea" id='tags' rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicUrl">
                                <Form.Label htmlFor='Demo URL'>Demo URL</Form.Label>
                                <Form.Control name='demo_url' onChange={inputHandler} value={ProductData.demo_url} type="url" id='demo_url' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='productimg'>Featured Images</Form.Label>
                                <Form.Control name='image' onChange={fileHandler} type="file" id='productimg' />
                                <img src={ProductData.image} className='img rounded border mt-2' width="200" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='ProductImages'>Product Images</Form.Label>
                                <Form.Control className='mb-2' name='product_imgs' onChange={multipleFilesHandler} type="file" id='productimage' />
                                <>
                                    {
                                        ProductData.product_imgs && ProductData.product_imgs.map((img, index) =>
                                            <span className='image-box d-inline p-3 my-2' onClick={() => deleteImage(img.id)}>
                                                <i className='fa fa-trash text-danger' style={styles.deletBtn} role='button'></i>
                                                <img src={img.image} className='img rounded border my-4' width="200" />
                                            </span>
                                        )
                                    }
                                </>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='ProductFile'>Product File</Form.Label>
                                <Form.Control name='product_file' onChange={fileHandler} type="file" id='product_file' />
                                <strong><Link className='text-decoration-none text-info' to={ProductData.product_imgs.file}>{ProductData.product_file}</Link></strong>
                            </Form.Group>
                            <Button className='mb-2 item-center' variant="primary" onClick={submitHandler} type="button">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>

        </>
    );
}
const styles = {
    'deletBtn': {
        'position': 'absolute',
    }
};
export default UpdateProduct;