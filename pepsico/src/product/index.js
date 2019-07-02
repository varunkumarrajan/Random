import React from "react";
import ProductDetails from './ProductDetails'
import ProductDescription from './ProductDescription'
import ProductTabs from './ProductTabs'
import './product.css';

function Product(props) {
  const {product:{tabs,productDetails}} = props
  return (
    <>
      <ProductDetails productDetails={productDetails}/>
      <ProductDescription desc={productDetails.desc}/>
      <ProductTabs tabs={tabs}/>
    </>
  );
}
export default Product
