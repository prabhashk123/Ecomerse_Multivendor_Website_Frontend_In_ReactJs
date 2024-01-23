import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SellerSidebar from './SellerSidebar'
import axios from 'axios';
import { useState, useEffect } from 'react';

function VendorProfile() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ProfileData, setProfileData] = useState({
        'user_id': '',
        'first_name': '',
        'last_name': '',
        'username': '',
        'email': '',
        'mobile': '',
        'p_image': '',
    });

    const vendor_id = localStorage.getItem('vendor_id');
    useEffect(() => {
        fetchdata(baseUrl + '/vendor/' + vendor_id);
    }, []);

    function fetchdata(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);

                setProfileData({
                    'user_id': data.user.id,
                    'first_name': data.user.first_name,
                    'last_name': data.user.last_name,
                    'username': data.user.username,
                    'email': data.user.email,
                    'mobile': data.mobile,
                    'address': data.address,
                    'p_image': data.profile_img,
                });
            });
    }
    const inputHandler = (event) => {
        // ... merge data
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.value
        })
    };
    const handleFileChange = (event) => {
        // ... merge data
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.files[0]
        })
    };
    const submitHandler = (event) => {
        // send data to server
        const formData = new FormData();
        formData.append('user', ProfileData.user_id);
        formData.append('mobile', ProfileData.mobile);
        formData.append('address', ProfileData.address);
        formData.append('profile_img', ProfileData.p_image);
        // for endles url
        // submit data form
        axios.put(baseUrl + '/vendor/' + vendor_id + '/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // submit data form
        const formUserData = new FormData();
        formUserData.append('first_name', ProfileData.first_name)
        formUserData.append('last_name', ProfileData.last_name)
        formUserData.append('username', ProfileData.username)
        formUserData.append('email', ProfileData.email)
        formUserData.append('address', ProfileData.address)
        axios.put(baseUrl + '/user/' + ProfileData.user_id + '/', formUserData)
            .then(function (response) {
                console.log(response);
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
                        <h3 className="mb-3 text-light text-center">Welcome <span className='text-primary bg-light' >{ProfileData.username}</span></h3>
                        <h3 className="mb-3 text-light">Update Profile</h3>
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="fname">
                                <Form.Label htmlFor='fname'>First Name</Form.Label>
                                <Form.Control type="text" onChange={inputHandler} value={ProfileData.first_name} name='first_name' id='fname' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='lname'>Last Name</Form.Label>
                                <Form.Control type="text" onChange={inputHandler} value={ProfileData.last_name} name='last_name' id='lname' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlFor='username'>Username</Form.Label>
                                <Form.Control type="text" onChange={inputHandler} value={ProfileData.username} name='username' id='username' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control type="email" onChange={inputHandler} value={ProfileData.email} name='email' id='email' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlFor='mobile'>Mobile</Form.Label>
                                <Form.Control type="number" onChange={inputHandler} value={ProfileData.mobile} name='mobile' id='mobile' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='address'>Address</Form.Label>
                                <Form.Control as="textarea" id='address' name='address' onChange={inputHandler} value={ProfileData.address} rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <p>
                                    <img src={ProfileData.p_image} width='100' className='mt-2' />
                                </p>
                                <Form.Label htmlFor='profileimage'>Profile Image</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} name='p_image' id='profileimage' />
                            </Form.Group>
                            <Button className='mb-2 item-center' variant="primary" type="button" onClick={submitHandler}>
                                Update
                            </Button>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
}
export default VendorProfile;