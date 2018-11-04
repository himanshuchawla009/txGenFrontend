/**
*
* Balance
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Balance extends React.PureComponent {
  render() {
    console.log('tokens: ', this.props.userInfo.tokens);
    return (
      <div>
        <div className="panel panel-default">
        <div className="panel-heading">Your Balance</div>
        <div className="panel-body">
        <div className="row">
          <div className="col-sm-12">
            <p>Transaction may take up to 24 hours to approve due to our comprehensive verification methods to protect our customers.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="bal-card">
              <h3>Total Balance</h3>
              <div className="balance">{Math.round(this.props.userInfo.tokens.total)}</div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

Balance.propTypes = {

};

export default Balance;
