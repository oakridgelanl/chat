import React, { Component } from 'react';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onMessageSubmit(this.state.value);
    this.setState({value: ''});
  }

  render() {
    const onlineClass = this.props.online ? '' : ' offline';
    return (
      <form onSubmit={this.handleSubmit} className={`new-message${onlineClass}`}>
        <label>
          Message:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Send" />
        </form>
    );
  }
}

export default MessageForm;
