import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';
import { useState } from 'react';
import axios from 'axios';

function AddAddress() {
    const configs=require('../Configs'); 
    const baseUrl=configs.URL;
    var customer_id = localStorage.getItem('customer_id');
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [AddressFormData, setAddressFormData] = useState({
        'address': '',
        'customer': customer_id,
    });
    const inputHandler = (event) => {
        setAddressFormData({
            ...AddressFormData,
            [event.target.name]: event.target.value
        });
    };
    console.log(AddressFormData)
    // for submit
    const submitHandler = () => {
        const formData = new FormData();
        formData.append('address', AddressFormData.address);
        formData.append('customer', AddressFormData.customer);
        axios.post(baseUrl + '/address/', formData)
            .then(function (response) {
                console.log(response);
                if (response.status != 201) {
                    setErrorMsg("Data not saved");
                    setSuccessMsg("");
                } else {
                    setErrorMsg("");
                    setSuccessMsg("Data saved");
                    setAddressFormData({
                        'address': ''
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // for disabled
    const disabledBtn=(AddressFormData.address=='');


    return (
        <>
            <section>
                <div className='row ms-5 mt-5'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <Sidebar />
                    </div>
                    <div className='container bg-secondary mt-3 mb-5 w-50'>
                        <h3 className="mb-3 text-light">Add Address</h3>
                        {ErrorMsg && <p className='alert alert-danger'>{ErrorMsg}</p>}
                        {SuccessMsg && <p className='alert alert-success'>{SuccessMsg}</p>}
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='address'>Address</Form.Label>
                                <Form.Control as="textarea" id='address' name='address' onChange={inputHandler} value={AddressFormData.address} rows={3} />
                            </Form.Group>
                            <Button className='mb-2 item-center' variant="primary" type="button" disabled={disabledBtn} onClick={submitHandler}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>

        </>
    );
}
export default AddAddress;