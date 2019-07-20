const initialState = {
    isAuthorized: false
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthorized: action.payload
            }
        case 'LOGOUT':
            return {
                isAuthorized: false
            }
        default:
            break;
    }
    return state;
}