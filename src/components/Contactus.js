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
        'address':'',
        'query': '',
        'countary': '',
        'state': '',
        'city':'',
        'pincode':'',
        'querydetail': '',
        'code':''

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
        formData.append('city', contactUsData.city);
        formData.append('pincode', contactUsData.pincode)
        formData.append('address', contactUsData.address);
        formData.append('code', contactUsData.code);

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
                        'city': '',
                        'address': '',
                        'pincode': '',
                        'code':''
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
                        <div className="mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Name</label>
                            <input type="text" value={contactUsData.name} onChange={inputHandler} name="name" className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Name" />
                        </div>

                        <div className="mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" name="email" value={contactUsData.email} onChange={inputHandler} className="form-control" id="exampleFormControlInput1"
                                placeholder="name@example.com" />
                        </div>
                        <div className="row mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Phone</label>
                            <select onChange={inputHandler} className="form-select form-select-sm ms-2" style={{ width:85 }} aria-label=".form-select-sm example" name='select'>
                                <option value={contactUsData.code}>+91</option>
                                <option value="2">+63</option>
                                <option value="3">+1</option>
                                <option value="3">+55</option>
                                <option value="3">China</option>
                                <option value="3">Rush</option>
                                <option value="3">Japan</option>
                                <option value="3">Others</option>
                            </select>
                            <input type="tel" className="form-control" style={{ width: '84%' }} value={contactUsData.phone} onChange={inputHandler} name="phone" id="exampleFormControlInput1"
                                placeholder="Enter Your Phone No" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Addresses</label>
                            <input type="text" className="form-control" name="address" value={contactUsData.address} onChange={inputHandler} id="exampleFormControlInput1"
                                placeholder="Enter your address" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Pincode</label>
                            <input type="text" className="form-control" name="pincode" value={contactUsData.pincode} onChange={inputHandler} id="exampleFormControlInput1"
                                placeholder="Enter your pincode" />
                        </div>
                        <div className='row mb-2 p-2'>
                            <select onChange={inputHandler} className="form-select form-select-sm ms-1" style={{ width: 155 }} aria-label=".form-select-sm example" name='select'>
                                <option onChange={inputHandler} value={contactUsData.countary}>India</option>
                                <option onChange={inputHandler} value={contactUsData.countary}>America</option>
                                <option onChange={inputHandler} value={contactUsData.countary}>Australia</option>
                                <option onChange={inputHandler} value={contactUsData.countary}>England</option>
                                <option value="3">China</option>
                                <option value="3">Rush</option>
                                <option value="3">Japan</option>
                                <option value="3">Others</option>
                            </select>
                            <select className="form-select form-select-sm ms-3" style={{ width: 135 }} aria-label=".form-select-sm example" name='select'>
                                <option onChange={inputHandler} value={contactUsData.state}>Bihar</option>
                                <option onChange={inputHandler} value={contactUsData.state}>Madhya Pradesh</option>
                                <option onChange={inputHandler} value={contactUsData.state}>Utter Pradesh</option>
                                <option onChange={inputHandler} value={contactUsData.state}>Delhi</option>
                                <option onChange={inputHandler} value={contactUsData.state}>West Bengal</option>
                                <option value="3">Utrakhand</option>
                                <option value="3">Punjab</option>
                                <option value="3">Assam</option>
                                <option value="3">Jammu & Kashmir</option>
                                <option value="3">Gujrat</option>
                                <option value="3">Haryana</option>
                                <option value="3">Karantaka</option>
                                <option value="3">Others</option>
                            </select>
                            <select className="form-select form-select-sm ms-3" style={{ width: 145 }} aria-label=".form-select-sm example" name='select'>
                                <option onChange={inputHandler} value={contactUsData.city}>Saharsa</option>
                                <option onChange={inputHandler} value={contactUsData.city}>Madhepua</option>
                                <option onChange={inputHandler} value={contactUsData.city}>Supaul</option>
                                <option onChange={inputHandler} value={contactUsData.city}>Purniya</option>
                                <option value="3">Mansi</option>
                                <option value="3">Samstipur</option>
                                <option value="3">Kathiar</option>
                                <option value="3">Darbhanga</option>
                                <option value="2">Indore</option>
                                <option value="3">Patna</option>
                                <option value="3">Noida</option>
                                <option value="3">Gurugram</option>
                                <option value="3">Ludhiana</option>
                                <option value="3">Hyderabad</option>
                                <option value="3">Kolkatat</option>
                                <option value="3">Benglore</option>
                                <option value="3">Ahamdabad</option>
                                <option value="3">Others</option>
                            </select>
                            <select className="form-select form-select-sm ms-3" style={{ width: 165 }} aria-label=".form-select-sm example" name='select'>
                                <option selected>Select Your Query</option>
                                <option onChange={inputHandler} value={contactUsData.query}>Website</option>
                                <option onChange={inputHandler} value={contactUsData.query}>Customer</option>
                                <option onChange={inputHandler} value={contactUsData.query}>Seller/Vendor</option>
                                <option onChange={inputHandler} value={contactUsData.query}>Others</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label for="exampleFormControlTextarea1" className="form-label">Elaborat Your Query</label>
                            <textarea name="querydetail" value={contactUsData.querydetail} onChange={inputHandler} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button onClick={submitHandler} className="btn btn-primary mb-2" type='button'>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Contactus;