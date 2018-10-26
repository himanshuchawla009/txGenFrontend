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
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Total Balance</h3>
              <div className="balance">{Math.round(this.props.userInfo.tokens.total)}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Referral Coins Earned</h3>
              <div className="balance">{this.props.userInfo.tokens.referral}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3># of Confirmed Referrals</h3>
              <div className="balance">{this.props.userInfo.referral.success}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3># of Pending Referrals</h3>
              <div className="balance">{this.props.userInfo.referral.pending}</div>
            </div>
          </div>
        </div>
        </div>
        </div>
            <div className="panel panel-default">
                <div className="panel-heading">Bounty Stakes</div>
                <div className="panel-body">
                <div className="row">
                  <div className="col-sm-12">
                <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Creative Stakes</h3>
              <div className="balance">{Math.round(this.props.userInfo.tokens.bounty.creative)}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Youtube Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.youtube}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Twitter Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.twitter}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Facebook Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.facebook}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Translation Stakes</h3>
              <div className="balance">{Math.round(this.props.userInfo.tokens.bounty.translation)}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Reddit Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.reddit}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Telegram Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.telegram}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Signature Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.signature}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>LinkedIn Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.linkedIn}</div>
            </div>
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
