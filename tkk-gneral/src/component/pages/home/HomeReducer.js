export default (state,action)=>{
    switch (action.type) {
        case 'SET_REGIONS':
            return {
                ...state,
                regions: [...action.payload]
            }
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: [...action.payload]
            }
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: [...action.payload]
            }
        case 'SET_PROMOTED_POSTS':
            return {
                ...state,
                promotedPosts: [...action.payload]
            }
        case 'SET_JOBS':
            return {
                ...state,
                jobs: [...action.payload]
            }
        case 'SET_ADVERTISEMENTS':
            return {
                ...state,
                advertisements: [...action.payload]
            }
        case 'SET_COUNTRIES':
            return {
                ...state,
                countries: [...action.payload]
            }
        case 'SET_SEARCH_RESULT':
            return {
                ...state,
                searchResult: [...action.payload]
            }
   
        default:
            return {
                ...state
            };
    }
}