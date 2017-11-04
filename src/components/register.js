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


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      tokenError: "",
      username: "",
      usernameError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmPasswordError: "",
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
    if (!this.state.token) {
      this.setState({ tokenError: 'Field required' });
      error = true;
    }
    if (!this.state.username) {
      this.setState({ usernameError: 'Field required' });
      error = true;
    }
    if (!this.state.password) {
      this.setState({ passwordError: 'Field required' });
      error = true;
    }
    if (!this.state.confirmPassword) {
      this.setState({ confirmPasswordError: 'Field required' });
      error = true;
    }
    else if (this.state.password != this.state.confirmPassword) {
      this.setState({ confirmPasswordError: 'Passwords must match' });
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
      this.props.userActionCreator.requestRegister(this.state.token, recaptcha, this.state.username, this.state.password);
    }
  }

  redirect() {
    this.props.router.replace('/');
  }

  render() {
    return (
      <div className={classnames("Register")}>
        <form onSubmit={this.onSubmit}>
          <Textfield
            onChange={(event) =>
              {
                this.setState({ token: event.target.value.trim(), tokenError: "" });
              }}
            error={this.state.tokenError}
            label={"Token"}
            floatingLabel
          />
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
          <Textfield
            onChange={(event) =>
              {
                this.setState({ confirmPassword: event.target.value, confirmPasswordError: "" });
              }}
            error={this.state.confirmPasswordError}
            label={"Confirm password"}
            floatingLabel
            type="password"
          />
          <Recaptcha ref="recaptcha" onChange={() => { this.forceUpdate() }} />
          <Button raised colored ripple type="submit">Register</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userReducer: state.user,
    tokenReducer: state.token,
    recaptchaReducer: state.recaptcha
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userActionCreator: bindActionCreators(userActionCreator, dispatch),
    recaptchaActionCreator: bindActionCreators(recaptchaActionCreator, dispatch),
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
