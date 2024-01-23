import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SellerSidebar from './SellerSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [CategoryData, setCategoryData] = useState([]);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [ProductImgs, setProductImgs] = useState([]);
    const [ImgUploadErrorMsg, setImgUploadErrorMsg] = useState('');
    const [ImgUploadSuccessMsg, setImgUploadSuccessMsg] = useState('');
    const [ProductData, setProductData] = useState({
        'vendor': '',
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
        // 'downloads': '',
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
    };
    const multipleFilesHandler = (event) => {
        var files = event.target.files;
        if (files.length > 0) {
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
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data);
                // console.log(data);
            });
    }
    // Submit
    const submitHandler = () => {
        // send data to server
        const formData = new FormData();
        formData.append('vendor', ProductData.vendor);
        formData.append('category', ProductData.category);
        formData.append('title', ProductData.title);
        formData.append('slug', ProductData.slug);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('usd_price', ProductData.usd_price);
        formData.append('tags', ProductData.tags);
        formData.append('image', ProductData.image);
        formData.append('demo_url', ProductData.demo_url);
        formData.append('product_file', ProductData.product_file);

        // submit data form
        axios.post(baseUrl + '/products/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status == 201) {
                    setProductData({
                        'vendor': '',
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
                    });
                    setErrorMsg('');
                    setSuccessMsg(response.statusText);

                    for (let i = 0; i < ProductImgs.length; i++) {
                        const ImageFormData = new FormData();
                        ImageFormData.append('product', response.data.id);
                        ImageFormData.append('image', ProductImgs[i]);
                        // Submit multiple Image
                        axios.post(baseUrl + '/product-imgs/', ImageFormData)
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        // End Upload img
                    }
                    setProductImgs('');
                } else {
                    setSuccessMsg('');
                    setErrorMsg(response.statusText);
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
                    <div className='col-md-3 col-12 mt-3'>
                        <SellerSidebar />
                    </div>
                    <div className='container bg-secondary mt-3 w-50'>
                        <h3 className="mb-3 text-light">Add Product</h3>
                        {SuccessMsg && <p className='text-dark'>{SuccessMsg}</p>}
                        {ErrorMsg && <p className='text-danger'>{ErrorMsg} </p>}
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='Category'>Category</Form.Label>
                                <Form.Select name='category' onChange={inputHandler} aria-label="Default select example">
                                    <option>Open to Select Product Category</option>
                                    {
                                        CategoryData.map((item, index) => <option value={item.id}>{item.title}</option>)
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
                                <Form.Label htmlFor='INRPrice'>INR Price</Form.Label>
                                <Form.Control name='price' onChange={inputHandler} value={ProductData.price} type="number" id='INR_price' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label htmlFor='USDPrice'>USD Price</Form.Label>
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
                                <Form.Label htmlFor='DemoURL'>Demo URL</Form.Label>
                                <Form.Control name='demo_url' onChange={inputHandler} value={ProductData.demo_url} type="url" id='demo_url' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='productimg'>Featured Images</Form.Label>
                                <Form.Control name='image' onChange={fileHandler} type="file" id='productimg' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='ProductImages'>Product Images</Form.Label>
                                <Form.Control name='product_imgs' onChange={multipleFilesHandler} type="file" id='productimage' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='ProductFile'>Product File</Form.Label>
                                <Form.Control name='product_file' onChange={fileHandler} type="file" id='product_file' />
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
export default AddProduct;