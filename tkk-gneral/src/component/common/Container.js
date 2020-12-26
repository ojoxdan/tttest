import React, { Fragment, useContext, useEffect } from "react";
import TinkokoBuyer from "../pages/TinkokoBuyer";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AuthState, { AuthContext } from "../context/authContext/AuthState";
import Header from "./Header";
import Footer from "./Footer";
import DropDownCart, { CartState } from "./DropDownCart";
import AlertState from "../context/alertContext/AlertState";
import SiteStatusInfo from "./SiteStatusInfo";
import CheckOutState from "../pages/single-pages/checkout/CheckOutState";

const Container = () => {
  const authCxt = useContext(AuthContext);
  useEffect(() => {
    authCxt.loadUser();
  }, []);
  return (
    <AlertState>
      <CartState>
        <CheckOutState>
          <Header />
          <TinkokoBuyer />
          <SiteStatusInfo />
          <Footer />
        </CheckOutState>
      </CartState>
    </AlertState>
  );
};
export default Container;
