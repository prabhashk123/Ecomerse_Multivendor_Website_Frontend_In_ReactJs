import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SellerSidebar from './SellerSidebar';
import { useState } from 'react';
import axios from 'axios';

function VendorChangePassword() {
    const configs=require('../Configs'); 
    const baseUrl=configs.URL;
    const vendor_id = localStorage.getItem('vendor_id');
    const [passwordchanged, setpasswordchanged] = useState(false);
    const [ConfirmError, setConfirmError] = useState(false)
    const [PasswordData, setPasswordData] = useState({
        'password': '',
        'confirm_password': '',
    });

    const inputHandler = (event) => {
        // ... merge data
        setPasswordData({
            ...PasswordData,
            [event.target.name]: event.target.value
        });

    };
    // submit
    const submitHandler = (event) => {
        // send data to server
        if (PasswordData.password == PasswordData.confirm_password) {
            setConfirmError(false);
        } else {
            setConfirmError(true);
        }
        const formData = new FormData();
        formData.append('password', PasswordData.password);
        // submit data form
        axios.post(baseUrl + '/vendor-change-password/' + vendor_id + '/', formData, {

        })
            .then(function (response) {
                if (response.status == 200) {
                    setpasswordchanged(true);
                } else {
                    setpasswordchanged(false);
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
                        <SellerSidebar />
                    </div>
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Change Password</h3>
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='pwd'>New Password</Form.Label>
                                <Form.Control type="password" value={PasswordData.password} id='pwd' name='password' onChange={inputHandler} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='cpwd'>Confirm Password</Form.Label>
                                <Form.Control type="password" id='cpwd' value={PasswordData.confirm_password} name='confirm_password' onChange={inputHandler} />
                            </Form.Group>
                            {
                                ConfirmError && <p className='text-danger bg-light'><strong>Password does not match</strong></p>
                            }
                            <Button className='mb-3 item-center' onClick={submitHandler} variant="primary" type="button">
                                Submit
                            </Button>
                            {
                                passwordchanged && <p className='text-success bg-light'><strong>Password has been changed successfully.</strong></p>
                            }
                        </Form>
                    </div>

                </div>
            </section>
        </>
    );
}
export default VendorChangePassword;