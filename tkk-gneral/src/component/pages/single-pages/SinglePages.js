import React from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import Orders from '../buy-now-purchases/Orders'
import RegularPostPage from "./posts/RegularPostPage";

const SinglePages = () => {
  return (
    <Router>
      {/* <Switch>
        <Route path="/posts/:buy-now/*" component={SingleProduct} />
        <Route path="/posts/:regular/*" component={RegularPostPage} />
        <Route path="/posts/:jobs/*" component={SingleProduct} />
      </Switch> */}
    </Router>
  );
};

export default SinglePages;
