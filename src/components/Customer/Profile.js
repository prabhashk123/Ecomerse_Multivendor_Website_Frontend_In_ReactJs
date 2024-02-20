import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Profile() {
    const configs=require('../Configs'); 
    const baseUrl=configs.URL;
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [IsProfileImageSelected, setIsProfileImageSelected] = useState(false);
    const [ProfileData, setProfileData] = useState({
        'user_id': '',
        'first_name': '',
        'last_name': '',
        'username': '',
        'email': '',
        'mobile': '',
        'p_image': '',
    });

    var customer_id = localStorage.getItem('customer_id')

    useEffect(() => {
        fetchdata(baseUrl + '/customer/' + customer_id);
    }, []);

    function fetchdata(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setProfileData({
                    'user_id': data.user.id,
                    'first_name': data.user.first_name,
                    'last_name': data.user.last_name,
                    'username': data.user.username,
                    'email': data.user.email,
                    'mobile': data.mobile,
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
        if (event.target.name == 'p_image') {
            setIsProfileImageSelected(true);
        }
    };
    const submitHandler = (event) => {
        // send data to server
        const formData = new FormData();
        formData.append('user', ProfileData.user_id);
        formData.append('mobile', ProfileData.mobile);
        // formData.append('address', ProfileData.address);
        if (IsProfileImageSelected) {
            formData.append('profile_img', ProfileData.p_image);
        }
        // for endles url add this +'/'
        // submit data form
        axios.put(baseUrl + '/customer/' + customer_id + '/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    setErrorMsg('');
                    setSuccessMsg('Profile updated successfully!!');
                }
                else {
                    setSuccessMsg('');
                    setErrorMsg('Oops something went to wrong!!please try again later!!');
                }
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
                    <div className='col-md-3 col-12 mt-3'>
                        <Sidebar />
                    </div>
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light text-center">Welcome <span className='text-primary bg-light' >{ProfileData.username}</span></h3>
                        <h3 className="mb-3 text-light">Update Profile</h3>
                        {SuccessMsg && <p className='text-success bg-white'><strong>{SuccessMsg}</strong></p>}
                        {ErrorMsg && <p className='text-danger bg-white'><strong>{ErrorMsg}</strong> </p>}
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='profileimage'>Profile Image</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} name='p_image' id='profileimage' />
                                <img src={ProfileData.p_image} className='img img-thumbnail mt-2' width="100" />
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
export default Profile;