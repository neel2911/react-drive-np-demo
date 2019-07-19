const defaultState = {
    files: [],
    slectedFolderId: null
}


// Reducer
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_SUCCESS':
            return { ...state, files: action.payload }
        case 'SET_SELECTED':
            return { ...state, slectedFolderId: action.payload }
        default:
            break;
    }
    return state;
}