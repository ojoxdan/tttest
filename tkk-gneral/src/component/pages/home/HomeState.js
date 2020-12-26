import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { AuthContext } from "../../context/authContext/AuthState";
import { useReducer } from "react";
import HomeReducer from "./HomeReducer";
import { useEffect } from "react";

export const HomeContext = createContext();
const HomeState = (props) => {
  const { Provider } = HomeContext;
  const authCxt = useContext(AuthContext);
  const initialState = {
    regions: [],
    categories: [],
    postsPerPage: [],
    products: [],
    countries: [],
    searchResult: [],
    promotedPosts: [],
    advertisements: [],
    jobs: [],
    postCount:0
  };
  const [state, dispatch] = useReducer(HomeReducer, initialState);

  const getPostByType = () => {};
  // Select Location
  const getLocations = (token) => {
    console.log("hey now available to get location");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/buyer/product-regions", true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              dispatch({ type: "SET_REGIONS", payload: res.success });
            }
            console.log(xhr.responseText, " Hello there ");
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  // Select Category

  const getCategories = (token) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/buyer/product-categories", true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              dispatch({ type: "SET_CATEGORIES", payload: res.success });
            }
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  // get promoted ads

  const getPromotedPosts = (limit) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/promoted-posts?&limit=${limit}`, true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              dispatch({ type: "SET_PROMOTED_POSTS", payload: res.success });
              console.log(
                JSON.parse(xhr.responseText).success,
                " the promoted response text is here "
              );
            }
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    xhr.send();
  };

  // get advertisements ads

  const getAdvertisements = (limit) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/advertisements?&limit=${limit}`, true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            console.log(res, "rest of the stuff ")
            if (res.success) {
              dispatch({ type: "SET_ADVERTISEMENTS", payload: res.success });
              console.log(
                JSON.parse(xhr.responseText).success,
                " the promoted response text is here "
              );
            }
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    xhr.send();
  };

  // get product (for now the buynow products )
  const getProducts = (url = "/api/posts") => {
    console.log("hey now available to get categories");
    if (!url) return;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/posts`, true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            console.log(res, " then home res ");
            if (res.success) {
              if (res.success.posts) {
                // return console.log(res.success.posts, " the success res from home ")
                dispatch({ type: "SET_PRODUCTS", payload: [...res.success.posts]});
                dispatch({type:"SET_STATE", payload:{postCount:res.success.count}})
              }
            }
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    xhr.send();
  };

  // get homepage jobs
  const getJobs = (url = "/api/posts/jobs") => {
    console.log("hey now available to get categories");
    if (!url) return;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            // return console.log(res, " the response text")
            if (res.success) {
              dispatch({ type: "SET_JOBS", payload: res.success });
            }
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    // xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  // get searc result (for now the buynow products )
  const getSearchResult = (category, query) => {
    console.log("hey now available to get categories");
    if (!category && query) return;
    let form = new FormData();
    form.append("category", category);
    form.append("query", query);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/search", true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              console.log(res, " this is the response text");
              dispatch({ type: "SET_SEARCH_RESULT", payload: res.success });
            }
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    xhr.send(form);
  };
  // get product (for now the buynow products )
  const getCountries = (token) => {
    console.log("hey now available to get countries");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/buyer/product-countries", true);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              dispatch({ type: "SET_COUNTRIES", payload: res.success });
            }
            console.log(xhr.responseText, " ISSUE ARRISNG ");
          }
        }
      } else {
        console.log(xhr.responseText, " all the responset text ");
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  // Sort Results by:
  // search products
  // promoted products
  // List all product from according to date
  // advertisment

  return (
    <Provider
      value={{
        getLocations,
        getCategories,
        getProducts,
        getCountries,
        getSearchResult,
        getPromotedPosts,
        getAdvertisements,
        getJobs,
        state,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default HomeState;
