// Action

export const GetAction = (payload) => {

    // gapi.client.drive.files.list({
    //     pageSize: 100,
    //     fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size)",
    //     q: `'${folderId}' in parents and trashed = false`
    // }).then((res) => {
    //     let files: FileInfo[] = [];
    //     res.result.files.forEach((file) => files.push(FileInfo.fromGoogleFile(file)));
    //     return files;
    // });
    // return (dispatch) => {
    //     setTimeout(() => dispatch({ type: 'login', payload }), 1000);
    // }
}