import React, { useReducer, createContext } from "react";
import { v4 as uuid4 } from "uuid";
import AlertReducer from "./AlertReducer";
import { REMOVE_ALERT, SET_ALERT } from "../ReducerTypes";

export const AlertContext = createContext();
const { Provider } = AlertContext;

const AlertState = ({ children }) => {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // set alert for each response
  const setAlert = (type, message) => {
    let id = uuid4();
    dispatch({ type: SET_ALERT, payload: { message, id, type } });

    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  };

  // remove alert or notification info after certain time out

  const removeAlert = (id) => {
    dispatch({ type: REMOVE_ALERT, payload: { id } });
  };

  return (
    <Provider value={{ setAlert, alertState: state }}>{children}</Provider>
  );
};

export default AlertState;
