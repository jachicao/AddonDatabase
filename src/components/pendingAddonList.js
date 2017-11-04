//@flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as pendingAddonActionCreator from '../actions/pendingAddon';
import * as snackbarActionCreator from '../actions/snackbar';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Textfield, List, ListItem } from 'react-mdl';

class PendingAddonList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      addonId: null
    }
  }

  componentWillMount() {
    if (!this.props.pendingAddonListReducer.isFetching && !this.props.pendingAddonListReducer.isFetched) {
      this.props.pendingAddonActionCreator.requestList(this.props.tokenReducer.userToken);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var nextProps = this.props;
    if (prevProps.pendingAddonListReducer.isFetching && !nextProps.pendingAddonListReducer.isFetching) {
      if (nextProps.pendingAddonListReducer.message) {
        nextProps.snackbarActionCreator.showSnackbar(nextProps.pendingAddonListReducer.message);
        this.onCancel();
      }
    }
  }

  requestDelete = (id) => {
    if (!this.props.pendingAddonListReducer.isFetching) {
      this.props.pendingAddonActionCreator.requestDelete(this.props.tokenReducer.userToken, id);
    }
  }

  requestAccept = (id) => {
    if (!this.props.pendingAddonListReducer.isFetching) {
      this.props.pendingAddonActionCreator.requestAccept(this.props.tokenReducer.userToken, id);
    }
  }

  onCancel = () => {
    this.setState({ openDialog: false, addonId: null });
  }

  render() {
    return(
      <div className={classnames('PendingAddonList')}>
        <div className="table-responsive">
          <table className={classnames("mdl-data-table", "mdl-js-data-table", "mdl-shadow--2dp")}>
            <thead>
              <tr>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>Reject</th>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>Accept</th>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>Author</th>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>Name</th>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>Forum</th>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>GitHub</th>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>Category</th>
                <th className={classnames("mdl-data-table__cell--non-numeric")}>Type</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.pendingAddonListReducer.list.map((pendingAddon) => {
                  return (
                    <tr key={pendingAddon._id}>
                      <td>
                        <IconButton name="close" onClick={(event) => {
                          this.setState({ openDialog: true, addonId: pendingAddon._id });
                          //this.requestDelete();
                        }}/>
                      </td>
                      <td>
                        <IconButton name="done" onClick={(event) => {
                          //this.setState({ openDialog: true, addonId: pendingAddon._id });
                          this.requestAccept(pendingAddon._id);
                        }}/>
                      </td>
                      <td className={classnames("mdl-data-table__cell--non-numeric")}>{pendingAddon.authorName}</td>
                      <td className={classnames("mdl-data-table__cell--non-numeric")}>{pendingAddon.name}</td>
                      <td className={classnames("mdl-data-table__cell--non-numeric")}>{pendingAddon.forumUrl}</td>
                      <td className={classnames("mdl-data-table__cell--non-numeric")}>{pendingAddon.githubUrl}</td>
                      <td className={classnames("mdl-data-table__cell--non-numeric")}>{pendingAddon.category}</td>
                      <td className={classnames("mdl-data-table__cell--non-numeric")}>{
                        pendingAddon.category === "Champion" ?
                          pendingAddon.championId :
                          (pendingAddon.category === "Utility" ?
                            pendingAddon.utilityType :
                              (pendingAddon.category === "Library" ? pendingAddon.libraryType : ""))
                            }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <Dialog open={this.state.openDialog} onCancel={this.onCancel}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Are you sure?
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={() => {
                this.requestDelete(this.state.addonId);
                this.onCancel();
              }}>
              Yes
            </Button>
            <Button type='button' onClick={this.onCancel}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    pendingAddonListReducer: state.pendingAddonList,
    tokenReducer: state.token
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch),
    pendingAddonActionCreator: bindActionCreators(pendingAddonActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingAddonList);
