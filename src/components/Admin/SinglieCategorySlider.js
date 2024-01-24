import React, { useState, useEffect } from 'react';
// import logo from '../logo.svg'
import { Carousel } from 'react-bootstrap';

function SquareImageSlider() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const baseImgUrl = 'http://127.0.0.1:8000'
    const [catimg, setcatimg] = useState([]);
    useEffect(() => {
        fetchdata(baseUrl + '/categories');
    }, []);
    function fetchdata(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setcatimg(data);
            });
    };

    return (
        <Carousel>
            {
                catimg.map((image, index) =>
                    <Carousel.Item key={index}>
                        <img className="d-block"
                            src={`${baseImgUrl}/${image.cat_img}`} width={1500} height={300}
                            alt={`Slide ${index + 1}`}
                        />
                    </Carousel.Item>
                )}
        </Carousel>
    );
};

export default SquareImageSlider;