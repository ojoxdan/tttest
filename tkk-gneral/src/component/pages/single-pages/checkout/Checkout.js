import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import { useContext } from "react";
import { CheckOutContext } from "./CheckOutState";
import CheckOutPage from "./CheckOutPage";

function Checkout() {
  const chCxt = useContext(CheckOutContext);

  return (
    <>
        <CheckOutPage />
    </>
  );
}

export default Checkout;
