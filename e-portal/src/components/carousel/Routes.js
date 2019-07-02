import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Carousel from './Carousel';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/carousel" component={Carousel} exact />
      </Switch>
    </Router>
  )
}

export default Routes
