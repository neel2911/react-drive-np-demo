
const initialState = {
    isapiloaded: false,
    files: [],
    breadBrumbs: [{
        id: "root",
        name: 'My Drive'
    }],
    isLoading: false
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'CREATE_SUCCESS':
            return {
                ...state,
                isLoading: false
            }
        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                isLoading: false
            }
        case 'DELETE_SUCCESS':
            return {
                ...state,
                isLoading: false
            }
        case 'INIT_SUCCESS':
            return {
                ...state,
                isapiloaded: true,
                isLoading: false
            }
        case 'GET_SUCCESS':
            return {
                ...state,
                files: [...action.payload],
                isLoading: false
            }
        case 'BREADCRUMB_ADD':
            return {
                ...state,
                breadBrumbs: [...state.breadBrumbs, action.payload]
            }
        case 'BREADCRUMB_REMOVE':
            return {
                ...state,
                breadBrumbs: [...action.payload]
            }
        default:
            break;
    }
    return state;
}