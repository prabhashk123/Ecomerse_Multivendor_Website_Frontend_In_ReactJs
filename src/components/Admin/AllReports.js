import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
function AllReports() {
    return (
        <>
            <div className='container mt-5'>
                <div className='row mt-3'>
                    <div className='col-md-3 col-12 mt-3 mb-2'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9 col-12 mb-2 mt-3'>
                        <div className='row'>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Daily Order</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 mb-2'>
                                <div className='card'>
                                <div className='card-body text-center'>
                                        <h4>Monthly Order</h4>
                                        <h4><Link to='/seller/monthly-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 mb-2'>
                                <div className='card'>
                                <div className='card-body text-center'>
                                        <h4>Yearly Order</h4>
                                        <h4><Link to='/seller/yearly-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Daily ProductsUploads</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Monthly ProductsUploads</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Yearly ProductsUploads</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Daily CategoryUploads</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Monthly CategoryUploads</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>Yearly CategoryUploads</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>All Yearly CustomerRating</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 mb-2'>
                                <div className='card'>
                                    <div className='card-body text-center'>
                                        <h4>All Yearly VendorRatings</h4>
                                        <h4><Link to='/seller/daily-report' className='btn btn-primary btn-sm'>View</Link></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default AllReports;