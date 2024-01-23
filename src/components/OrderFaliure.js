import { Link } from 'react-router-dom';


function OrderFaliure() {
    return (

        <>
            <div className='container mt-5'>
                <div className='row mb-4 mt-3'>
                    <div className='col-md-8 offset-2 mt-3'>
                        <div className='card'>
                            <div className='card-body text-center'>
                                <p><i className='fa fa-times-circle text-danger fa-3x'></i></p>
                                <h3 className='text-danger'>Oops... Something wrong happened!</h3>
                                <p className='mt-3'>
                                    <Link to='/' className='btn btn-primary'>Home</Link>
                                    <Link to='/customer/dashboard' className='btn btn-secondary ms-2'>Dashboard</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default OrderFaliure;