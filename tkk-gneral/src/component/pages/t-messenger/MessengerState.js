import React, { useEffect, createContext, useReducer } from "react";
import MessengerReducer from "./MessengerReducer";

export const MessengerContext = createContext();
const { Provider } = MessengerContext;
const MessengerState = (props) => {
  const initialState = {
    allChats: [],
    chats: {},
    current_chat: {
      chat_id: null,
      conversations: [],
    },
    current_chat_id: null,
    current_product_id: null,
    current_product: {},
  };
  const [state, dispatch] = useReducer(MessengerReducer, initialState);
  useEffect(() => {}, []);

  const getMyMessages = (token) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/chats/my-messages`, true);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              setValue({ allChats: res.success });
            }
          }
        }
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };
  const getProductInfo = (token, pid) => {
    if (Array.isArray(state.allChats)) {
      if (state.allChats.length > 0) {
        for (let i = 0; i < state.allChats.length; i++) {
          const converse = state.allChats[i];
          if (converse.product_id) {
            if (converse.product_id === pid) {
              setValue({
                current_chat_id: converse._id,
                current_product_id: converse.product_id,
              });
              getCurrentConversations(token, converse._id);
              pid = null;
              break;
            }
          }
        }
      }
    }
    if (pid) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `/api/chats/buyer/${pid}`, true);
      xhr.onload = () => {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              if (res.success.post_author) {
                let sid = res.success.post_author;
                // setSellerId(sid);
                setValue({ current_product: res.success });
              }
            }
          }
        }
      };
      // xhr.setRequestHeader()
      xhr.send();
    }
  };

  const getCurrentConversations = (token, chatid) => {
    if (!chatid) return;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/chats/my-messages/${chatid}/chat`, true);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText) {
          if (JSON.parse(xhr.responseText)) {
            let res = JSON.parse(xhr.responseText);
            if (res.success) {
              return console.log(res, " the post response text from server ")
              if (Array.isArray(res.success.conversations)) {
                setValue({
                  current_chat: res.success,
                  current_product: res.success.post,
                });
              }
            }
          }
        }
      }
    };
    xhr.setRequestHeader("x-auth-user", token);
    xhr.send();
  };

  const setValue = (val = {}) => {
    dispatch({ type: "SET_STATE", payload: val });
  };
  const setChat = (val = {}) => {
    dispatch({ type: "NEW_CHAT_MESSAGE", payload: val.data });
  };
  const setPreviousChats = (val = {}) => {
    dispatch({ type: "SET_PREVIOUS_CHATS", payload: val });
  };
  return (
    <Provider
      value={{
        setValue,
        setChat,
        setPreviousChats,
        getProductInfo,
        getMyMessages,
        getCurrentConversations,
        state,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default MessengerState;
