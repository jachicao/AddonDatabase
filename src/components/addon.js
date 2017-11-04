//@flow
import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardText, CardActions, Button, IconButton, Icon, CardMenu, Badge } from 'react-mdl';

class Addon extends Component {

  getInstallUrl = () => {
    return "elobuddy://" + String(this.props.githubUrl).replace("https://", "").replace("http://", "").replace("github.com", "");
  }

  render() {
    return (
      <Card shadow={0} style={{height: '320px', margin: 'auto'}}>
        <CardTitle expand style={{color: '#fff', background: 'url(' + this.props.imageUrl + ') center no-repeat rgba(0,0,0,0.2)'}}>
          {this.props.name + " by " + this.props.authorName}
        </CardTitle>
        <CardText>
          <h6 style={{margin: '0'}}>
              <b>Likes:</b> {Number(this.props.likes)}
              <br/>
              <b>Status:</b> {this.props.status}
              <br/>
              <b>Type:</b> {this.props.type}
              <br/>
              <b>Winrate:</b> {this.props.winRate}
          </h6>
        </CardText>
        <CardActions border>
          <Button colored href={this.getInstallUrl()}>
            Install
          </Button>
          <Button colored href={this.props.githubUrl}>
            GitHub
          </Button>
          <Button colored href={this.props.forumUrl}>
            Forum
          </Button>
        </CardActions>
        <CardMenu>
          <IconButton name="thumb_up" style={{color: '#fff'}} onClick={(event) => {
            console.log(event);
          }}/>
        </CardMenu>
      </Card>
    );
  }
}

Addon.propTypes = {
  name: React.PropTypes.string.isRequired,
  authorName: React.PropTypes.string.isRequired,
  imageUrl: React.PropTypes.string.isRequired,
  forumUrl: React.PropTypes.string.isRequired,
  githubUrl: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  likes: React.PropTypes.number.isRequired,
  winRate: React.PropTypes.string.isRequired
}

export default Addon;
