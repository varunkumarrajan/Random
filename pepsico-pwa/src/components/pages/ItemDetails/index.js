import React, { Component } from "react";
import styled from "styled-components";
import {Product} from "../../../components";

const product = {
  tabs: {
    tabs : [
      {
        title: 'SPECIFICATION',
        content: {
          heading: 'Specification',
          subheading: ''
        }      
      },
      {
        title: 'NUTIRITION',
        content: {
          heading: 'NUTRIENT LEVELS FOR 100G',
          subheading: 'Serving Size 1 package | Servings Per Container 50'
        }      
      },
      {
        title: 'DIETRY',
        content: {
          heading: 'Dietry',
          subheading: ''
        }      
      }
    ],
    defaultActiveKey: 'NUTIRITION'
  },
  productDetails: {
    desc: '',
    img: '',
    barcode: '',
    title: '',
    code: '',
    count: '',
    rating: '',
    remain: ''
  }
}

class ItemDetails extends Component {
  state = {};
  render() {
    return <Product product={product}/>;
  }
}

export default ItemDetails;
