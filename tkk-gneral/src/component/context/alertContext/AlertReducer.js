import { SET_ALERT, REMOVE_ALERT } from "../ReducerTypes";
export default ( state, action ) => {
  switch (action.type) {
    case SET_ALERT:
      return [
        ...state,
        {...action.payload}
      ];
    case REMOVE_ALERT:
        let otherAlerts = state.filter(alert=>alert.id !== action.payload.id)
      return [
          ...otherAlerts
      ];
    default:
      return [...state];
  }
};
