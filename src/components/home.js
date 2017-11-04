//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Snackbar from './snackbar';
import { Layout, Drawer, Navigation, Header, Content } from 'react-mdl';
import Addon from './addon';

class Home extends Component {
  render() {
    if (this.props.tokenReducer.userToken != null) {
      return (
        <Layout fixedDrawer>
            <Header title="Addon Database" style={{color: 'white'}}>
              <Navigation>
                <Link to="/submit">Submit</Link>
                <Link to="/admin/pendingAddon">Submitted addons</Link>
                <Link to="/admin/pendingUser">Create User</Link>
              </Navigation>
            </Header>
            <Drawer>
                <Navigation>
                  <Link to="/logout">Logout</Link>
                </Navigation>
            </Drawer>
            <Content>
              {this.props.children}
            </Content>
            <Snackbar/>
        </Layout>
      );
    }
    return (
      <Layout fixedDrawer>
          <Header title="Title" style={{color: 'white'}}>
            <Navigation>
              <Link to="/submit">Submit</Link>
            </Navigation>
          </Header>
          <Drawer title="Title">
              <Navigation>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </Navigation>
          </Drawer>
          <Content>
            {this.props.children}
          </Content>
          <Snackbar/>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tokenReducer: state.token,
  }
}

export default connect(mapStateToProps)(Home);
