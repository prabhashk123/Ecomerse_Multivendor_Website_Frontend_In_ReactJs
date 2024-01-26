import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SellerForgotPassword() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [successMsg, setsuccessMsg] = useState('');
    const [errorMsg, seterrorMsg] = useState('');
    const [SellerData, setSellerData] = useState({
       'email': ''
    });
    const HandleChange = (event) => {
        // ... merge data
        setSellerData({
            ...SellerData,
            [event.target.name]: event.target.value
        });
    };
    // console.log(SellerData)
    // submit
    const submitHandler = () => {
        const SellerFormData = new FormData();
        SellerFormData.append('email', SellerData.email)
        // submit data form
        try {
            axios.post(baseUrl + '/vendor-forgot-password/', SellerFormData)
                .then((res) => {
                    console.log(res);
                    if (res.data.bool === true) {
                        setsuccessMsg(res.data.msg)
                        seterrorMsg('');
                    } else {
                        seterrorMsg(res.data.msg);
                        setsuccessMsg('');
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }
    const sellerLoginStaus = localStorage.getItem('sellerLoginStaus')
    if (sellerLoginStaus == 'true') {
        window.location.href('/seller/dashboard')
    }
    useEffect(() => {
        document.title = 'Seller -Forgot Password'
    })

    return (
        <>
            <section>
                <div className='row ms-5 mt-5'>
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Forgot Password</h3>
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='email'>Email</Form.Label>
                                <Form.Control type="email" value={SellerData.email} id='email' placeholder='Enter your registered email' name='email' onChange={HandleChange} />
                            </Form.Group>
                            {
                                errorMsg && <p className='text-danger bg-light'>{errorMsg}<strong></strong></p>
                            }
                            <Button className='mb-3 item-center' onClick={submitHandler} variant="primary" type="button">
                                Send
                            </Button>
                        </Form>
                    </div>
                    {
                        successMsg && <p className='text-success mx-5 container text-center'><strong>{successMsg}</strong></p>
                    }
                </div>
            </section>
        </>
    );
}
export default SellerForgotPassword;