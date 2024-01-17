import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from 'react';


function SellerRegister() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [errorMsg, seterrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    const [registerFormData, setregisterFormData] = useState({
        'first_name': '',
        'last_name': '',
        'username': '',
        'email': '',
        'mobile': '',
        'address': '',
        'password': '',

    });
    const inputHandler = (event) => {
        // ... merge data
        setregisterFormData({
            ...registerFormData,
            [event.target.name]: event.target.value
        })
    };
    // for submit
    const submitHandler = (event) => {
        // send data to server
        const formData = new FormData();
        formData.append('first_name', registerFormData.first_name)
        formData.append('last_name', registerFormData.last_name)
        formData.append('username', registerFormData.username)
        formData.append('email', registerFormData.email)
        formData.append('mobile', registerFormData.mobile)
        formData.append('address', registerFormData.address)
        formData.append('password', registerFormData.password)
        console.log(formData)
        console.log(registerFormData)

        // submit data form
        axios.post(baseUrl + '/vendor/register/', formData)
            .then(function (response) {
                if (response.data.bool == false) {
                    seterrorMsg(response.data.msg)
                    setsuccessMsg('')
                }
                else {
                    setregisterFormData({
                        'first_name': '',
                        'last_name': '',
                        'username': '',
                        'email': '',
                        'mobile': '',
                        'address': '',
                        'password': '',
                    })
                    seterrorMsg('');
                    setsuccessMsg(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };
    // for button enable 
    const buttonEnable = (registerFormData.first_name != '') && (registerFormData.last_name != '') && (registerFormData.username != '') && (registerFormData.email != '') && (registerFormData.mobile != '') && (registerFormData.address != '') && (registerFormData.password != '')

    return (
        <>
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-md-8 col-12 offset-2'>
                        <div className='card bg-secondary text-light'>
                            <h4 className="card-header">Register</h4>
                            <div className='card-body'>
                                <p><strong className='text-dark'>Note:</strong> All fields are required*</p>
                                {successMsg && <p className='text-dark'>{successMsg}</p>}
                                {errorMsg && <p className='text-danger'>{errorMsg} </p>}
                                <Form className='text-light w-61'>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label htmlFor='fname'>First Name</Form.Label>
                                        <Form.Control type="text" onChange={inputHandler} value={registerFormData.first_name} name='first_name' id='fname' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label htmlForr='lname'>Last Name</Form.Label>
                                        <Form.Control type="text" onChange={inputHandler} value={registerFormData.last_name} name='last_name' id='lname' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label htmlFor='username'>Username</Form.Label>
                                        <Form.Control type="text" onChange={inputHandler} value={registerFormData.username} name='username' id='username' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label htmlFor='email'>Email Address</Form.Label>
                                        <Form.Control type="email" onChange={inputHandler} value={registerFormData.email} name='email' id='email' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label htmlFor='email'>Mobile </Form.Label>
                                        <Form.Control type="number" onChange={inputHandler} value={registerFormData.mobile} name='mobile' id='mobile' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label htmlFor='address'>Address</Form.Label>
                                        <Form.Control as="textarea" id='address' name='address' onChange={inputHandler} value={registerFormData.address} rows={3} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label htmlFor='pwd'>Password</Form.Label>
                                        <Form.Control type="password" onChange={inputHandler} value={registerFormData.password} name='password' id='pwd' />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label htmlFor='cpwd'>Confirmed Password</Form.Label>
                    <Form.Control type="password" id='cpwd' />
                </Form.Group> */}
                                    <Button className='item-center' disabled={!buttonEnable} onClick={submitHandler} variant="primary" type="button">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SellerRegister;