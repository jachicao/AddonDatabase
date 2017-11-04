//@flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as snackbarActionCreator from '../actions/snackbar';
import * as pendingUserActionCreator from '../actions/pendingUser';
import { SelectField, Option } from 'react-mdl-extra';
import { Button } from 'react-mdl';

class PendingUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "",
      typeError: ""
    }
  }

  componentWillMount() {
    if (!this.props.pendingUserReducer.enumIsFetching && !this.props.pendingUserReducer.enumIsFetched) {
      this.props.pendingUserActionCreator.requestEnum(this.props.tokenReducer.userToken);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var nextProps = this.props;
    if (prevProps.pendingUserReducer.isFetching && !nextProps.pendingUserReducer.isFetching) {
      if (nextProps.pendingUserReducer.message) {
        nextProps.snackbarActionCreator.showSnackbar(nextProps.pendingUserReducer.message);
      }
    }
  }

  componentWillUnmount() {
    this.props.pendingUserActionCreator.removeToken();
  }

  onSubmit = (event: Event) => {
    if (event) {
      event.preventDefault();
    }
    if (this.props.pendingUserReducer.isFetching) {
      return;
    }
    var error = false;
    var type = this.state.type;
    if (!type) {
      this.setState({ typeError: "Field is required" });
      error = true;
    }
    if (!error) {
      this.props.pendingUserActionCreator.requestNewPendingUser(this.props.tokenReducer.userToken, type);
    }
  }

  render() {
    return(
      <div className={classnames('PendingUser')}>
        <form onSubmit={this.onSubmit}>
          <SelectField
            label={'Select type'}
            value={this.state.type}
            error={this.state.typeError}
            onChange={(value) => {
              this.setState({ type: value, typeError: "" });
            }}>
            {this.props.pendingUserReducer.enum.map((value) => {
              return(
                <Option value={value} key={value}>{value}</Option>
              );
            })}
          </SelectField>
          <Button raised colored ripple type="submit">Create</Button>
        </form>
        {
          this.props.pendingUserReducer.token != null
            &&
              <p>
                <b>Give this token to the new user: </b>
                {this.props.pendingUserReducer.token}
              </p>
        }
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    tokenReducer: state.token,
    pendingUserReducer: state.pendingUser,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch),
    pendingUserActionCreator: bindActionCreators(pendingUserActionCreator, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingUser);
