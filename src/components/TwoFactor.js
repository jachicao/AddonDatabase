//@flow
/*
import React, { Component } from 'react';
import classNames from 'classnames';
import TwoFactorStore from "../stores/TwoFactorStore";
var TwoFactorActionCreator = require('../actions/TwoFactorActionCreator');
var QRCode = require('qrcode.react');

type Props = {

};

export default class TwoFactorAuthentication extends Component {
  state: {
    otpauth_url: string;
    request_sent: boolean;
    two_factor_token: string;
    two_factor_token_class: string;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      otpauth_url: "",
      request_sent: false,
      two_factor_token: "",
      two_factor_token_class: ""
    }
  }

  componentWillMount() {
    TwoFactorStore.addChangeListener(this.onTwoFactorStoreChange);
    TwoFactorActionCreator.getOTPauthUrl();
  }

  componentWillUnmount() {
    TwoFactorStore.removeChangeListener(this.onTwoFactorStoreChange);
  }

  onTwoFactorStoreChange = () => {
    if (!TwoFactorStore.hasSucceeded()) {
      window.Materialize.toast(TwoFactorStore.getMessage(), Number(process.env.TOAST_DURATION));
    } else {
      if (TwoFactorStore.getOTPauthUrl()) {
        this.setState({ otpauth_url: TwoFactorStore.getOTPauthUrl() });
      }
    }
    this.setState({ request_sent: false });
  }

  onSubmit(event: Event) {
    if (event) {
      event.preventDefault();
    }
    if (this.state.request_sent) {
      return;
    }
    if (this.state.two_factor_token) {
      TwoFactorActionCreator.verifyNewSecret(this.state.two_factor_token);
      this.setState({ request_sent: true });
    }
  }


  render() {
    return (
      <div className={classNames("TwoFactor")}>
        {
          this.state.otpauth_url
            &&
            <form className="col s12" onSubmit={this.onSubmit.bind(this)}>
              <QRCode value={this.state.otpauth_url}/>
              <div className="row">
                <div className="input-field col s6">
                  <input id="two_factor_token_id" type="text" className={this.state.two_factor_token_class} onChange={ (event) =>
                    {
                      if (event.target.value.length === 6) {
                        this.setState({ two_factor_token_class: "valid", two_factor_token: event.target.value });
                      } else {
                        this.setState({ two_factor_token_class: "invalid", two_factor_token: "" });
                      }
                    } }
                  />
                  <label htmlFor="two_factor_token_id" data-error="Must have 6 characters">Token</label>
                </div>
                <button className={classNames("btn waves-effect waves-light")} type="submit" name="action">
                  Send
                </button>
              </div>
            </form>
        }
      </div>
    );
  }
}
*/
