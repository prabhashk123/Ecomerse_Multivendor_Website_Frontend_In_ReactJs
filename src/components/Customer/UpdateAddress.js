import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
// useparam to get the data from url
import { useParams } from 'react-router-dom';

function UpdateAddress() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const { address_id } = useParams();
    var customer_id = localStorage.getItem('customer_id');
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [AddressFormData, setAddressFormData] = useState({
        'address': '',
        'customer': customer_id,
    });
    // for data fetch
    useEffect(() => {
        fetchdata(baseUrl + '/address/' + address_id);
    }, []);
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setAddressFormData({
                    'address': data.address,
                    'customer': customer_id,
                });
                console.log(data);
            });
    }
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
        axios.put(baseUrl + '/address/' + parseInt(address_id) + '/', formData)
            .then(function (response) {
                console.log(response);
                if (response.status != 200) {
                    setErrorMsg("Data not saved");
                    setSuccessMsg("");
                } else {
                    setErrorMsg("");
                    setSuccessMsg("Data saved");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // for disabled
    const disabledBtn = (AddressFormData.address == '');


    return (
        <>
            <section>
                <div className='row ms-5 mt-3'>
                    <div className='col-md-4 col-12 mb-2'>
                        <Sidebar />
                    </div>
                    <div className='container bg-secondary mt-2 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Update Address</h3>
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
export default UpdateAddress;