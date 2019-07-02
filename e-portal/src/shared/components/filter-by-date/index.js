import React, { Component } from 'react'
import './style.css';

class FilterByDate extends Component {

    state = {

    }


    changeOrderByDate = (e) => {
        this.props.onChangeDate(e.target.value);
    }

    render = () => {

        return (
            <>
                
               
                    <label className="col-lg-4">
                        Filter By Created date
                    </label>
                    <select
                        className="form-control col-lg-6"
                        id="filter-date"
                        style = {{display : 'inline'}}
                        onChange={this.changeOrderByDate}
                    >
                        <option>Ascending </option>
                        <option>Descending</option>
                    </select>
                
                
            </>
        );
    }
}

export default FilterByDate;



