let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_CHECK':
            return {
                loggedIn: action.payload,
            }
        case 'LOGIN':
            return {
                loggedIn: true,
                ...action.payload
            }
        case 'LOGOUT':
            return {
                loggedIn: false,
            }
        default:
            break;
    }
    return state;
}