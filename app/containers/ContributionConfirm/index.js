/**
 *
 * ContributionConfirm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectContributionConfirm from './selectors';
import reducer from './reducer';
import saga from './saga';
import { toast, ToastContainer } from 'react-toastify';
import { ENGINE_METHOD_DH } from 'constants';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export class ContributionConfirm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // Begin constructor
  constructor(props) {
    super(props);
    this.state = ({
      url: '',
      copied: false,
      valid: true,
      validBlank: true,
    });
    this.goBack = this.goBack.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.copyFunction = this.copyFunction.bind(this);
    this.txValidator = this.txValidator.bind(this);
  }
  // End Constructor

  // Begin life cycle methods
  componentDidMount() {
    if (this.props.currency == 'Bitcoin') {
      const href = 'https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2';
      const query = queryString.parse(href);
      query.chl = this.props.btcAddress;
      const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(query)}`;
      this.setState({
        url: uri,
      });
    } else {
      const href = 'https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2';
      const query = queryString.parse(href);
      query.chl = this.props.ethAddress;
      const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(query)}`;
      this.setState({
        url: uri,
      });
    }
  }


  // End life cycle methods

  // Begin Container functions
  txValidator(e){
  
    let hash = e.target.value;
    if(hash.length > 0){
   if(this.props.currency == "Ethereum"){
    
   if(hash.match(/^(0x)?([A-Fa-f0-9]{64})$/)){
   this.setState({
     valid:true,
     validBlank: true,
   })
   }
   else{
     this.setState({
       valid:false,
       validBlank: false,
      
     })
   }
  }
  else if(this.props.currency == 'Bitcoin'){

 if(hash.match(/^[a-fA-F0-9]{64}$/)){
   this.setState({
     valid:true,
     validBlank: true,
   })
   }
   else{
     this.setState({
       valid:false,
       validBlank: false,
      
     })
   }
  }
  }
  else{
    this.setState({
      validBlank:true,
    })
  }
  }
  goBack() {
    this.props.back();
  }
  confirmPayment(e) {
   e.preventDefault();
   const hash = document.getElementById('txhash').value;
   if(this.state.valid){
    this.props.finalPayment(hash)
   }
   else{
     toast.error("Please enter a valid transaction hash")
   }
  }
  copyFunction() {
    let range = document.getSelection().getRangeAt(0);
    range.selectNode(document.getElementById('address'));
    window.getSelection().addRange(range);
    document.execCommand('copy');
    toast.success("Address copied");
  }

  // End Container functions

  // Begin render function
  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
          <div className="panel-heading">Confirm Payment</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-12">
                <div className="contribution">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 text-center">
                      <h2>You are almost there!</h2>
                      {/* <h4> Time remaining for this transaction: <span style={{ color: '#ff0000' }}>{this.props.min}:{this.props.sec}</span> (mm:ss)</h4> */}
                      {/* <div id="timer"></div> */}
                    </div>
                  </div>
                  
                    <div className="confirm-block">
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <ol>
                            <li>Wallet address to deposit <strong>{this.props.currencyQty} {this.props.currency === 'Ethereum' ? 'ETH' : 'BTC'}</strong> for purchase of <strong>{this.props.tokens} ZIN Coins</strong>
                              <div className="mt-10">
                                <div className="mt-20">
                                  <div className="blockchain-tx text-center ">

                                    <p><span>
                                      <h4 id="address" defaultValue={this.props.ethAddress}>{this.props.ethAddress}</h4>
                                     {/* <button style={{margin:"10px" ,borderRadius:"30px"}} className="form-buy-button" onClick={this.copyFunction}> */}
                                     <div className="row">
                                     <div className="col-sm-6">
                                     <CopyToClipboard text={this.props.ethAddress}
                                  onCopy={() => this.setState({copy: true})}>
                                <button style={{borderRadius:"30px"}} className="form-button">Copy</button>
                                </CopyToClipboard>
                                  </div>
                                  <div className="col-sm-6" style={{paddingTop:'10px'}}>
                                    {this.state.copy ? <p>TX hash copied.</p> : ''}
                                  </div>
                                  </div>
                                 </span></p>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>Please visit your cryptocurrency wallet and transfer the exact deposit amount specified above.</li>
                            <li>Only send {this.props.currency === 'Bitcoin' ? 'BTC' : 'ETH'} to this address</li>
                            <li>Once payment has been completed, there will be a record in transaction history. All transactions are verified manually daily and updated on the dashboard once approved</li>
                            <li>To avoid delays, you must paste and confirm your Blockchain TX Code as soon as available and confirm for our records.</li>
                          </ol>
                          <form onSubmit={this.confirmPayment} >
                          <div className="blockchain-tx">
                            <p>Please paste your blockchain TX hash below and click Confirm: <span>{this.props.currency === 'Bitcoin' ? <h4>{this.props.btcAddress}</h4> : <h4>{this.props.ethAddress}</h4>}</span></p>
                            <input required id="txhash" onChange={this.txValidator} type="text" className="form-input form-control" placeholder="Paste hash payment code" />
                          </div>
                          {this.state.valid || this.state.validBlank ?<p></p>:<p style={{color:"#ff0000"}}>Please enter a valid Transaction Hash</p>}
                          <div className="btn-row">
                            <button className="form-button btn btn-primary" type="submit">Confirm</button>
                            <button className="form-button btn btn-primary" style={{ margin: '10px' }} onClick={this.goBack}>Go Back</button>

                          </div>
                       
                        </form>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="qr-code">
                            <h4>Scan this Address QR Code from your {this.props.currency} wallet </h4>
                            {this.props.currency === 'Bitcoin' ? <img src={this.state.url} alt="" /> :
                              <img src={this.state.url} alt="" />}
                          </div>
                        </div>
                      </div>
                    </div>
                 
                </div>
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

ContributionConfirm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contributionconfirm: makeSelectContributionConfirm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'contributionConfirm', reducer });
const withSaga = injectSaga({ key: 'contributionConfirm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ContributionConfirm);
