import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import {
  Catalog,
  ItemDetails,
  NotFoundPage,
  PageTemplate,
  Header,
  CardBox,
  LeftNavigation
} from "../components";
import Footer from './pages/footer'
import theme from "./themes/default";
const links = [
  {icon: 'fa fa-adjust', name: 'OCCUPANCY'},
  {icon: 'fa fa-heart', name: 'HEALTY'},
  {icon: 'fa fa-adjust', name: 'TASTY'},
  {icon: 'fa fa-star', name: 'FAVORITE'},
  {icon: 'fa fa-asterisk', name: 'ALL'}
  ]
class App extends Component {
  state = {
    collapsedStatus: true
  };
  onLeftNavCollapse = () => {
    this.setState({ collapsedStatus: !this.state.collapsedStatus });
  };
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PageTemplate
          header={
            <Header
              onLeftNavCollapse={this.onLeftNavCollapse}
              collapsedStatus={this.state.collapsedStatus}
            />
          }
          footer={<Footer links={links}/>}
          leftNavigation={
            <LeftNavigation
              collapsedStatus={this.state.collapsedStatus}
              breakPoint={1024}
              containerWidth={250}
              responsive={true}
            />
          }
        >
          <Switch>
            <Route path="/" component={Catalog} exact />
            <Route path="/item-details" component={ItemDetails} />
            <Route component={NotFoundPage} />
          </Switch>
        </PageTemplate>
      </ThemeProvider>
    );
  }
}

export default App;
