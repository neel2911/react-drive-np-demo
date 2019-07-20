// Action
const login = (isLogin) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN', payload: isLogin });
    }
}

const logout = () => {
    return (dispatch) => {
        dispatch({ type: 'LOGOUT' });
    }
}

export default {
    login,
    logout
};