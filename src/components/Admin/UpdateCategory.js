import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
// for param to send data
import { useParams } from 'react-router-dom';

function UpdateCategory() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const { category_id } = useParams();
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [IsCatImageSelected, setIsCatImageSelected] = useState(false);
    // Initialy set category data empty
    const [CategoryData, setCategoryData] = useState({
        'title': '',
        'detail': '',
        'cat_img': '',
    });

    // For forms input value set
    const inputHandler = (event) => {
        setCategoryData({
            ...CategoryData,
            [event.target.name]: event.target.value
        });
    };

    // For Updated category image
    const fileHandler = (event) => {
        setCategoryData({
            ...CategoryData,
            [event.target.name]: event.target.files[0]
        });
        if (event.target.name == 'cat_img') {
            setIsCatImageSelected(true);
        }
    };

// For data fatch one time render
    useEffect(() => {
        setCategoryData({
            ...CategoryData,
        });
        fetchcategorydata(baseUrl + '/category/' + category_id);
    }, []);

    // Fetch category data
    function fetchcategorydata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data);
            });
    }
  
    // Submit All Data
    const submitHandler = () => {
        // send data to server
        const formData = new FormData();
        formData.append('title', CategoryData.title);
        formData.append('detail', CategoryData.detail);
        // submit data
        axios.post(baseUrl + '/categories/', formData, {
        })
        // Condition for image update
        if (IsCatImageSelected) {
            formData.append('cat_img', CategoryData.cat_img);
        }
        // submit data form using patch send partial data updated 
        axios.patch(baseUrl + '/category/' + category_id + '/', formData, {
            // for image define headers
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    setErrorMsg('');
                    setSuccessMsg(response.statusText);

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
                <div className='row ms-3 mt-5'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <AdminSidebar />
                    </div>
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Update Category</h3>
                        {SuccessMsg && <p className='text-dark'>{SuccessMsg}</p>}
                        {ErrorMsg && <p className='text-danger'>{ErrorMsg} </p>}
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
                                <p>
                                    <img src={CategoryData.cat_img} width='100' className='mt-1' />
                                </p>
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
export default UpdateCategory;