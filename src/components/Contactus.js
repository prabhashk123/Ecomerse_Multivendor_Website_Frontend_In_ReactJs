import { useState } from 'react';
import axios from 'axios';

function Contactus() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    // var customer_id = localStorage.getItem('customer_id');
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [contactUsData, setcontactUsData] = useState({
        'name': '',
        'email': '',
        'phone': '',
        'query': '',
        'countary': '',
        'state': '',
        'querydetail': '',

    });
    const inputHandler = (event) => {
        setcontactUsData({
            ...contactUsData,
            [event.target.name]: event.target.value
        });
    };
    console.log(contactUsData);
    // for submit
    const submitHandler = () => {
        const formData = new FormData();
        formData.append('name', contactUsData.name)
        formData.append('email', contactUsData.email);
        formData.append('phone)', contactUsData.phone);
        formData.append('countary)', contactUsData.countary);
        formData.append('query', contactUsData.query);
        formData.append('querydetail', contactUsData.querydetail);
        formData.append('state', contactUsData.state);

        axios.post(baseUrl + '/contactus/', formData)
            .then(function (response) {
                console.log(response);
                if (response.status != 201) {
                    setErrorMsg("Request saved!!Teams will be contact soon!!Thankyou!!");
                    setSuccessMsg("");
                } else {
                    setErrorMsg("");
                    setSuccessMsg("Request not saved!");
                    setcontactUsData({
                        'name': '',
                        'email': '',
                        'phone': '',
                        'query': '',
                        'countary': '',
                        'state': '',
                        'querydetail': '',
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // for disabled
    // const disabledBtn = (contactUsData.vendor == '');

    return (
        <section className='mt-5'>
            <br />
            <h3 className="d-flex justify-content-center">CONTACT US</h3>
            <div className="cotainer btn-secondary">
                <div className="container w-50 ">
                    <form>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Name</label>
                            <input type="name" name="name" className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Name" />
                        </div>

                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleFormControlInput1"
                                placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Phone</label>
                            <input type="text" className="form-control" name="phone" id="exampleFormControlInput1"
                                placeholder="Enter Your Phone No" />
                        </div>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" name='select'>
                            <option selected>Select Countary</option>
                            <option value="1">India</option>
                            <option value="2">America</option>
                            <option value="3">Australia</option>
                            <option value="3">England</option>
                            <option value="3">China</option>
                            <option value="3">Rush</option>
                            <option value="3">Japan</option>
                            <option value="3">Others</option>
                        </select>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" name='select'>
                            <option selected>Select State</option>
                            <option value="1">Bihar</option>
                            <option value="2">America</option>
                            <option value="3">Australia</option>
                            <option value="3">England</option>
                            <option value="3">China</option>
                            <option value="3">Rush</option>
                            <option value="3">Japan</option>
                            <option value="3">Others</option>
                        </select>
                        <select  className="form-select form-select-sm" aria-label=".form-select-sm example" name='select'>
                            <option selected>Select Your Query</option>
                            <option value="1">Website</option>
                            <option value="2">Customer</option>
                            <option value="3">Seller/Vendor</option>
                            <option value="3">Others</option>
                        </select>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Elaborat Your Query</label>
                            <textarea name="query" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button className="btn btn-primary" type='button'>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Contactus;