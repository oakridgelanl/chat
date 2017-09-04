import React, { Component } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import MessageForm from './MessageForm';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.state = {
      currentUser: 'all',
      users: [],
      messages: [],
      online: false
    };
  }
  onMessageSubmit(message) {
    this.setState((prevState, props) => ({
      messages: [message, ...prevState.messages]
    }));
  }
  onUserClick(user) {
    console.log(user)
    // this.setState({
    //   currentUser: user
    // });
  }
  componentDidMount() {
    const socket = io(this.props.api);
    socket.on('connect', (socket) => this.setState({online: true}));
    socket.on('disconnect', (socket) => this.setState({online: false}));

    fetch(this.props.api + '/users')
      .then((res) => res.json())
      .then(data => this.setState(data))
      .catch(console.error);
  }
  render() {
    return (
      <div>
        <div className="users">
          <ul>
            {this.state.users.map(user => (
              <li key={user.id} onClick={() => this.onUserClick(user.id)}>{user.name}</li>
            ))}
          </ul>
        </div>
        <MessageForm online={this.state.online} onMessageSubmit={this.onMessageSubmit}/>
        <div className="messages">
          <ul>
            {this.state.messages.map(message => (
              <li key={message}>{message}</li>
            ))}
            <li>dave</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Chat;
