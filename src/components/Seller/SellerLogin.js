import { useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import "../login.css";
import BackgroundImage from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";

function SellerLogin() {
    const configs=require('../Configs'); 
    const baseUrl=configs.URL;
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [formError, setFormError] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');
    const [loginFormData, setloginFormData] = useState({
        "username": '',
        "password": ''

    });
    // create arrow function
    const inputHandler = (event) => {
        // ... merge data
        setloginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        })
    };
    const submitHandler = (event) => {
        // send data to server
        let formData = new FormData();
        formData.append('username', loginFormData.username);
        formData.append('password', loginFormData.password);

        // submit data
        axios.post(baseUrl + '/vendor/login/', formData)
            .then(function (response) {
                if (response.data.bool == false) {
                    setFormError(true);
                    seterrorMsg(response.data.msg)

                } else {
                    console.log(response.data);
                    localStorage.setItem('vendor_id', response.data.id);
                    localStorage.setItem('vendor_login', true);
                    localStorage.setItem('vendor_username', response.data.user);
                    setFormError(false);
                    seterrorMsg('');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // console.log(localStorage.getItem('vendor_login'))
    const checkVendor = localStorage.getItem('vendor_login');
    if (checkVendor) {
        // window.location.href = '/seller/dashboard';
        navigate('/seller/dashboard')
    }

    const buttonEnable = (loginFormData.username != '') && (loginFormData.password != '')
    return (
        <>
            <div
                className="sign-in__wrapper"
                style={{ backgroundImage: `url(${BackgroundImage})` }}
            >
                {/* Overlay */}
                <div className="sign-in__backdrop"></div>
                {/* Form */}
                <Form className="shadow p-4 bg-white rounded" onSubmit={submitHandler}>
                    {/* Header */}
                    <img
                        className="img-thumbnail mx-auto d-block mb-2"
                        src={Logo}
                        alt="logo"
                    />
                    <div className="h4 mb-2 text-center">Seller Sign In</div>
                    {/* ALert */}
                    {show ? (
                        <Alert
                            className="mb-2"
                            variant="danger"
                            onClose={() => setShow(false)}
                            dismissible
                        >
                            Incorrect username or password.
                        </Alert>
                    ) : (
                        <div />
                    )}
                    <Form.Group className="mb-2" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={inputHandler}
                            placeholder="Username"
                            value={loginFormData.username}
                            name='username'
                            id='username' />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={loginFormData.password}
                            placeholder="Password"
                            onChange={inputHandler}
                            required
                            id='password'
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="checkbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button className="w-100" onClick={submitHandler} disabled={!buttonEnable} variant="primary" type="button">
                        Log In
                    </Button>
                    <p className='mt-3'><strong>Don't have an account?<Link className='text-decoration-none text-primary' to='/seller/register'> Sign Up</Link></strong></p>
                    <p className='mt-3'><strong>Forgot your Password?<Link className='text-decoration-none text-primary' to='/seller/forgotpassword'> Reset Password</Link></strong></p>
                    {formError && <p className='text-danger'>{errorMsg}</p>}
                    {/* <div className="d-grid justify-content-end">
                    <Button
                        className="text-muted px-0"
                        variant="link"
                        onClick={handlePassword}
                    >
                        Forgot password?
                    </Button>
                </div> */}
                </Form>
                {/* Footer */}
                <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                    Made by Python Marcket Place C | &copy;2024
                </div>
            </div>
        </>
    );
}
export default SellerLogin;