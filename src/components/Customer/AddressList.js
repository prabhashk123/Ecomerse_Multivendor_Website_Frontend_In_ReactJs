import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function AddressList() {
    const configs=require('../../utils/Configs'); 
    const baseUrl=configs.URL;
    var customer_id = localStorage.getItem('customer_id');
    const [AddressList, setAddressList] = useState([]);

    useEffect(() => {
        fetchdata(baseUrl + '/customer/' + customer_id + '/address-list/');
    }, []);

    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setAddressList(data);
                // console.log(data);
            });
    }
    // console.log(AddressList);

    // For default mark address
    function DefaultAddressHandler(address_id){
        const formData = new FormData();
        formData.append('address_id',address_id);

        // submit data
        axios.post(baseUrl + '/mark-default-address/' + parseInt(address_id) + '/', formData)
            .then(function (response) {
                console.log(response);
                if (response.data.bool==true) {
                    window.location.reload()
                   
                } else {
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 col-12 mb-2 mt-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9 col-12 mt-3'>
                        <div className='row'>
                            <div className='col-12'>
                                <Link to='/customer/add_address' className='btn btn-outline-success mb-4 float-end'>
                                    <i className='fa fa-plus-circle'></i> Add Address
                                </Link>
                            </div>
                        </div>
                        <div className='row'>
                            {
                                AddressList.map((address, index) => {
                                    return <div className='col-4 mb-2'>
                                        <div className='card'>
                                            <div className='card-body bg-secondary text-white'>
                                                <h6>
                                                    {
                                                        address.default_address ==true && <span><i className='fa fa-check-circle bg-light text-success mb-2'></i><br /></span>
                                                    }
                                                     {
                                                        !address.default_address && <span onClick={()=>DefaultAddressHandler(address.id)} role='button'><i className='fa fa-check-circle bg-light text-secondary mb-2'></i><br /></span>
                                                    }
                                                    <Link className='text-light text-decoration-none' to={`/customer/update-address/${address.id}`}>{address.address}</Link>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AddressList;