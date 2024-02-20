import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddReview() {
    const configs=require('../Configs'); 
    const baseUrl=configs.URL;
    const { product_id } = useParams();
    var customer_id = localStorage.getItem('customer_id');
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [ReviewFormData, setReviewFormData] = useState({
        'review-text': '',
        'rating': 1,
    });
    const inputHandler = (event) => {
        setReviewFormData({
            ...ReviewFormData,
            [event.target.name]: event.target.value
        });
    };
    // for submit
    const submitHandler = () => {
        // for validations
        if(ReviewFormData.reviews==null){
            setErrorMsg("Please enter your reviews  here.");
            setSuccessMsg("");
            return;
        }
        const formData = new FormData();
        formData.append('reviews', ReviewFormData.reviews);
        formData.append('rating', ReviewFormData.rating);
        formData.append('customer', customer_id);
        formData.append('product', product_id);
        axios.post(baseUrl + '/productrating/', formData)
            .then(function (response) {
                console.log(response);
                if (response.status != 201) {
                    setErrorMsg("Oops something went to wrong!!please try again!");
                    setSuccessMsg("");
                } else {
                    setErrorMsg("");
                    setSuccessMsg("Your Review has been Saved!!Thankyou!");
                    setReviewFormData({
                        'reviews': '',
                        'rating': ''
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // for submit button disabled
    const buttonEnable = (ReviewFormData.reviews != '');


    return (
        <>
            <section>
                <div className='row ms-5 mt-5 '>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <Sidebar />
                    </div>
                    <div className='container bg-secondary mt-3 w-50'>
                        <h3 className="mb-3 text-light">Add Review</h3>
                        {ErrorMsg && <p className='alert alert-danger'>{ErrorMsg}</p>}
                        {SuccessMsg && <p className='alert alert-success'>{SuccessMsg}</p>}
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='review-text'>Reviews</Form.Label>
                                <Form.Control as="textarea" id='reviews' name='reviews' onChange={inputHandler} value={ReviewFormData.reviews} rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='Rating'>Rating</Form.Label>
                                <Form.Select name='rating' onChange={inputHandler} aria-label="Default select example">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <Form.Control type="select" id='rating' />
                                </Form.Select>
                            </Form.Group>

                            <Button className='mb-2 item-center' variant="primary" type="button" disabled={!buttonEnable} onClick={submitHandler}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>

        </>
    );
}
export default AddReview;