import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Header from './pages/Header/Header';
import LeftPanel from './pages/LeftPanel/LeftPanel';
import Container from './pages/Container/Container';
import gapi from 'gapi-client';
import $ from 'jquery';
import store from './store';

import './App.css';
class App extends Component {
  googleAuth = null;

  currentApiRequest = null;

  state = {
    isAuthorized: false
  }

  componentWillMount() {
    gapi.load('client:auth2', this.authOperation);
  }

  authOperation = () => {
    gapi.client.init({
      'apiKey': 'AIzaSyC-Ax0yQKkFfmOF2X9VzLpDLlNMzs9XVd4',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      'client_id': '796545501954-8atgr3ttr2vf3di69i0jovaghobkmusv.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/drive'
    }).then(() => {

      this.googleAuth = gapi.auth2.getAuthInstance();
      this.googleAuth.isSignedIn.listen(this.updateSigninStatus);
      localStorage.setItem('token', this.googleAuth.currentUser.get().getAuthResponse().access_token);
      // this.googleAuth.currentUser.get().grant({ 'scope': 'https://www.googleapis.com/auth/drive' });

    }).then(this.afterGoogleApiInit)

  }

  afterGoogleApiInit = (response) => {
    this.updateSigninStatus(this.googleAuth.isSignedIn.get());
  }

  sendAuthorizedApiRequest = (requestDetails) => {
    this.currentApiRequest = requestDetails;
    if (this.state.isAuthorized) {
      // Make API request
      // gapi.client.request(requestDetails)

      // Reset currentApiRequest variable.
      this.currentApiRequest = {};
    } else {
      this.googleAuth.signIn();
    }
  }


  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      this.setState({ isAuthorized: true });
      if (this.currentApiRequest) {
        this.sendAuthorizedApiRequest(this.currentApiRequest);
      }

      // var request = gapi.client.request({
      //   'method': 'GET',
      //   'path': '/drive/v3/files',
      //   // 'params': { 'fields': 'user' }
      // });
      // // Execute the API request.
      // request.execute(function (response) {
      //   console.log(response);
      // });

      // var request2 = gapi.client.request({
      //   'method': 'GET',
      //   'path': '/drive/v3/drives',
      //   // 'params': { 'fields': 'user' }
      // });
      // // Execute the API request.
      // request2.execute(function (response) {
      //   console.log(response);
      // });
    } else {
      this.setState({ isAuthorized: false });
    }
  }

  login = () => {
    this.googleAuth.signIn();
  }

  signout = () => {
    this.googleAuth.signOut();
    this.setState({ isAuthorized: false });
  }

  uploadFile = (e) => {

    // console.log(e.target.files);
    var file = document.querySelector('#file').files[0];


        const boundary = 'reactdrive';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
    let reader = new FileReader();
    reader.readAsBinaryString(file);

    var formData = new FormData();

    // add assoc key values, this will be posts values
    formData.append("file", file);
    formData.append("upload_file", true);
    formData.append('uploadType', 'media');
    console.log('sending file');

    // $.ajax({
    //   type: "POST",
    //   beforeSend: function (request) {
    //     request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));

    //   },
    //   url: "https://www.googleapis.com/upload/drive/v3/files",
    //   xhr: function () {
    //     var myXhr = $.ajaxSettings.xhr();

    //     return myXhr;
    //   },
    //   success: function (data) {
    //     console.log(data);
    //   },
    //   error: function (error) {
    //     console.log(error);
    //   },
    //   async: true,
    //   data: formData,
    //   cache: false,
    //   contentType: false,
    //   processData: false,
    //   timeout: 60000
    // });



    // form.append('file')

    reader.onload = (e) => {

      // console.log(e.target.result)
      // let text = e.target.result;
      // text = text.replace(/^data:image\/[a-z]+;base64,/, "");
      // gapi.client.drive.files.create({
      //   'name': 'photo.png',
      //   'mimeType': 'image/png',
      //   'body': text
      // }).then(function (err, file) {
      //   if (err) {
      //     // Handle error
      //     console.error(err);
      //   } else {
      //     console.log('File Id: ', file.id);
      //   }
      // })
      debugger;

      var request2 = gapi.client.request({
        'method': 'POST',
        'path': 'upload/drive/v3/files',
        'params': { 'uploadType': 'media' },
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.googleAuth.currentUser.get().getAuthResponse().access_token
        },
        // 'body': fs.createReadStream(file)
      });
      // Execute the API request.
      request2.execute(function (response) {
        console.log(response);
      });
    }

  }


  render() {
    return (
      <Provider store={store} >
        <Header signin={this.login} signout={this.signout} isAuthorized={this.state.isAuthorized} />
        <LeftPanel />
        <Container />
        <input id="file" type="file" name="files[]" multiple />
        <button onClick={this.uploadFile}>onupload</button>
      </Provider>

    );
  }


}

export default App;

