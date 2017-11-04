//@flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActionCreator from '../actions/user';
import * as snackbarActionCreator from '../actions/snackbar';
import * as recaptchaActionCreator from '../actions/recaptcha';
import classnames from 'classnames';
import Recaptcha from './recaptcha';
import { Textfield, Button } from 'react-mdl';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: "",
      password: "",
      passwordError: ""
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var prevProps = prevProps;
    var nextProps = this.props;
    if (prevProps.userReducer.isFetching && !nextProps.userReducer.isFetching) {
      if (nextProps.userReducer.message) {
        nextProps.snackbarActionCreator.showSnackbar(nextProps.userReducer.message);
      }
      nextProps.recaptchaActionCreator.requestReset();
      if (nextProps.tokenReducer.userToken) {
        this.redirect();
      }
    }
  }

  onSubmit = (event: Event) => {
    if (event) {
      event.preventDefault();
    }
    if (this.props.userReducer.isFetching) {
      return;
    }
    var error = false;
    if (!this.state.username) {
      this.setState({ usernameError: 'Field required' });
      error = true;
    }
    if (!this.state.password) {
      this.setState({ passwordError: 'Field required' });
      error = true;
    }
    if (error) {
      return;
    }
    var recaptcha = this.props.recaptchaReducer.response;
    if (!recaptcha) {
      this.props.snackbarActionCreator.showSnackbar('Answer reCAPTCHA');
      error = true;
    }
    if (!error) {
      this.props.userActionCreator.requestLogin(recaptcha, this.state.username, this.state.password);
    }
  }

  redirect() {
    this.props.router.replace('/');
  }

  render() {
    return (
      <div className={classnames("Login")}>
        <form onSubmit={this.onSubmit}>
          <Textfield
            onChange={(event) =>
              {
                this.setState({ username: event.target.value.trim(), usernameError: "" });
              }}
            error={this.state.usernameError}
            label={"Username"}
            floatingLabel
          />
          <Textfield
            onChange={(event) =>
              {
                this.setState({ password: event.target.value, passwordError: "" });
              }}
            error={this.state.passwordError}
            label={"Password"}
            floatingLabel
            type="password"
          />
          <Recaptcha ref="recaptcha" onChange={() => { this.forceUpdate() }} />
          <Button raised colored ripple type="submit">Login</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userReducer: state.user,
    tokenReducer: state.token,
    recaptchaReducer: state.recaptcha,
    feathersReducer: state.feathers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userActionCreator: bindActionCreators(userActionCreator, dispatch),
    recaptchaActionCreator: bindActionCreators(recaptchaActionCreator, dispatch),
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
