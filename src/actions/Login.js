// Action
export const loginAction = (payload) => {
    return (dispatch) => {
      setTimeout(() => dispatch({ type: 'login', payload }), 1000);
    }
  }