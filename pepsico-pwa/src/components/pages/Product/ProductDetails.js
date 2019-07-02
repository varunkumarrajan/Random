import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import styled from 'styled-components';

import ProductDescription from './ProductDescription'

import { StarRating } from "../../../components";

import Lays from "./lays-classic.png";
import Barcode from "./barcode.png";

const Link = styled.div`
  background-color: #fff;
  z-index:999;
  box-shadow: 1px 1px 1px 1px #dcd8d8;
  position: relative;
  top: 5px;
  left: 5px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-top-right-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
  border-top-left-radius: 50% !important;
  border-bottom-left-radius: 50% !important;
  text-align: center;
  font-size: 20px;
  padding: 0px;
  line-height: 1.3;
  font-weight: bolder;
`;
class ProductDetails extends Component {

  render() {
    console.log(this.props)
   const { imgsrc, title, code, quantity, rating, status, desc } = this.props.history.location.state.item;
   const color = (status < 50 && status > 30) ? 'warning' : (status > 50) ? 'success' : 'danger'
    return (
      <>
      <Link onClick={this.props.history.goBack}><i className="fa fa-angle-left"></i></Link>
      <div className="content">
        <div className="content-items">
          <img className="content-image" src={imgsrc || Lays} alt="chips" />
        </div>
        <div className="content-items">
          <div className="content-details">
            <h6>{title || "LAY'S - PAPRIKA"}</h6>
            <h6>
              <small>{code || "120gr/4.23oz"}</small>
            </h6>
            <h6>
              <small>
                <span className="count-set">{quantity || 200} &nbsp;</span>
                <StarRating
                  editing={false}
                  name="rate1"
                  starCount={5}
                  value={rating || 4}
                />
              </small>
            </h6>
          </div>
          <div className="content-bottom">
            <img
              src={Barcode}
              alt="barcode"
              width="100%"
              height="50"
            />
          </div>
        </div>
        <div className="content-items">
          <div className="content-bottom">
            <Badge className="border-r" variant={color}>
              {status || "100%"}
            </Badge>
          </div>
        </div>
      </div>
      <ProductDescription desc={desc}/>
      </>
    );
  }
}
export default withRouter(ProductDetails);
