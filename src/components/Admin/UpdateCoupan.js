import AdminSidebar from './AdminSidebar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateCoupanlist() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const { coupan_id } = useParams();
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [updateCoupanData, setupdateCoupanData] = useState({
        'code': '',
        'discount_type': '',
        'discount_value': '',
        'minimum_order_value': '',
        'start_date': '',
        'expire_date': ''
    });
    // for input
    const inputHandler = (event) => {
        setupdateCoupanData({
            ...updateCoupanData,
            [event.target.name]: event.target.value
        });
    };
    // for rendering data one time
    useEffect(() => {
        fetchdata(baseUrl + '/coupan-modify/' + coupan_id)
        setupdateCoupanData({
            ...updateCoupanData,
        });
    }, []);
    // fetch all coupan list
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setupdateCoupanData(data);
            });
    }
    // for update
    const UpdatesubmitHandler = () => {
        if (updateCoupanData.start_date != '' && updateCoupanData.expire_date != '') {
            setErrorMsg("Please select start date and expire date");
            setSuccessMsg("");
            return;
        }
        // send data to server
        const formData = new FormData();
        formData.append('code', updateCoupanData.code);
        formData.append('discount_type', updateCoupanData.discount_type)
        formData.append('discount_value', updateCoupanData.discount_value);
        formData.append('minimum_order_value', updateCoupanData.minimum_order_value);
        formData.append('start_date', updateCoupanData.start_date);
        formData.append('expire_date', updateCoupanData.expire_date);
        // submit data form
        axios.patch(baseUrl + '/coupan-modify/' + coupan_id + '/', formData)
            .then(function (response) {
                if (response.status == 200) {
                    setErrorMsg('');
                    setSuccessMsg('Coupan updated successfully!!');
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
                    {/* for update coupan */}
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Update Coupan</h3>
                        {SuccessMsg && <p className='text-success bg-white'><strong>{SuccessMsg}</strong></p>}
                        {ErrorMsg && <p className='text-danger bg-white'><strong>{ErrorMsg}</strong></p>}
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='code'>Coupan Code</Form.Label>
                                <Form.Control name='code' onChange={inputHandler} value={updateCoupanData.code} type="text" id='code' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlFor='discount_value'>Discount Type</Form.Label>
                                <select onChange={inputHandler} className="form-select" aria-label=".form-select-sm example" value={updateCoupanData.discount_type} name='discount_type'>
                                    <option selected>Select discount_type</option>
                                    <option value='percentage'>Percentage</option>
                                    <option value='fixed_amount'>Fixed Amount</option>
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='discount_value'>discount_value</Form.Label>
                                <Form.Control name='discount_value' onChange={inputHandler} value={updateCoupanData.discount_value} type="number" id='discount_value' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='minimum_order_value'>minimum_order_value</Form.Label>
                                <Form.Control name='minimum_order_value' onChange={inputHandler} value={updateCoupanData.minimum_order_value} type="number" id='minimum_order_value' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='start_date'>Start Date</Form.Label>
                                <Form.Control name='start_date' onChange={inputHandler} value={updateCoupanData.start_date} type="datetime-local" id='start_date' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='expire_date'>Expire Date</Form.Label>
                                <Form.Control name='expire_date' onChange={inputHandler} value={updateCoupanData.expire_date} type="datetime-local" id='expire_date' />
                            </Form.Group>
                            <Button className='mb-2 mt-1' variant="success" onClick={UpdatesubmitHandler} type="button">
                                Update Coupan
                            </Button>
                        </Form>
                    </div>
                    {/* end update */}
                    <div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default UpdateCoupanlist;