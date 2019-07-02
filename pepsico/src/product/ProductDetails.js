import React from "react";
import Badge from "react-bootstrap/Badge";

import StarRatingComponent from "react-star-rating-component";

import Lays from "./lays-classic.png";
import Barcode from "./barcode.png";

function ProductDetails(props) {
  const {productDetails: {img,title,code,count,rating,barcode,remain}} = props;
  return (
    <div className="content">
      <div className="content-items">
        <img className="content-image" src={img || Lays} alt="chips" />
      </div>
      <div className="content-items">
        <div className="content-details">
          <h6>{title || "LAY'S - PAPRIKA"}</h6>
          <h6>
            <small>{code || "120gr/4.23oz"}</small>
          </h6>
          <h6>
            <small>
              <span className="count-set">{count || 200} &nbsp;</span>
              <StarRatingComponent
                editing={false}
                name="rate1"
                starCount={5}
                value={rating || 4}
              />
            </small>
          </h6>
        </div>
        <div className="content-bottom">
          <img src={barcode || Barcode} alt="barcode" width="100%" height="50" />
        </div>
      </div>
      <div className="content-items">
        <div className="content-bottom">
          <Badge className="border-r" variant="success">
            {remain || "100%" }
          </Badge>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
