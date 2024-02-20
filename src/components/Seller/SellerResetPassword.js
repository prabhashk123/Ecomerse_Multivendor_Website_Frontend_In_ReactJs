import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SellerResetPassword() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    const { vendor_id } = useParams();
    const [successMsg, setsuccessMsg] = useState('');
    const [errorMsg, seterrorMsg] = useState('');
    const [SellerPasswordData, setSellerPasswordData] = useState({
        'password': '',
    });

    const HandleChange = (event) => {
        // ... merge data
        setSellerPasswordData({
            ...SellerPasswordData,
            [event.target.name]: event.target.value
        });

    };
    // submit request
    const submitHandler = () => {
        const SellerFormData = new FormData();
        SellerFormData.append('password', SellerPasswordData.password)
        // submit data form
        try {
            axios.post(baseUrl + '/vendor-reset-password/' + vendor_id + '/', SellerFormData)
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
        document.title = 'Seller -Reset Password'
    })

    return (
        <>
            <section>
                <div className='row ms-5 mt-5'>
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Reset Your Password</h3>
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='password'>New Password</Form.Label>
                                <Form.Control type="password" value={SellerPasswordData.password} id='pwd' placeholder='Enter new password' name='password' onChange={HandleChange} />
                            </Form.Group>
                            {
                                errorMsg && <p className='text-danger bg-light'>{errorMsg}<strong></strong></p>
                            }
                            <Button className='mb-3 item-center' onClick={submitHandler} variant="primary" type="button">
                                Update
                            </Button>
                            <Button className='mb-3 item-center ms-2'>
                                <Link className='text-decoration-none text-light' to='/seller/login'>Login</Link>
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
export default SellerResetPassword;