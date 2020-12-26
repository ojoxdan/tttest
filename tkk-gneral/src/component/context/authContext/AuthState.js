import React, { useEffect, useContext, useReducer, createContext } from "react";
import io from "socket.io-client";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import { SET_TYPE, LOAD_USER_ERROR, USER_LOADED } from "../ReducerTypes";
import { AlertContext } from "../alertContext/AlertState";
import setAuthToken from "../../../utils/setAuthToken";

export const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthState = ({ children }) => {
  const initialState = {
    user: {},
    isAuthenticated: false,
    token: null,
    isLoading: true,
    socket: {},
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { setAlert } = useContext(AlertContext);
  useEffect(() => {}, []);

  useEffect(() => {
    if (state.token) {
      let sock = io("http://104.131.57.131:5000", {
        query: { token: state.token },
      });
      sock.on("connect", () => {
        if (sock.io) {
          setValue({ socket: sock });
        }
        sock.on("USER_NOTIFICATION", (data) => {
          console.log(data, " the socket notification ");
        });
      });
    }
  }, [state.token]);

  // set user token
  const setToken = (token) => {
    dispatch({ type: SET_TYPE, payload: { token } });
  };

  // set new state property value
  const setValue = (obj = {}) => {
    dispatch({ type: "SET_STATE", payload: obj });
  };
  // Authenticate user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      let res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
      console.log(res, "the user auth state content");
    } catch (error) {
      dispatch({ type: LOAD_USER_ERROR });
    }
  };

  const Logout = async () => {
    localStorage.removeItem("token");
    await dispatch({ type: "LOGOUT", payload: { initialState } });
    await loadUser();
  };
  // Register new user
  const Register = async (userData = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/register", true);
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText), " the response text ");
        if (xhr.status === 200 && JSON.parse(xhr.responseText).success) {
          let res = JSON.parse(xhr.responseText);
          setToken(res.token);
          loadUser();
        } else if (
          xhr.status !== 200 &&
          JSON.parse(xhr.responseText).error &&
          Array.isArray(JSON.parse(xhr.responseText).error)
        ) {
          if (xhr.responseText) {
            if (JSON.parse(xhr.responseText)) {
              if (JSON.parse(xhr.responseText).error) {
                let errors = JSON.parse(xhr.responseText).error;
                console.log(errors, " errors ");
                errors.forEach((err) => {
                  setAlert("danger", err.msg);
                });
              }
            }
          }
        } else {
          if (JSON.parse(xhr.responseText).error) {
            setAlert("danger", JSON.parse(xhr.responseText).error.msg);
          }
        }
      }
    };
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(userData));
  };

  // Login returning user

  const userLogin = async (userData) => {
    try {
      let res = await axios.post("/api/login", userData);
      // console.log(res, "ok login function ");

      if (res.data.success) {
        setToken(res.data.success.token);
        loadUser();
      } else if (res.data.error) {
        if (res.data.error.msg) {
          setAlert("danger", res.data.error.msg);
        }
        console.log(res.data, "the res data from the login ");
      }
    } catch (error) {
      console.log(error, " the error while trying to login");
    }
  };
  // forgotten password

  // Sign out

  return (
    <Provider
      value={{
        Register,
        userLogin,
        loadUser,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        socket: state.socket,
        Logout,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthState;
