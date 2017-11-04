//@flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import * as recaptchaActionCreator from '../actions/recaptcha';
import * as snackbarActionCreator from '../actions/snackbar';
import { connect } from 'react-redux';

// Constants
const RECAPTCHA_CALLBACK_NAME = '_grecaptcha.data-callback';
const RECAPTCHA_EXPIRED_CALLBACK_NAME = '_grecaptcha.data-expired-callback';

class Recaptcha extends Component {

  componentWillMount() {

    if (this.props.recaptchaReducer.response) {
      this.props.recaptchaActionCreator.resetResponse();
    }
    /*
    */
    if (!this.props.recaptchaReducer.isFetched) {
      this.props.recaptchaActionCreator.requestPublicKey();
    }

    var script = document.createElement("script");
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    window[RECAPTCHA_CALLBACK_NAME] = (response) => {
      this.props.recaptchaActionCreator.setResponse(response);
      if (this.props.onChange) {
        this.props.onChange();
      }
    };
    window[RECAPTCHA_EXPIRED_CALLBACK_NAME] = () => {
      this.props.recaptchaActionCreator.resetResponse();
      if (this.props.onChange) {
        this.props.onChange();
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    var prevProps = prevProps;
    var nextProps = this.props;
    if (!prevProps.recaptchaReducer.message && nextProps.recaptchaReducer.message) {
      nextProps.snackbarActionCreator.showSnackbar(nextProps.recaptchaReducer.message);
    }
    if (!prevProps.recaptchaReducer.reset && nextProps.recaptchaReducer.reset) {
      if (window.grecaptcha != null) {
        window.grecaptcha.reset();
      }
      nextProps.recaptchaActionCreator.resetIsDone();
    }
  }

  render() {
    return (
      <div className={classnames("Recaptcha")}>
        {
          process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY
            &&
              <div
                className={classnames("g-recaptcha")}
                data-sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
                data-callback={RECAPTCHA_CALLBACK_NAME}
                data-expired-callback={RECAPTCHA_EXPIRED_CALLBACK_NAME}
                >
              </div>
        }
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    recaptchaReducer: state.recaptcha
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    recaptchaActionCreator: bindActionCreators(recaptchaActionCreator, dispatch),
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recaptcha);
