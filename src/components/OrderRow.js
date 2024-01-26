import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function OrderRows(props) {
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const baseUrl = 'http://127.0.0.1:8000';
    const index = props.index;
    const item = props.item;
    const [totalDownloads, settotalDownloads] = useState(item.product.downloads);

    // function for downloads
    const countDownloads = (product_id) => {
        // console.log(product_id);
        // send data to server
        const formData = new FormData();
        formData.append('product_id', product_id)
        console.log(formData)
        // submit data form
        axios.post(baseApiUrl + '/update_product_download_count/' + product_id)
            .then(function (response) {
                console.log(response.data);
                if (response.data.bool == true) {
                    settotalDownloads(++item.product.downloads);
                    window.open(
                        baseUrl + item.product.product_file,
                        '_blank'
                    );
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <tr>
            <td>{index+1}</td>
            <td>{item.order.id}</td>
            <td>
                <Link to={`/product/${item.product.slug}/${item.product.id}`}>
                    <img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width='80' alt="..." /></Link>
                <p><Link to={`/product/${item.product.slug}/${item.product.id}`}>{item.product.title}</Link></p>
            </td>
            <td>Rs. {item.product.price}</td>
            <td><span>
                {
                    item.order.order_status == true && <i className='fa fa-check-circle text-success'></i>
                }
                {
                    item.order.order_status == false && <i className='fa fa-spinner fa-spin  text-dark'></i>
                }
            </span>
            </td>
            <td>
                {
                    item.order.order_status == true && <button onClick={() => countDownloads(item.product.id)} className='btn btn-primary btn-sm'>Download<span className='badge bg-white text-dark'>{totalDownloads}</span></button>
                }
                {
                    item.order.order_status == true && <Link className='btn btn-success btn-sm ms-1 my-1' to={`/customer/add-review/${item.product.id}`}>Add Review</Link>
                }
            </td>
        </tr>

    )
}
export default OrderRows;