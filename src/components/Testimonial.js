import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import { Carousel } from 'react-bootstrap';

function Testimonial(props) {
    // const index = props.index;
    // const item = props.item;
    const baseUrl = 'http://127.0.0.1:8000/api';
    // const baseImgUrl = 'http://127.0.0.1:8000';
    const [ReviewsList, setReviewsList] = useState([]);
    // const [Starlist, setStarlist] = useState(0);
    useEffect(() => {
        // but needs four products so set limits
        fetchTestimonialData(baseUrl + '/productrating/');
    }, []);
    function fetchTestimonialData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setReviewsList(data);
                // setStarlist(data)
            });
    }
    // stars
    // var _stars = [];
    // console.log(ReviewsList);
    // for (let i = 0; i < ReviewsList.rating; i++) {
    //     _stars.push('1');
    //     // console.log('starts',_stars)
    // }

    return (
        <Carousel>
            {
                ReviewsList.map((item, index) =>
                    <Carousel.Item key={index}>
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>{item.reviews}</p>
                            </blockquote>
                            <figcaption className="blockquote-footer mb-5">
                                {item.rating}
                                {/* {
                                    _stars.map((item, index) => <i className='fa fa-star text-warning'></i>)
                                } */}
                                <cite title="Source Title"> {`${item.customer.user.first_name} ${item.customer.user.last_name}`}</cite>
                            </figcaption>
                        </figure>
                    </Carousel.Item>
                )}
        </Carousel>
    )
}
export default Testimonial;