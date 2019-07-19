import gapi from 'gapi-client';
import { GetAction } from './GetAction';

// Action
export const UploadFileAction = (fileData) => {
  const request = gapi.client.request({
    'path': '/upload/drive/v3/files',
    'method': 'POST',
    'params': { 'uploadType': 'multipart' },
    'headers': {
      'Content-Type': 'multipart/mixed; boundary="' + fileData.boundary + '"'
    },
    'body': fileData.multipartRequestBody
  });

  return (dispatch) => {
    dispatch({ type: 'UPLOAD_START', payload: false })
    request.execute((result) => {
      dispatch({ type: 'UPLOAD_SUCCESS', payload: false })
      dispatch(GetAction('root'))
    });

  }

}