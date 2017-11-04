//@flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as snackbarActionCreator from '../actions/snackbar';
import { Snackbar } from 'react-mdl';

class SnackBar extends Component {

  onTimeout = () => {
    this.props.snackbarActionCreator.onTimeout();
  }

  render() {
    return (
      <Snackbar
        active={Boolean(this.props.snackbarReducer.message)}
        onTimeout={this.onTimeout}
        >
        {this.props.snackbarReducer.message}
      </Snackbar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    snackbarReducer: state.snackbar
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
