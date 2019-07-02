import React,  { Component } from 'react';

import StarRatingComponent from 'react-star-rating-component';

const SliderItem = (props) => {
    const { children } = props;
    // console.log('childre', props)
    return (
        <li className="slider-item">
            {children}
        </li>
    )
}
export default SliderItem;