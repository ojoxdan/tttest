export default  (state, action )=>{
    switch (action.type) {
        case "SET_ORDERS":
            return {
                ...state,
                orders:action.payload
            }
        case "SET_STATE":
            return {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
    }