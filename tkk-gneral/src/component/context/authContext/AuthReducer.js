import { SET_TYPE, USER_LOADED, LOAD_USER_ERROR } from "../ReducerTypes";
export default ( state, action ) => {
  switch (action.type) {
    case SET_TYPE:
        localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated:true,
        isLoading:false,
      };
    case USER_LOADED:
      let token = localStorage.getItem('token')
      console.log(action.payload,"user loaded here what happend ")
      return {
        ...state,
        isAuthenticated:true,
        isLoading:false,
        user: action.payload,
        token
      }
    case LOAD_USER_ERROR:
      localStorage.removeItem('token')  
      return {
        ...state,
        token:null,
        isAuthenticated:false,
        isLoading:false,
        user:null,
      }
    case "SET_STATE":
      return {
        ...state,
        ...action.payload
      }
    case "LOGOUT":
      localStorage.removeItem("token")
      return {
        ...action.payload
      }
      default:
      return {...state};
  }
};
