import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


class Dislike extends Component {
    state = {
        isActive: false
    }
    componentDidMount() {
        const userDislike = this.props.userDislike;
        // console.log('dislike component')
        this.setState({isActive: (userDislike ? true: false)});
    }
    componentWillReceiveProps(nextProps) {
        // Load new data when the dataSource property changes.
        // console.log('dislike receive props', nextProps)
        if (nextProps.userDislike != this.props.userDislike) {
            this.setState({isActive: (nextProps.userDislike ? true: false)});
            
        }
    }
    render() {
        const {isDisabled, onDislike, totalDislike} = this.props;
        return (
            <React.Fragment>
                <button className={classnames('btn btn-transparent', {linkActive: this.state.isActive})} disabled={isDisabled} onClick={()=> onDislike()}>
                    <i className="fas fa-thumbs-down" />
                    {(totalDislike > 0 || totalDislike === 0) && (
                        <span>{totalDislike}</span>
                    )}
                </button>
            </React.Fragment>
        )
    }
}
Dislike.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    onDislike: PropTypes.func.isRequired,
    totalDislike: PropTypes.number,
    userDislike: PropTypes.number
};
export default Dislike;