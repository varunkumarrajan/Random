import React, { Component } from 'react';

import HorSlider from './HorSlider';

class TrayCarousel extends Component {
    componentDidMount(){}
    render() {
        const { headerTitle, carouselTop10Items } = this.props;
        // console.log('tray car childer', this.props.children)
        return (
            <div className="col-sm-12">
                <HorSlider 
                    carouselTop10Items={carouselTop10Items}>
                    <h4 className="mt-30 pad_top5">{headerTitle}</h4>
                    {this.props.children('hello shakir')}
                </HorSlider>
            </div>
        )
    }
}
export default TrayCarousel;