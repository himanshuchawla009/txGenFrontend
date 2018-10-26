/**
*
* UserMessage
*
*/

import React from 'react';
// import styled from 'styled-components';


class UserMessage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  renderMessage(message){
    console.log('hello user message');
    const msg = message.message;
    const id = message._id;
    const type = message.type;
    return (
      <div key={id}>
      { type == "USER" ? 
        <div style={{padding: '5px', margin: '15px'}} className="text-right">
          <p><span className="alert alert-success" style={{borderRadius: '5px', padding: '15px'}}>{msg}</span></p>
        </div> : 
        <div style={{padding: '5px', margin: '15px'}}>
          <p><span className="alert alert-danger" style={{borderRadius: '5px', padding: '15px'}}>{msg}</span></p>
        </div>
      }
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.messages.map(this.renderMessage)}
      </div>
    );
  }
}

UserMessage.propTypes = {

};

export default UserMessage;
