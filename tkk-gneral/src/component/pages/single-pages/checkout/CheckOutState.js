import React, { useContext, useEffect, createContext, useReducer } from "react";
import CheckOutReducer from "./CheckOutReducer";
import getCartItems from "../../../utils/getCartItems";
import removeFromCart from "../../../utils/removeFromCart";
import { CartContext } from "../../../common/DropDownCart";
export const CheckOutContext = createContext();
const { Provider } = CheckOutContext;

const CheckOutState = (props) => {
  const initialState = {
    cartItems: [],
    orderTotal: 0,
    shippingTotal:5600,
    selectedItems: [],
    currentTab: "",
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    address: null,
    city: null,
    state: null,
    country: null,
    completedOrder: [],
  };

  const cartCxt = useContext(CartContext);
  const [state, dispatch] = useReducer(CheckOutReducer, initialState);

  useEffect(() => {
    // setOrderTotal
    setToDefaultCart()
  }, [state.cartItems.length, state.completedOrder.length]);

  const setValue = (obj = {}) => {
    dispatch({ type: "SET_STATE", payload: { ...obj } });
  };

  const setToDefaultCart = () => {
    dispatch({
      type: "SET_STATE",
      payload: { cartItems: getCartItems().cartItems },
    });
    dispatch({
      type: "SET_STATE",
      payload: { selectedItems: getCartItems().cartItems },
    });
    dispatch({
      type: "SET_STATE",
      payload: {
        orderTotal: (() => {
          if (state.cartItems) {
            let total = 0;
            state.cartItems.forEach((order) => {
              total = total + parseInt(order.price);
            });
            return total;
          }
          return 0;
        })(),
      },
    });
    if (state.completedOrder.length) {
      for (let i = 0; i < state.selectedItems.length; i++) {
        let o = state.selectedItems[i];
        removeFromCart(o.id);
        console.log(" all the cart has been removed ");
      }
    }
  };

  const unMarkItem = (itemid) => {
    let basket = [];
    // setOrderTotal(0)
    dispatch({ type: "SET_STATE", payload: { orderTotal: 0 } });
    for (let i = 0; i < state.cartItems.length; i++) {
      if (state.cartItems[i].id !== itemid) {
        basket.push(state.cartItems[i]);
        dispatch({
          type: "SET_STATE",
          payload: {
            orderTotal: state.orderTotal + parseInt(state.cartItems[i].price),
          },
        });
      }
    }
    dispatch({ type: "SET_STATE", payload: { selectedItems: basket } });
  };

  const markItem = (itemid) => {
    let basket = [];
    for (let i = 0; i < state.selectedItems.length; i++) {
      if (state.selectedItems[i].id === itemid) {
        basket.push(state.selectedItems[i]);
      }
    }

    if (!basket.length) {
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id === itemid) {
          basket.push(state.cartItems[i]);
          // setOrderTotal(orderTotal + parseInt(state.cartItems[i].price))
          dispatch({
            type: "SET_STATE",
            payload: {
              orderTotal: state.orderTotal + parseInt(state.cartItems[i].price),
            },
          });
        }
      }
      dispatch({
        type: "SET_STATE",
        payload: { selectedItems: [...state.selectedItems, ...basket] },
      });
    }
  };
  const calculateTotal = () => {
    let basket = [];
    if (!Array.isArray(state.selectedItems) && state.selectedItems.length > 0)
      return;
    basket = state.selectedItems;
    let orderTotal = 0
      for (let i = 0; i < basket.length; i++) {
        orderTotal = parseFloat(basket[i].price) + parseFloat(orderTotal) 
      }
      dispatch({
        type: "SET_STATE",
        payload: { orderTotal },
      });
    
  };
  const calculateShippingCost = () => {
    let basket = [];
    if (!Array.isArray(state.selectedItems) && state.selectedItems.length > 0)
      return;
    basket = state.selectedItems;
    let shippingTotal = 0
      for (let i = 0; i < basket.length; i++) {
        shippingTotal = parseFloat(basket[i].shipping_cost) + parseFloat(shippingTotal) 
      }
      dispatch({
        type: "SET_STATE",
        payload: { shippingTotal },
      });
    
  };

  const removeItem = (id) => {
    let newItems = [];
    for (let i = 0; i < state.cartItems.length; i++) {
      let c = state.cartItems[i];
      if (c.id !== id) {
        newItems.push();
      }
    }
    setValue({ cartItems: newItems });
    cartCxt.removeItem(id);
    return true;
  };

  return (
    <Provider
      value={{
        setToDefaultCart,
        calculateTotal,
        calculateShippingCost,
        unMarkItem,
        markItem,
        setValue,
        removeItem,
        state,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default CheckOutState;
