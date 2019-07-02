import React from "react";

import styled from "styled-components";
import { palette } from "styled-tools";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const StyledTabs = styled(Tabs)` 
  .nav,
  .nav-tabs,
  .nav-link {    
    text-align: center;
    margin-bottom: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0.3rem;
    :hover {
      border: 0px solid transparent;
      border-bottom: 1px solid
    }
    &.active {
      border: 0px solid transparent;
      border-bottom: 1px solid
    }
  }
`;

function ProductTabs(props) {
  const {tabs} = props  
  return (
    <StyledTabs
      defaultActiveKey={tabs.defaultActiveKey} transition={false}
      >
      {tabs && tabs.tabs.map((tab,ind) => {
        return (
          <Tab key={ind} eventKey={tab.title} title={tab.title}>
            <Content content={tab.content} />
          </Tab>
        )
      })}     
    </StyledTabs>
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
