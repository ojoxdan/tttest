import React, { useState, createContext, useEffect, useReducer } from "react";
import FavouriteReducer from "./FavouriteReducer";
import getFavorites from "../../utils/getFavorites";
import addToFavorite from "../../utils/addToFavorite";
export const FavouriteContext = createContext();
const { Provider } = FavouriteContext;

export const FavouriteState = (props) => {
  const initialState = {
    favourites: [],
    isFavourited: false,
  };
  const [state, dispatch] = useReducer(FavouriteReducer, initialState);

  const setValue = (obj = {}) => {
    dispatch({ type: "SET_STATE", payload: { ...obj } });
  };
  const getFavouriteds = () => {
    let faves = getFavorites();
    if (faves) {
      if (Array.isArray(faves)) {
        setValue({ favourites: faves });
      }
    }
  };
  const checkIsFavourited = (id) => {
    let isPresent = state.isFavourited.some((v) => v.id == id);
    if (isPresent) {
      setValue({ isFavourited: true });
    }
  };
  return (
    <Provider
      value={{
        state,
        setValue,
      }}
    >
      {props.chilren}
    </Provider>
  );
};

export default FavouriteState;
