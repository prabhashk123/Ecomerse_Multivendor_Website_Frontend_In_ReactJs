import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Customerforgotpassword() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    // const navigate = useNavigate();
    const [successMsg, setsuccessMsg] = useState('');
    const [errorMsg, seterrorMsg] = useState('');
    const [CustomerData, setCustomerData] = useState({
       'email': ''
    });
    const HandleChange = (event) => {
        // ... merge data
        setCustomerData({
            ...CustomerData,
            [event.target.name]: event.target.value
        });
    };
    // console.log(CustomerData)
    // submit
    const submitHandler = () => {
        const CustomerFormData = new FormData();
        CustomerFormData.append('email', CustomerData.email)
        console.log(CustomerFormData);
        // submit data form
        try {
            axios.post(baseUrl + '/customer-forgot-password/', CustomerFormData)
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
    const customerLoginStaus = localStorage.getItem('customerLoginStaus')
    if (customerLoginStaus == 'true') {
        window.location.href('/customer/dashboard')
    }
    useEffect(() => {
        document.title = 'Customer -Forgot Password'
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
                                <Form.Control type="email" value={CustomerData.email} id='email' placeholder='Enter your registered email' name='email' onChange={HandleChange} />
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
export default Customerforgotpassword;