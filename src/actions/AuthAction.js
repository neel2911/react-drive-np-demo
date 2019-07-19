
import gapi from 'gapi-client';

// Action
const login = () => {
    let googleAuth = gapi.auth2.getAuthInstance();
    return (dispatch) => {
        googleAuth.signOut();
        googleAuth.isSignedIn.listen(() => {
            if (googleAuth.isSignedIn.get()) {
                dispatch({ type: 'LOGIN', payload: googleAuth.currentUser.get().getAuthResponse() })
            }
        });

        googleAuth.signIn();
    }
}

const logout = () => {
    let googleAuth = gapi.auth2.getAuthInstance();
    return (dispatch) => {
        googleAuth.signOut();
        dispatch({ type: 'LOGOUT', payload: false })
        googleAuth.disconnect();
    }
}

const logincheck = () => {
    let googleAuth = gapi.auth2.getAuthInstance();
    return (dispatch) => {
        dispatch({ type: 'LOGIN_CHECK', payload: googleAuth.isSignedIn.get() })

    }
}

export const AuthAction = {
    login,
    logout,
    logincheck
};