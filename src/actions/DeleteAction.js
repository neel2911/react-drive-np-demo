import gapi from 'gapi-client';
import { GetAction } from './GetAction';

// Action
export const DeleteAction = (fileId) => {
    debugger;
    const request = gapi.client.drive.files.delete({
        fileId: fileId
    });
    return (dispatch) => {
        dispatch({ type: 'DELETE_START', payload: false })
        request.execute((result) => {
            dispatch({ type: 'DELETE_SUCCESS', payload: false })
            dispatch(GetAction('root'))
        });

    }
}