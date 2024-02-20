import AdminSidebar from './AdminSidebar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllCoupanlist() {
    const configs=require('../Configs'); 
    const baseUrl=configs.URL;
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [allCoupanList, setallCoupanList] = useState([])
    const [addCoupanData, setaddCoupanData] = useState({
        'code': '',
        'discount_type': '',
        'discount_value': '',
        'minimum_order_value': '',
        'start_date': '',
        'expire_date': ''
    });
    // for input
    const inputHandler = (event) => {
        setaddCoupanData({
            ...addCoupanData,
            [event.target.name]: event.target.value
        });
    };
    // for rendering data one time
    useEffect(() => {
        fetchdata(baseUrl + '/coupan/');
        setaddCoupanData({
            ...addCoupanData,
        });
    }, []);
    // for add submit data
    const submitHandler = () => {
        // // validation
        if (addCoupanData.code == '') {
            setErrorMsg("code field may not be blank");
            setSuccessMsg("");
            return;
        }
        if (addCoupanData.discount_type == '') {
            setErrorMsg("is not a valid choice.");
            setSuccessMsg("");
            return;
        }
        if (addCoupanData.discount_type == '') {
            setErrorMsg("is not a valid choice.");
            setSuccessMsg("");
            return;
        }
        if (!Number.isInteger(parseInt(addCoupanData.discount_value))) {
            setErrorMsg("Please enter a valid number.");
            setSuccessMsg("");
            return;  // Stop further processing
        }
        // send data to server
        const formData = new FormData();
        formData.append('code', addCoupanData.code);
        formData.append('discount_type', addCoupanData.discount_type)
        formData.append('discount_value', addCoupanData.discount_value);
        formData.append('minimum_order_value', addCoupanData.minimum_order_value);
        formData.append('start_date', addCoupanData.start_date);
        formData.append('expire_date', addCoupanData.expire_date);
        // submit data form
        axios.post(baseUrl + '/coupan/', formData)
            .then(function (response) {
                if (response.status == 201) {
                    setaddCoupanData({
                        'code': '',
                        'discount_type': '',
                        'discount_value': '',
                        'minimum_order_value': '',
                        'start_date': '',
                        'expire_date': ''
                    });
                    setErrorMsg('');
                    setSuccessMsg('New coupan added successfully!!');
                } else {
                    setSuccessMsg('');
                    setErrorMsg('Oops something went to wrong!!please try again later!!');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // fetch all coupan list
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setallCoupanList(data);
            });
    }
    // For delete coupan button
    function showConfirm(coupan_id) {
        var _confirm = window.confirm("Are you sure you want to delete this coupan")
        if (_confirm) {
            fetch(baseUrl + '/coupan/' + coupan_id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status == 204) {
                        fetchdata(baseUrl + '/coupan/');
                    }
                });
        }
    }
    // For coupan status
    function changeCoupanStatus(coupan_id, status) {
        fetch(baseUrl + '/coupan-modify/' + coupan_id + '/', {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'active': status })
        })
            // .then((response) => response.json())
            .then(function (response) {
                if (response.status == 200) {
                    fetchdata(baseUrl + '/coupan/');
                }
            });
    }
    return (
        <>
            <section>
                <div className='row ms-5 mt-5'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <AdminSidebar />
                    </div>
                    <div className='container bg-secondary mt-3 mb-4 w-50'>
                        <h3 className="mb-3 text-light">Add Coupan</h3>
                        {SuccessMsg && <p className='text-success bg-white'><strong>{SuccessMsg}</strong></p>}
                        {ErrorMsg && <p className='text-danger bg-white'><strong>{ErrorMsg}</strong></p>}
                        <Form className='text-light w-61'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlForr='code'>Coupan Code</Form.Label>
                                <Form.Control name='code' onChange={inputHandler} value={addCoupanData.code} type="text" id='code' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label htmlFor='discount_value'>Discount Type</Form.Label>
                                <select onChange={inputHandler} className="form-select" aria-label=".form-select-sm example" value={addCoupanData.discount_type} name='discount_type'>
                                    <option selected>Select discount_type</option>
                                    <option value='percentage'>Percentage</option>
                                    <option value='fixed_amount'>Fixed Amount</option>
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label htmlFor='discount_value'>Discount Value</Form.Label>
                                <Form.Control name='discount_value' onChange={inputHandler} value={addCoupanData.discount_value} type="number" id='discount_value' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='minimum_order_value'>minimum_order_value</Form.Label>
                                <Form.Control name='minimum_order_value' onChange={inputHandler} value={addCoupanData.minimum_order_value} type="number" id='minimum_order_value' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='start_date'>Start Date</Form.Label>
                                <Form.Control name='start_date' onChange={inputHandler} value={addCoupanData.start_date} type="datetime-local" id='start_date' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label htmlFor='expire_date'>Expire Date</Form.Label>
                                <Form.Control name='expire_date' onChange={inputHandler} value={addCoupanData.expire_date} type="datetime-local" id='start_date' />
                            </Form.Group>
                            <Button className='mb-2 mt-2 item-center' variant="primary" onClick={submitHandler} type="button">
                                Add Coupan
                            </Button>
                        </Form>
                    </div>
                    <div>
                        <div className='col-md-11 mb-2 bg-secondary'>
                            <h5 className='text-light'>All Coupans</h5>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>C_id</th>
                                            <th>C_code</th>
                                            <th>Dis_type</th>
                                            <th>Dis_Val</th>
                                            <th>Min_Ord_Val</th>
                                            <th>S_date</th>
                                            <th>E_date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allCoupanList.map((item, index) => <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.code}</td>
                                                <td>{item.discount_type}</td>
                                                <td>{item.discount_value}</td>
                                                <td>{item.minimum_order_value}</td>
                                                <td>{item.start_date}</td>
                                                <td>{item.expire_date}</td>
                                                <td>
                                                    {
                                                        item.active && <span className='text-success'><i className='fa fa-check-circle'></i>Completed</span>
                                                    }

                                                    {
                                                        !item.active && <span className='text-danger'><i className='fa fa-spinner fa-spin  text-dark'></i>Pending</span>
                                                    }
                                                </td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            Change Status
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>
                                                                {
                                                                    !item.active && <a className='text-decoration-none text-success' href='#' onClick={() => changeCoupanStatus(item.id, true)}>Complete</a>
                                                                }
                                                                {
                                                                    item.active && <a className='text-decoration-none text-danger' href='#' onClick={() => changeCoupanStatus(item.id, false)}>Pending</a>
                                                                }
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                    <button onClick={() => showConfirm(item.id)} className='btn btn-danger btn-sm mt-2'>Delete</button>
                                                    <Link to={`/admin/update-coupan/${item.id}`}  className='btn btn-success btn-sm ms-2 mt-2'>Edit</Link>
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default AllCoupanlist;