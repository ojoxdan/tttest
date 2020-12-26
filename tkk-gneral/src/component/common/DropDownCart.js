import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import getCartItems from "../utils/getCartItems";
import removeFromCart from "../utils/removeFromCart";
import nairaFormartter from "../utils/nairaFormartter";
import { createContext } from "react";
import { useContext } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export const CartContext = createContext();
export const CartState = (props) => {
  const initialState = {
    cartItems: [],
    noOfCartItems: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const setValue = (obj = {}) => {
    dispatch({ type: "SET_STATE", payload: obj });
  };

  const itemExist = (id) =>{
    for (let i = 0; i < state.cartItems.length; i++) {
      let c = state.cartItems[i];
      if (c.id === id) {
        return true
      }
    }
    return false
  }

  const removeItem = (id) =>{
    let newItems = []
    for (let i = 0; i < state.cartItems.length; i++) {
      let c = state.cartItems[i];
      if (c.id !== id) {
        newItems.push()
      }
    }
    // removeFromCart(item._id)
    removeFromCart(id)
    setValue({cartItems:newItems})
    setValue({noOfCartItems:newItems.length})
    return true
  }
  return (
    <CartContext.Provider value={{ setValue, state, itemExist, removeItem }}>
      {props.children}
    </CartContext.Provider>
  );
};

export const DropDownCart = () => {
  const cartCxt = useContext(CartContext)
  const {setValue, state} = cartCxt
  const {cartItems, noOfCartItems} = state
  useEffect(() => {
    setValue({cartItems:getCartItems().cartItems})
    setValue({noOfCartItems:getCartItems().noOfItems})
  }, []);
  return (
    <li className="cart-link dropdown-body">
      <button
        onClick={(el) => {
          let droppy = document.querySelector(".cart-dropdown-content");
          if (droppy) {
            droppy.classList.toggle("show");
          }
        }}
        className="dropdown-body"
      >
        <i className="fa fa-cart-plus"></i> Cart
        <span>{noOfCartItems}</span>
      </button>
      {noOfCartItems > 0 && (
        <div className="cart-dropdown-content">
          {cartItems &&
            cartItems.map((p, key) => (
              <div className="single-cart-item" key={key}>
                <div className="media">
                  <img className="img-fluid" src={p.image} alt="" />

                  <div className="media-body">
                    <h6>{p.title}</h6>
                    <p> {nairaFormartter(p.price)} / per basket</p>
                  </div>
                </div>

                <a
                  to="#"
                  className="remove-cart-item"
                  onClick={(e) =>{
                    e.preventDefault()
                    removeFromCart(p.id)
                    cartCxt.removeItem(p.id)
                    
                  }}
                >
                  <i className="far fa-times-circle"></i>
                </a>
              </div>
            ))}
          <div className="proceed">
            <a href="/checkout" className="proceed-to-checkout">
              Proceed to checkout
            </a>
          </div>
        </div>
      )}
    </li>
  );
};

export default DropDownCart;
