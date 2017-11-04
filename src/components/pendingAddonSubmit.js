//@flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as recaptchaActionCreator from '../actions/recaptcha';
import * as snackbarActionCreator from '../actions/snackbar';
import * as addonCategoryActionCreator from '../actions/addonCategory';
import * as addonUtilityActionCreator from '../actions/addonUtility';
import * as addonLibraryActionCreator from '../actions/addonLibrary';
import * as championActionCreator from '../actions/champion';
import * as pendingAddonActionCreator from '../actions/pendingAddon';
import Recaptcha from '../components/recaptcha';
import { SelectField, Option } from 'react-mdl-extra';
import { Textfield, Button } from 'react-mdl';

class PendingAddonSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authorName: "",
      authorNameError: "",
      name: "",
      nameError: "",
      forumUrl: "",
      forumUrlError: "",
      githubUrl: "",
      githubUrlError: "",
      category: "",
      categoryError: "",
      championId: null,
      championIdError: "",
      utilityType: null,
      utilityTypeError: "",
      libraryType: null,
      libraryTypeError: ""
    }
  }

  componentWillMount() {
    console.log("willmount")
    if (!this.props.addonCategoryReducer.isFetching && !this.props.addonCategoryReducer.isFetched) {
      this.props.addonCategoryActionCreator.requestEnum();
    }
  }

  componentDidMount() {
    console.log("didMount");
  }

  componentDidUpdate(prevProps, prevState) {
    var nextProps = this.props;
    if (prevProps.pendingAddonSubmitReducer.isFetching && !nextProps.pendingAddonSubmitReducer.isFetching) {
      if (nextProps.pendingAddonSubmitReducer.message) {
        nextProps.snackbarActionCreator.showSnackbar(nextProps.pendingAddonSubmitReducer.message);
      }
      nextProps.recaptchaActionCreator.requestReset();
    }
  }

  onSubmit = (event: Event) => {
    if (event) {
      event.preventDefault();
    }
    if (this.props.pendingAddonSubmitReducer.isFetching) {
      return;
    }
    var error = false;
    if (!this.state.authorName) {
      this.setState({ authorNameError: "Field is required" });
      error = true;
    }

    if (!this.state.name) {
      this.setState({ nameError: "Field is required" });
      error = true;
    }

    if (!this.state.forumUrl) {
      this.setState({ forumUrlError: "Field is required" });
      error = true;
    }

    if (!this.state.githubUrl) {
      this.setState({ githubUrlError: "Field is required" });
      error = true;
    }

    if (!this.state.category) {
      this.setState({ categoryError: "Field is required" });
      error = true;
    } else {
      switch (this.state.category) {
        case "Champion":
          if (!this.state.championId) {
            this.setState({ championIdError: "Field is required" });
            error = true;
          }
          break;
        case "Utility":
          if (!this.state.utilityType) {
            this.setState({ utilityTypeError: "Field is required" });
            error = true;
          }
          break;
        case "Library":
          if (!this.state.libraryType) {
            this.setState({ libraryTypeError: "Field is required" });
            error = true;
          }
          break;
        default:
          break;
      }
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
      this.props.pendingAddonActionCreator.requestSubmit(
        recaptcha,
        this.props.sessionReducer.hwid,
        this.state.authorName,
        this.state.name,
        this.state.forumUrl,
        this.state.githubUrl,
        this.state.category,
        this.state.championId,
        this.state.utilityType,
        this.state.libraryType
      );
    }
  }

  render() {
    return(
      <div className={classnames('PendingAddonSubmit')}>
        <form onSubmit={this.onSubmit}>
          <Textfield
            onChange={(event) =>
              {
                this.setState({ authorName: event.target.value.trim(), authorNameError: ""});
              }}
            error={this.state.authorNameError}
            label={"Author"}
            floatingLabel
          />
          <Textfield
            onChange={(event) =>
              {
                this.setState({ name: event.target.value.trim(), nameError: ""});
              }}
            error={this.state.nameError}
            label={"Addon name"}
            floatingLabel
          />
          <Textfield
            onChange={(event) =>
              {
                this.setState({ forumUrl: event.target.value.trim(), forumUrlError: ""});
              }}
            error={this.state.forumUrlError}
            label={"Forum Url"}
            floatingLabel
          />
          <Textfield
            onChange={(event) =>
              {
                this.setState({ githubUrl: event.target.value.trim(), githubUrlError: ""});
              }}
            error={this.state.githubUrlError}
            label={"GitHub Url"}
            floatingLabel
          />
          <SelectField
            label={'Select category'}
            value={this.state.category}
            error={this.state.categoryError}
            onChange={(value) => {
              this.setState({ category: value, categoryError: "" });
              switch (value) {
                case "Champion":
                  if (!this.props.championReducer.isFetching && !this.props.championReducer.isFetched) {
                    this.props.championActionCreator.requestList();
                  }
                  break;
                case "Utility":
                  if (!this.props.addonUtilityReducer.isFetching && !this.props.addonUtilityReducer.isFetched) {
                    this.props.addonUtilityActionCreator.requestEnum();
                  }
                  break;
                case "Library":
                  if (!this.props.addonLibraryReducer.isFetching && !this.props.addonLibraryReducer.isFetched) {
                    this.props.addonLibraryActionCreator.requestEnum();
                  }
                  break;
                default:
                  break;

              }
            }}>
            {this.props.addonCategoryReducer.enum.map((category) => {
              return(
                <Option value={category} key={category}>{category}</Option>
              );
            })}
          </SelectField>
          {
            this.state.category === "Champion"
              &&
                <SelectField
                  label={'Select champion'}
                  value={this.state.championId}
                  error={this.state.championIdError}
                  onChange={(value) => {
                    this.setState({ championId: value, championIdError: "" });
                  }}>
                  {this.props.championReducer.list.map((champion) => {
                    return(
                      <Option value={champion.id} key={champion.id}>{champion.name}</Option>
                    );
                  })}
                </SelectField>
          }
          {
            this.state.category === "Utility"
              &&
                <SelectField
                  label={'Select utility'}
                  value={this.state.utilityType}
                  error={this.state.utilityTypeError}
                  onChange={(value) => {
                    this.setState({ utilityType: value, utilityErrorType: "" });
                  }}>
                  {this.props.addonUtilityReducer.enum.map((utility) => {
                    return(
                      <Option value={utility} key={utility}>{utility}</Option>
                    );
                  })}
                </SelectField>
          }
          {
            this.state.category === "Library"
              &&
                <SelectField
                  label={'Select utility'}
                  value={this.state.libraryType}
                  error={this.state.libraryTypeError}
                  onChange={(value) => {
                    this.setState({ libraryType: value, libraryTypeError: "" });
                  }}>
                  {this.props.addonLibraryReducer.enum.map((library) => {
                    return(
                      <Option value={library} key={library}>{library}</Option>
                    );
                  })}
                </SelectField>
          }
          <Recaptcha />
          <Button raised colored ripple type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    recaptchaReducer: state.recaptcha,
    pendingAddonSubmitReducer: state.pendingAddonSubmit,
    championReducer: state.champion,
    addonCategoryReducer: state.addonCategory,
    addonUtilityReducer: state.addonUtility,
    addonLibraryReducer: state.addonLibrary,
    sessionReducer: state.session
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    recaptchaActionCreator: bindActionCreators(recaptchaActionCreator, dispatch),
    snackbarActionCreator: bindActionCreators(snackbarActionCreator, dispatch),
    pendingAddonActionCreator: bindActionCreators(pendingAddonActionCreator, dispatch),
    championActionCreator: bindActionCreators(championActionCreator, dispatch),
    addonCategoryActionCreator: bindActionCreators(addonCategoryActionCreator, dispatch),
    addonUtilityActionCreator: bindActionCreators(addonUtilityActionCreator, dispatch),
    addonLibraryActionCreator: bindActionCreators(addonLibraryActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingAddonSubmit);
