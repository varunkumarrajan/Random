import React from 'react';
import Footer from './footer'
import Product from './product'
const links = [
  {icon: 'fa fa-adjust', name: 'OCCUPANCY'},
  {icon: 'fa fa-heart', name: 'HEALTY'},
  {icon: 'fa fa-adjust', name: 'TASTY'},
  {icon: 'fa fa-star', name: 'FAVORITE'},
  {icon: 'fa fa-asterisk', name: 'ALL'}
  ]
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
function App() {
  return (
    <>
    <Product product={product}/>
    <Footer links={links}/>
    </>
  );
}

export default App;
