import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  createContext,
} from "react";
import PostReducer from "./PostReducer";

export const PostContext = createContext();
const { Provider } = PostContext;

const PostState = (props) => {
  const initialState = {
    post: {},
  };
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const setValue = (obj = {}) => {
    dispatch({ type: "SET_STATE", payload:{...obj} });
  };
  return <Provider value={{ setValue, state }}>{props.children}</Provider>;
};

export default PostState;
