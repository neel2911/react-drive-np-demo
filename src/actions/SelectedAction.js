// Action


export const SelectedAction = (folderId) => {
    return (dispatch) => {
        dispatch({ type: 'SET_SELECTED', payload: folderId })
    }
}