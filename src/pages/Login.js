import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/Login'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.loginReducer.username,
            password: this.props.loginReducer.password
        }
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }



    componentDidMount() {
        console.log(this.props);
    }

    onLoginSubmit = (values, action) => {
        debugger;
        this.props.dispatch(loginAction(values))
        // console.log(values);
        // action.resetForm();
    }

    render() {
        return (
            <form>
                <input type="input" placeholder="email" />
                <input type="password" placeholder="password" />
                <button type="submit">login</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        loginReducer: state.loginReducer
    }
}

export default connect(mapStateToProps)(Login);