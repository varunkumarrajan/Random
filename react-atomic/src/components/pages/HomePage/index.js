// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import {
  PageTemplate,
  Header,
  Footer,
  CardBox,
  LeftNavigation
} from "../../../components";

class HomePage extends Component {
  state = {
    collapsedStatus: false
  };
  onLeftNavCollapse = () => {
    this.setState({ collapsedStatus: !this.state.collapsedStatus });
  };
  render() {
    return (
      <PageTemplate
        header={
          <Header
            onLeftNavCollapse={this.onLeftNavCollapse}
            collapsedStatus={this.state.collapsedStatus}
          />
        }
        footer={<Footer />}
        leftNavigation={
          <LeftNavigation
            collapsedStatus={this.state.collapsedStatus}
            breakPoint={1024}
            containerWidth={250}
            responsive={true}
          />
        }
      >
        <Row>
          <Col xs={12} lg={6}>
            <CardBox width="100%" responsive="true" breakpoint={768}>
              Feature List
            </CardBox>
          </Col>
          <Col xs={12} lg={6}>
            <CardBox width="100%" responsive="true" breakpoint={768}>
              Feature List
            </CardBox>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default HomePage;
