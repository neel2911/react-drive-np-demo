// Action
import gapi from 'gapi-client';

export const GetAction = (folderId) => {
    return (dispatch) => {
        gapi.client.drive.files.list({
            fields: "nextPageToken, files(*)",
            q: `'${folderId}' in parents and trashed = false`
        }).then((res) => {
            dispatch({ type: 'GET_SUCCESS', payload: res.result.files })
        });




    }
}