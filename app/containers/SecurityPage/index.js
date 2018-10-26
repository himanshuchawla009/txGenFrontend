/**
 *
 * SecurityPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSecurityPage, { makeSelectEnable, makeSelectResponse, makeSelectDisable, makeSelectQr, makeSelectVerified, makeSelectQrKey } from './selectors';
import { enable2fa, disable2fa, success2fa, verify2fa } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeGlobalParent } from '../App/selectors';
import { ToastContainer, toast } from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export class SecurityPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.securityCheck = this.securityCheck.bind(this);
    this.disableCheck = this.disableCheck.bind(this);
    this.state = {
      imageBase64: '',
      check: false,
      enabled: false,
      copy: false
    };
    this.verifyAuth = this.verifyAuth.bind(this);
    this.disableAuth = this.disableAuth.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.verified)

    // console.log(this.props.global.fa_enabled)
    // console.log(this.props.global.fa_disabled)
    // console.log(this.state.enabled)
    if (this.props.global.fa_enabled) {
      document.getElementById('2fa').checked = true;
      this.setState({
        enabled: true,
      });
    }
  }
  componentWillReceiveProps(nextProps) {

    // console.log(nextProps)
    this.setState({
      imageBase64: nextProps.qrCode,
    });
  }

  notifySuccess(message) {
    toast.success(message);
  }

  notifyError(message) {
    toast.error(message);
  }

  securityCheck() {
  // console.log("selected")
    this.setState({
        copy : false
    })
    const fa = document.getElementById('2fa');
    this.props.enable2fa();
    if (fa.checked && !this.state.check) {
      this.setState({
        check: true,
      });
      // console.log(this.props.global.fa_disabled)
    } else if ((!fa.checked)) {
      this.setState({
        check: false,
      });
    }
  }

  disableCheck() {
    if (this.state.check) {
      this.setState({
        check: false,
        enabled: false,

      });
      // console.log(this.props.global.fa_disabled)
    }
  }
  verifyAuth(e) {
    e.preventDefault();
    this.setState({
      check: true,
      enabled: true,
    });
    this.props.verify2fa(e.target[0].value);
  }
  disableAuth() {
    this.props.disable2fa();
    this.setState({
      enabled: false,
      check: false,
    });
  }

  render() {
    if(this.props.response){
      if(this.props.response.success){
        this.notifySuccess(this.props.response.message);
        // this.props.resetSuccess();
      }
      if(!this.props.response.success){
        this.notifyError(this.props.response.message);
      }
    }
    if (!localStorage.token) {
      return <Redirect to="/" />;
    }
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        {/* <h1>Security</h1> */}
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
            <div className="" style={{ marginBottom: '500px' }}>
            <div className="panel panel-default">
              <div className="panel-heading">Two-Factor Authentication</div>
                <div className="panel-body" style={{fontSize:'16px'}}>
              <div className="row">
                <div className="col-sm-12">

                  {
                    (this.props.global.fa_enabled && this.state.enabled) ?
                      <div>
                        <button onClick={this.disableAuth} className="form-button" style={{ marginTop: '10px' }}>Disable 2fa</button>
                      </div> :
                      (!this.state.check) ? <form>
                        <div className="checkbox">
                          <label>
                            <input id="2fa" type="checkbox" onChange={this.securityCheck} />
                            Enable Two-Factor Authentication via Google Authenticator
                          </label>
                        </div>
                      </form> :
                        (this.state.check) ?
                          <div>
                            <form>
                              <div className="checkbox">
                                <label>
                                  <input id="2fa2" type="checkbox" checked onChange={this.disableCheck} />
                                     Enable Two-Factor Authentication via Google Authenticator
                                </label>
                              </div>
                            </form>
                            <form onSubmit={this.verifyAuth}>
                            <div className="row">
                             <div className="col-sm-6 text-center">
                              <img src={`data:image/jpeg;${this.state.imageBase64}`} />
                                </div>
                                <div className="col-sm-5 bal-card qrKey">
                               <h3>Manual Key : </h3>
                               <span><h4 style={{wordWrap: 'break-word'}} id="qrKey">{this.props.qrKey}</h4></span>
                               <CopyToClipboard text={this.props.qrKey}
                                  onCopy={() => this.setState({copy: true})}>
                                  <span className="btn btn-primary">Copy</span>
                                </CopyToClipboard>
                               <h4>{ this.state.copy ? 'Key copied' : '' }</h4>
                             </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="otp" className="form-label"> Scan QR code from authenticator app to get your 2FA code</label>
                                <input id="otp" type="number" name="otp" className="form-input form-control" placeholder="Your 2fa code" required />
                              </div>
                              <div className="text-center">
                              <button type="submit" className="form-button" style={{ marginTop: '10px' }}>Verify</button>
                              </div>
                              
                            </form>
                          </div>
                          : <div></div>
                  }

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

SecurityPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  securitypage: makeSelectSecurityPage(),
  enabled: makeSelectEnable(),
  qrCode: makeSelectQr(),
  global: makeGlobalParent(),
  disabled: makeSelectDisable(),
  verified: makeSelectVerified(),
  response: makeSelectResponse(),
  qrKey: makeSelectQrKey()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    enable2fa: () => dispatch(enable2fa()),
    disable2fa: () => dispatch(disable2fa()),
    success2fa: (data) => dispatch(success2fa(data)),
    verify2fa: (data) => dispatch(verify2fa(data)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'securityPage', reducer });
const withSaga = injectSaga({ key: 'securityPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SecurityPage);
