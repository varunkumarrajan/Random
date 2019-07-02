import React, { Component } from 'react'
import NavBar from './../Navigation/Navigation'

class NotifyStudent extends Component {
    
    render = () => {
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="col-12 col-md-12 col-xl-12 padding-zero">
                        <NavBar/>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotifyStudent

