import React, { Component } from 'react';

import { connect } from 'react-redux';
import Header from './pages/Header/Header';
import LeftPanel from './pages/LeftPanel/LeftPanel';
import Main from './pages/Main/Main';
import gapi from 'gapi-client';

import * as types from './utilities/Config';
import './App.css';
import { GetAction } from './actions/GetAction';
class App extends Component {
  state = {
    isAuthorized: true,
    isGAPIReady: false
  }
  constructor(props) {
    super(props);
  }

  // authOperation = () => {
  //   gapi.client.init({
  //     'apiKey': 'AIzaSyC-Ax0yQKkFfmOF2X9VzLpDLlNMzs9XVd4',
  //     'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  //     'client_id': '796545501954-8atgr3ttr2vf3di69i0jovaghobkmusv.apps.googleusercontent.com',
  //     'scope': 'https://www.googleapis.com/auth/drive'
  //   }).then(() => {

  //     this.googleAuth = gapi.auth2.getAuthInstance();
  //     this.googleAuth.isSignedIn.listen(this.updateSigninStatus);
  //     localStorage.setItem('login_data', this.googleAuth.currentUser.get().getAuthResponse());
  //     // this.googleAuth.currentUser.get().grant({ 'scope': 'https://www.googleapis.com/auth/drive' });

  //   }).then(this.afterGoogleApiInit)

  // }

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

  // login = () => {
  //   this.googleAuth.signIn();
  // }

  // signout = () => {
  //   this.googleAuth.signOut();
  //   this.setState({ isAuthorized: false });
  // }

  uploadFile = (e) => {

    // console.log(e.target.files);
  }

  loadGoogleApi = () => {
    gapi.client.init({
      'apiKey': types.API_KEY,
      'discoveryDocs': types.DISCOVERY_DOCS,
      'client_id': types.CLIENT_ID,
      'scope': types.SCOPE
    }).then(() => {
      this.setState({ isGAPIReady: true });
    })
  }

  componentWillMount() {
    gapi.load('client:auth2', this.loadGoogleApi);
  }

  render() {
    const bodyData = (
      <div>
        <Header isAuthorized={this.props.authReducer.loggedIn} />
        {this.props.authReducer.loggedIn === true ? (
          <div>
            <LeftPanel />
            <Main files={this.props.fileReducer.files} />
          </div>
        ) : 'auth required'}

      </div>
    )
    return (
      <div>
        {
          this.state.isGAPIReady === true ? bodyData : 'Loading...'
        }
      </div>

    );
  }

  componentDidUpdate() {
    if (this.state.isGAPIReady === true && (this.props.fileReducer.files == null || this.props.fileReducer.files.length <= 0)) {
      this.props.dispatch(GetAction('root'));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    fileReducer: state.fileReducer,
    authReducer: state.authReducer
  }
}

export default connect(mapStateToProps)(App);

