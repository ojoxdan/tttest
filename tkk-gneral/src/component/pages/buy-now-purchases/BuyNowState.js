import React, { useEffect, useContext, createContext, useReducer } from "react";
import BuyNowReducer from "./BuyNowReducer";

export const BuyNowContext = createContext();
const { Provider } = BuyNowContext;

const BuyNowState = (props) => {
  const initialState = {
    orders: [],
    order: [],
  };
  const [state, dispatch] = useReducer(BuyNowReducer, initialState);

  // get all order by this user
  const setValue = (obj = {}) => {
    dispatch({ type: "SET_STATE", payload: obj });
  };
  const getOrders = (token) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/buyer/orders", true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText).success;
            if (res) {
              console.log(res, " the order response text ");
              if (Array.isArray(res)) {
                dispatch({ type: "SET_ORDERS", payload: res });
              }
            }
          }
        }
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  return (
    <Provider value={{ getOrders, state, setValue }}>{props.children}</Provider>
  );
};

export default BuyNowState;
