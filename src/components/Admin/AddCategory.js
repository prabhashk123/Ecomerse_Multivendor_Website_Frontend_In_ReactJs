import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AddCategory() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [CategoryData, setCategoryData] = useState({
        'title': '',
        'detail': '',
        'cat_img': '',
    });

    const inputHandler = (event) => {
        setCategoryData({
            ...CategoryData,
            [event.target.name]: event.target.value
        });
    };
// For Upload category image
    const fileHandler = (event) => {
        setCategoryData({
            ...CategoryData,
            [event.target.name]: event.target.files[0]
        });
    };

    useEffect(() => {
        setCategoryData({
            ...CategoryData,
        });
    }, []);

    const submitHandler = () => {
        // validation
        if(CategoryData.title==''){
            setErrorMsg("Title field may not be blank");
            setSuccessMsg("");
            return;
        }
        // send data to server
        const formData = new FormData();
        formData.append('title', CategoryData.title);
        formData.append('detail', CategoryData.detail);
        formData.append('cat_img', CategoryData.cat_img);
        // submit data form
        axios.post(baseUrl + '/categories/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status == 201) {
                    setCategoryData({
                        'title': '',
                        'detail': '',
                        'cat_img': '',
                    });
                    setErrorMsg('');
                    setSuccessMsg('New product cateogry added successfully!!');
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
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <AdminSidebar />
                    </div>
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Add Category</h3>
                        {SuccessMsg && <p className='text-success bg-white'><strong>{SuccessMsg}</strong></p>}
                        {ErrorMsg && <p className='text-danger bg-white'><strong>{ErrorMsg}</strong></p>}
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='Title'>Title</Form.Label>
                                <Form.Control name='title' onChange={inputHandler} value={CategoryData.title} type="text" id='Title' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='Detail'>Detail</Form.Label>
                                <Form.Control name='detail' onChange={inputHandler} value={CategoryData.detail} as="textarea" id='detail' rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='productcategoryimg'>Category Images</Form.Label>
                                <Form.Control name='cat_img' onChange={fileHandler} type="file" id='productcategoryimg' />
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
export default AddCategory;