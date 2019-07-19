const defaultState = {
    isLoggedIn: false
}


// Reducer
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, isLoggedIn: true }
        default:
            break;
    }
    return state;
}