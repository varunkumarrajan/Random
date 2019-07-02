import React, { Component } from 'react'

class Filter extends Component {

    filter = (event) => {
        if(this.props.content.length > 0){
            let updatedList = this.props.content.filter( item => { 
                const title = (item.title) ? item.title : item.notificationDesc           
                return title.toLowerCase().search(
                    event.target.value.toLowerCase() 
                ) !== -1
            })
            this.props.filterContent(updatedList)
        }
    }
    
    render = () => {  
        const style = {
            fontFamily: 'Helvetica,FontAwesome,sans-serif'
        }
        return (
            <div className="col-sm-12 col-md-6 col-lg-4" style={{marginLeft:'auto',marginRight:'auto'}}>
                <div className="card">
                    <input type="text" className="form-control" style={style} placeholder="&#xF002; Search by Title" onChange={this.filter}/>
                </div>
            </div>
        );
    }
}
export default Filter
