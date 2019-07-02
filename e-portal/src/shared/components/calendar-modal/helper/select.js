import React from "react";

const Select = props => {
    const {
        name,
        onChangeHandle,
        className,
        errorMessage,
        placeHolder
    } = props;
    return (
        <div className="form-group">
            <select className={className} onChange={onChangeHandle} name={name}>
                <option value="">Select</option>
                <option value={"15m"}> 15 minutes</option>
                <option value={"30m"}> 30 minutes</option>
                <option value={"1h"}> 1 hour</option>
                <option value={"2h"}> 2 hours</option>
            </select>
            <div className="c-error">{errorMessage}</div>
        </div>
    );
};

export default Select;
