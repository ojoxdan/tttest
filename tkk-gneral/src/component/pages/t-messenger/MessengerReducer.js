export default (state, action) => {
  switch (action.type) {
    case "NEW_CHAT_MESSAGE":   
    if (state.allChats && !Array.isArray(state.allChats)) return {...state};
    if (state.current_chat && !action.payload.chat_id) return {...state};
    if (!Array.isArray(state.current_chat.conversations)) return{...state};
    if (state.current_chat.conversations.length > 0) {
      if (state.current_chat._id !== action.payload.chat_id) return{...state};
    };
      let current_chat = {
        ...state.current_chat,
        conversations: [...state.current_chat.conversations, action.payload],
      };
      let allChats = state.allChats
      for (let i = 0; i < allChats.length; i++) {
        let chat = allChats[i];
        if (chat._id === action.payload.chat_id) {
          chat.last_message = action.payload
          // chat.conversations.push = action.payload
        }
      }
      return {
        ...state,
        current_chat,
        allChats,
      };
    case "SET_PREVIOUS_CHATS":
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.to]: action.payload.data,
        },
      };
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
