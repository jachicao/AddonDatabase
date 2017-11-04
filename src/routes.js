//@flow
import React, { Component } from 'react';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActionCreator from './actions/user';
import * as tokenActionCreator from './actions/token';
import * as snackbarActionCreator from './actions/snackbar';
import * as sessionActionCreator from './actions/session';
import Home from './components/home';
import NotFound from './components/notFound';
import PendingAddonSubmit from './components/pendingAddonSubmit';
import PendingAddonList from './components/pendingAddonList';
import PendingUser from './components/pendingUser';
import Register from './components/register';
import Login from './components/login';
import Fingerprint2 from 'fingerprintjs2';
/*
import TwoFactor from './components/TwoFactor';
import PendingUser from './components/PendingUser';
*/

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class Routes extends Component {

  componentWillMount() {
    new Fingerprint2().get((result, components) => {
      this.props.sessionActionCreator.hwidFulfilled(result);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    var nextProps = this.props;
    if (!prevProps.tokenReducer.message && nextProps.tokenReducer.message) {
      nextProps.snackbarActionCreator.showSnackbar(nextProps.tokenReducer.message);
    }
    if (!prevProps.sessionReducer.hwid && nextProps.sessionReducer.hwid) {
      if (this.props.tokenReducer.userToken && !this.props.tokenReducer.isFetched) {
        this.props.tokenActionCreator.requestTokenValidation(this.props.tokenReducer.userToken, this.props.sessionReducer.hwid);
      }
    }
  }

  validateJwt = (nextState, replace, callback) => {
    if (!this.props.tokenReducer.userToken) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  }

  isLoggedIn = (nextState, replace, callback) => {
    if (this.props.tokenReducer.userToken) {
      replace('/');
    }
    callback();
  }

  logOut = (nextState, replace, callback) => {
    this.props.userActionCreator.requestLogout();
    replace('/');
    callback();
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={Home}>
        {/*
          <Route path="two_factor" component={TwoFactor} />
          */}
        <Route path="submit" component={PendingAddonSubmit} />
        <Route path="admin" component={App} onEnter={this.validateJwt}>
          <Route path="pendingAddon" component={PendingAddonList} />
          <Route path="pendingUser" component={PendingUser} />
          {/*
          <Route
            path="new" component={PendingUser}
            //onEnter={validateTwoFactor}
          />
          <Route path="two_factor" component={TwoFactor} />
          */}
        </Route>
        <Route path="register" component={Register} onEnter={this.isLoggedIn} />
        <Route path="login" component={Login} onEnter={this.isLoggedIn} />
        <Route path="logout" onEnter={this.logOut} />
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  );
}
};

const mapStateToProps = (state, ownProps) => {
  return {
    tokenReducer: state.token,
    sessionReducer: state.session
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userActionCreator: bindActionCreators(userActionCreator, dispatch),
    tokenActionCreator: bindActionCreators(tokenActionCreator, dispatch),
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch),
    sessionActionCreator: bindActionCreators(sessionActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
