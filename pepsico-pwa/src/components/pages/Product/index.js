import React from "react";
import styled from 'styled-components';

import ProductDetails from './ProductDetails'
import ProductTabs from './ProductTabs'
import './product.css';

const ProductBlock = styled.div`
  background-color: #fff;
  overflow: auto;
  height: calc(100vh - 115px);
`;
function Product(props) {
  const {product:{tabs}} = props
  return (
    <ProductBlock>
      <ProductDetails />      
      <ProductTabs tabs={tabs}/>      
    </ProductBlock>
  );
}
export default Product
