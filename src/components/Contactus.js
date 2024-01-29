import { useState } from 'react';
import axios from 'axios';

function Contactus() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [contactUsData, setcontactUsData] = useState({
        'name': '',
        'email': '',
        'phone': '',
        'address': '',
        'query': '',
        'countary': '',
        'state': '',
        'city': '',
        'pincode': '',
        'querydetail': '',
        'code': ''

    });
    const inputHandler = (event) => {
        setcontactUsData({
            ...contactUsData,
            [event.target.name]: event.target.value
        });
    };
    // for submit button
    const submitHandler = () => {
        // Email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactUsData.email)) {
            setErrorMsg("Please enter a valid email address.");
            setSuccessMsg("");
            return; // Return early if email is not in the correct format
        }
        // Check if the phone is not a valid integer
        if (!Number.isInteger(parseInt(contactUsData.phone))) {
            setErrorMsg("Please enter a valid integer for the 10-digits phone number.");
            setSuccessMsg("");
            return;  // Stop further processing
        }
        // For pincode
        const isPincodeValid = /^\d+$/.test(contactUsData.pincode);
        if (!isPincodeValid) {
            setErrorMsg("Please enter a valid integer value for the 6-digits pincode.");
            setSuccessMsg("");
            return; // Prevent the Axios request if pincode is not valid
        }
        const formData = new FormData();
        formData.append('name', contactUsData.name)
        formData.append('email', contactUsData.email);
        formData.append('phone', contactUsData.phone);
        formData.append('countary', contactUsData.countary);
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
                    setErrorMsg("Request not saved!");
                    setSuccessMsg("");
                } else {
                    setErrorMsg("");
                    setSuccessMsg("Request saved!!Teams will be contact soon!!Thankyou!!");
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
                        'code': ''
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // for disabled submit button
    const buttonEnable = (contactUsData.name != '') && (contactUsData.email != '') && (contactUsData.phone != '') && (contactUsData.query != '') && (contactUsData.querydetail != '') && (contactUsData.address != '') && (contactUsData.pincode != '')

    return (
        <section className='mt-5'>
            <br />
            <h3 className="d-flex justify-content-center">CONTACT US</h3>
            <div className="cotainer btn-secondary">
                <p className='container  w-50'><strong className='text-dark'>Note:</strong> All fields are required*</p>
                {SuccessMsg && <p className='text-warning container w-50'><strong>{SuccessMsg}</strong></p>}
                {ErrorMsg && <p className='text-danger container w-50'><strong>{ErrorMsg}</strong></p>}
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
                            <select onChange={inputHandler} className="form-select form-select-sm ms-2" style={{ width: 180 }} aria-label=".form-select-sm example" value={contactUsData.code} name='code'>
                                <option selected>Select countary code</option>
                                <option value='+91'>india(+91)</option>
                                <option value='+63'>America(+63)</option>
                                <option value="+1">Usa(+1)</option>
                                <option value="+55">Aus(+55)</option>
                                <option value="+86">China(+86)</option>
                                <option value="+7">Russia(+7)</option>
                                <option value="+81">Japan(+81)</option>
                                <option value="Na">Others</option>
                            </select>
                            <input type="text" className="form-control" style={{ width: '70%' }} value={contactUsData.phone} onChange={inputHandler} name="phone" id="exampleFormControlInput1"
                                placeholder="Enter 10-digits phone number" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Addresses</label>
                            <input type="text" className="form-control" name="address" value={contactUsData.address} onChange={inputHandler} id="exampleFormControlInput1"
                                placeholder="Enter your address" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Pincode</label>
                            <input type="text" className="form-control" name="pincode" value={contactUsData.pincode} onChange={inputHandler} id="exampleFormControlInput1"
                                placeholder="Enter 6-digits pincode" />
                        </div>
                        <div className='row mb-2 p-2'>
                            <select onChange={inputHandler} className="form-select form-select-sm ms-1" style={{ width: 155 }} aria-label=".form-select-sm example" value={contactUsData.countary} name="countary">
                                <option selected>Select countary</option>
                                <option value="India">India</option>
                                <option value="America">America</option>
                                <option value="Australia">Australia</option>
                                <option value="England">England</option>
                                <option value="China">China</option>
                                <option value="Russia">Russia</option>
                                <option value="Japan">Japan</option>
                                <option value="Na">Others</option>
                            </select>
                            <select onChange={inputHandler} className="form-select form-select-sm ms-3" style={{ width: 135 }} aria-label=".form-select-sm example" value={contactUsData.state} name='state'>
                                <option selected>Select state</option>
                                <option value='Bihar'>Bihar</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Utter Pradesh">Utter Pradesh</option>
                                <option value="Delhi">Delhi</option>
                                <option value="3West Bengal">West Bengal</option>
                                <option value="3Utrakhand">Utrakhand</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Assam">Assam</option>
                                <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                                <option value="Gujrat">Gujrat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Karantaka">Karantaka</option>
                                <option value="Na">Others</option>
                            </select>
                            <select onChange={inputHandler} className="form-select form-select-sm ms-3" style={{ width: 145 }} aria-label=".form-select-sm example" value={contactUsData.city} name='city'>
                                <option selected>Select city</option>
                                <option value='Saharsa'>Saharsa</option>
                                <option value="Madhepua">Madhepua</option>
                                <option value="Supaul">Supaul</option>
                                <option value="Purniya">Purniya</option>
                                <option value="Mansi">Mansi</option>
                                <option value="Samstipur">Samstipur</option>
                                <option value="Kathiar">Kathiar</option>
                                <option value="Darbhanga">Darbhanga</option>
                                <option value="Indore">Indore</option>
                                <option value="Patna">Patna</option>
                                <option value="Noida">Noida</option>
                                <option value="Gurugram">Gurugram</option>
                                <option value="Ludhiana">Ludhiana</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Kolkatat">Kolkatat</option>
                                <option value="Benglore">Benglore</option>
                                <option value="Ahamdabad">Ahamdabad</option>
                                <option value="Na">Others</option>
                            </select>
                            <select onChange={inputHandler} className="form-select form-select-sm ms-3" style={{ width: 165 }} aria-label=".form-select-sm example" value={contactUsData.query} name='query'>
                                <option selected>Select Your Query</option>
                                <option value='Website'>Website</option>
                                <option value="Customer">Customer</option>
                                <option value="Seller/Vendor">Seller/Vendor</option>
                                <option value="Na">Others</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label for="exampleFormControlTextarea1" className="form-label">Elaborat Your Query</label>
                            <textarea name="querydetail" value={contactUsData.querydetail} onChange={inputHandler} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button onClick={submitHandler} disabled={!buttonEnable} className="btn btn-primary mb-2" type='button'>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Contactus;