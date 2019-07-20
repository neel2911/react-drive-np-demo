import React, { Component } from 'react';
import { connect } from 'react-redux';

import HttpService from '../../utilities/services/HttpService';
import AuthService from '../../utilities/services/AuthService';
import HttpAction from '../../redux/actions/HttpAction';

import Header from '../Header/Header';
import AuthAction from '../../redux/actions/AuthAction';

import LeftPanel from '../LeftPanel/LeftPanel';
import Main from '../Main/Main';
import './App.css';
class App extends Component {
  httpService = null;
  authService = null;

  state = {
    isapiloaded: false
  }

  constructor(props) {
    super(props);
    this.httpService = new HttpService();
    this.authService = new AuthService();
  }

  componentWillMount() {
    this.httpService.init(this.gapiLoadSuccess);
  }

  gapiLoadSuccess = () => {
    this.setState({ isapiloaded: true });
    this.authService.setAuthInstance();
    this.props.dispatch(AuthAction.login(this.authService.checkLogin()))
    if (this.props.authReducer.isAuthorized) {
      this.props.dispatch(HttpAction.get(this.httpService.get('root')));
    }
  }

  render() {

    const bodyData = (
      <div>
        <Header isAuthorized={this.props.authReducer.isAuthorized} httpService={this.httpService} authService={this.authService} />
        {this.props.authReducer.isAuthorized === true ? (
          <div>
            <LeftPanel httpService={this.httpService} authService={this.authService} />
            <Main files={this.props.httpReducer.files} httpService={this.httpService} authService={this.authService} />
          </div>
        ) : 'auth required'}

      </div>
    )
    return (
      <div>
        {
          this.state.isapiloaded === true ? bodyData : 'Loading...'
        }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    httpReducer: state.httpReducer,
    authReducer: state.authReducer
  }
}

export default connect(mapStateToProps)(App);

