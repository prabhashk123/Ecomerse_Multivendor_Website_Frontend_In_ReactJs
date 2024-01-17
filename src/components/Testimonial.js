
import Carousel from 'react-bootstrap/Carousel';
// import { Carousel } from 'react-bootstrap';

function Testimonial(props) {
    const index = props.index;
    const item = props.item;
    // for first slide active
    var _class = '';
    if (index == '0') {
        _class = 'active'
    }
    // stars
    var _stars = [];
    for (let i = 0; i < item.rating; i++) {
        _stars.push('1');
    }

    return (
        <Carousel>
            <Carousel.Item className={`carousel-item${_class}`}>
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>{item.reviews}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer mb-5">
                        {
                            _stars.map((item, index) => <i className='fa fa-star text-warning'></i>)
                        }
                        <cite title="Source Title"> {`${item.customer.user.frist_name} ${item.customer.user.last_name}`}</cite>
                    </figcaption>
                </figure>
            </Carousel.Item>
        </Carousel>

    )
}
export default Testimonial;