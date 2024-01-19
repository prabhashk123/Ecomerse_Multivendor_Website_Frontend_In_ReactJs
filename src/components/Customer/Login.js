// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useState} from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import "../login.css";
// for connect to django php react like axios for http client
import axios from 'axios';
import BackgroundImage from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";

function Login(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [show, setShow] = useState(false);
    const [formError, setFormError] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');
    const[loginFormData,setloginFormData]=useState({
        "username":'',
        "password":''
       
    });
    // console.log(loginFormData)
    // create arrow function
    const inputHandler = (event) =>{
        // ... merge data
        setloginFormData({
            ...loginFormData,
            [event.target.name]:event.target.value
        })
    };
    const submitHandler =(event)=>{
        // send data to server
        let formData=new FormData();
        formData.append('username',loginFormData.username);
        formData.append('password',loginFormData.password);
        
        // submit data
        axios.post(baseUrl + '/customer/login/', formData)
            .then(function (response) {
                if(response.data.bool == false){
                    setFormError(true);
                    seterrorMsg(response.data.msg)
                    
                }else{
                    console.log(response.data);
                    localStorage.setItem('customer_id',response.data.id);
                    localStorage.setItem('customer_login',true);
                    localStorage.setItem('customer_username',response.data.user);
                    setFormError(false);
                    seterrorMsg('');
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    
    const checkCustomer=localStorage.getItem('customer_login');
    if(checkCustomer){
        window.location.href='/customer/dashboard';
    }
    
    const buttonEnable =(loginFormData.username!='') && (loginFormData.password!='')
    // console.log(loginFormData)

//     return (
//         <>
//             <div className='container bg-secondary mt-1 w-50'>
//             <h3 className="mb-3 text-light">Login</h3>
//                 <Form className='text-light w-61'>

//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label for='username'>Username</Form.Label>
//                         <Form.Control type="text" name='username' value={loginFormData.usrename} onChange={inputHandler} id='username' />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formBasicPassword">
//                         <Form.Label for='pwd'>Password</Form.Label>
//                         <Form.Control type="password" name='password' value={loginFormData.password} onChange={inputHandler} id='pwd' />
//                     </Form.Group>
//                     <Button className='mb-2 item-center' variant="primary" onClick={submitHandler} type="button">
//                         Login
//                     </Button>
//                 </Form>
//             </div>
//         </>
//     );
// }
// export default Login;

// const Login = () => {
    // const baseUrl = 'http://127.0.0.1:8000/api';
    // const [username, setInputUsername] = useState("");
    // const [password, setInputPassword] = useState("");

    // const [show, setShow] = useState(false);
    // const [loading, setLoading] = useState(false);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setLoading(true);
    //     axios.post(baseUrl+'/customer/login/', {
    //         username: '',
    //         password: '',
    //       })
    //       .then(function (response){
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });

        // await delay(500);
    // console.log(`Username :${username}, Password :${password}`);
    // if (username !== 'username' || password !== 'password') {
    //     setShow(true);
    // }
    //     setLoading(false);
    // };

    // const handlePassword = () => { };

    // function delay(ms) {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    return (
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
                <div className="h4 mb-2 text-center">Customer Sign In</div>
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
                <Button className="w-100" onClick={submitHandler}  disabled={!buttonEnable} variant="primary" type="button">
                        Log In
                    </Button>
                    {formError &&<p className='text-danger'>{errorMsg}</p>}
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
                Made by Python Marcket Place C | &copy;2023
            </div>
        </div>
    );
};

export default Login;
