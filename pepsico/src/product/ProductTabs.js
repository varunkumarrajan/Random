import React from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

function ProductTabs(props) {
  const {tabs} = props  
  return (
    <Tabs defaultActiveKey={tabs.defaultActiveKey} transition={false}>
      {props.tabs && tabs.tabs.map((tab,ind) => {
        return (
          <Tab key={ind} eventKey={tab.title} title={tab.title}>
            <Content content={tab.content} />
          </Tab>
        )
      })}     
    </Tabs>
  );
}
function Content(props) {
    const { content } = props;
    return (
        <div className="content-items">
            <h6 className="content-items-heading">{content.heading}</h6>
            <p className="content-items-subheading">{content.subheading}</p>
        </div>
    )
}

/* function Nutrition() {
    return (
        <div className="content-items">
            <h6 className="content-items-heading">NUTRIENT LEVELS FOR 100G</h6>
            <p className="content-items-subheading">Serving Size 1 package | Servings Per Container 50</p>
        </div>
    )
}
function Dietry() {
    return (
        <div className="content-items">
            <h6 className="content-items-heading">Dietry</h6>
        </div>
    )
}
 */
export default ProductTabs;
