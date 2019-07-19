// Action
import gapi from 'gapi-client';
import { GetAction } from './GetAction';

export const CreateAction = (folderName) => {
  const folder = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder"
  };

  const request = gapi.client.drive.files.create({
    resource: folder,
    fields: "*"
  });
  return (dispatch) => {
    dispatch({ type: 'CREATE_START', payload: false })
    request.execute((result) => {
      dispatch({ type: 'CREATE_SUCESS', payload: false })
      dispatch(GetAction('root'))
    });

  }
}