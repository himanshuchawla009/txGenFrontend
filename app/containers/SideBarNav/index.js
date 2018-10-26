/**
 *
 * SideBarNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectSideBarNav from './selectors';
import reducer from './reducer';
import { Link } from 'react-router-dom';
// import routes from '../../router/routes'
import { userLoggedOut } from '../App/actions';
import { push } from 'react-router-redux';
import { makeSelectLocation } from 'containers/App/selectors';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

export class SideBarNav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dashAct: '',
      contAct: '',
      kycAct: '',
      tranAct: '',
      secAct: '',
      ticketAct: '',
      supportAct: '',
      faqAct: '',
      profileAct: '',
      resetPassAct: '',
      showSignOut: false
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.toggleDashActive = this.toggleDashActive.bind(this);
    this.toggleContriActive = this.toggleContriActive.bind(this);
    this.toggleKycActive = this.toggleKycActive.bind(this);
    this.toggleTicketActive = this.toggleTicketActive.bind(this);
    this.toggleSecActive = this.toggleSecActive.bind(this);
    this.toggleTranActive = this.toggleTranActive.bind(this);
    this.toggleSupportActive = this.toggleSupportActive.bind(this);
    this.toggleProfileActive = this.toggleProfileActive.bind(this);
    this.toggleResetPassActive = this.toggleResetPassActive.bind(this);
    this.toggleFaqActive = this.toggleFaqActive.bind(this);
    this.showSignOut = this.showSignOut.bind(this);
    this.closeSignOut = this.closeSignOut.bind(this);
  }

  componentDidMount() {
    this.setState({
      dashAct: this.props.dash,
      contAct: this.props.cont,
      kycAct: this.props.kyc,
      tranAct: this.props.tran,
      ticketAct: this.props.ticket,
      secAct: this.props.sec,
      supportAct: this.props.support,
      faqAct: this.props.faqAct,
      profileAct: this.props.profile,
      resetPassAct: this.props.resetPass
    });
  }
  handleLogOut() {
  // console.log('logginouttt...');
    this.props.logOut();
    this.props.push('/signin');
  }
  toggleDashActive(e) {
    this.props.compact();
    this.props.toggleDashActive();

  // console.log('toggling', e);
  }
  toggleContriActive(e) {
    // if(this.props.kycStatus == 'ACCEPTED'){
      this.props.compact();
      this.props.toggleContActive();
    // }else{
      // toast.error('Please complete your kyc to contribute.')
    // }
  }

  toggleKycActive(e) {
    if(this.props.kycStatus == 'PENDING' || this.props.kycStatus == 'REJECTED'){
      this.props.compact();
      this.props.toggleKycActive();
    }
  }

  toggleTranActive(e) {
    this.props.compact();
    this.props.toggleTranActive();
  // console.log('toggling', e);
  }
  toggleSecActive(e) {
    this.props.compact();
    this.props.toggleSecActive();
  }
  toggleSupportActive(e) {
    this.props.compact();
    this.props.toggleSupportActive();
  }
  toggleFaqActive(e) {
    this.props.compact();
    this.props.toggleFaqActive();
  }
  toggleTicketActive(e) {
    this.props.compact();
    this.props.toggleTicketActive();
  }
  toggleProfileActive(e) {
    this.props.compact();
    this.props.toggleProfileActive();
  }
  toggleResetPassActive(e) {
    this.props.compact();
    this.props.toggleResetPassActive();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dashAct: nextProps.dash,
      contAct: nextProps.cont,
      kycAct: nextProps.kyc,
      tranAct: nextProps.tran,
      secAct: nextProps.sec,
      ticketAct: nextProps.ticket,
      supportAct: nextProps.support,
      faqAct: nextProps.faq,
      profileAct: nextProps.profile,
      resetPassAct: nextProps.resetPass
    });
  }

  showSignOut() {
    this.setState({
      showSignOut: true
    })
  }
  
  closeSignOut() {
    this.setState({
      showSignOut: false
    })
  }
  

  render() {
    return (
      <div style={{'height': '100%','width': '100%','overflow': 'hidden'}}>
        <div style={{width: '100%',height: '99%',overflow: 'auto',paddingRight: '15px'}}>
        <ul className="nav navbar-nav sidebar-trigger hamburger-menu visible-xs">
          <li><a className="toggle-btn" data-toggle="ui-nav" role="button" onClick={this.props.compact}> <span /> </a> </li>
        </ul>
        <div className="static-modal">
            <Modal show={this.state.showSignOut} onHide={this.closeSignOut} bsSize="small" dialogClassName="modal-signout">
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-12 text-right" style={{'cursor': 'pointer'}}>
                      <i className="fa fa-close" onClick={this.closeSignOut}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3 className="signOut-head">Do you really want to sign out ?</h3><hr/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <button className="btn btn-outline" onClick={this.handleLogOut}>YES</button>
                    <button className="btn btn-outline" style={{marginLeft:'20px'}} onClick={this.closeSignOut}>GO Back</button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        <aside id="aside" className="ui-aside">
          {/* toggle buttons start*/}
          <ul className="nav navbar-nav sidebar-trigger hamburger-menu hidden-xs">
            <li><a className="toggle-btn" data-toggle="ui-nav" role="button" onClick={this.props.webCompact}> <span /> </a> </li>
          </ul>
          {/* toggle buttons end */}
          <ul className="nav ui-nav">
            <li className={this.state.dashAct} ><Link to="/dashboard" role="button" onClick={this.toggleDashActive}><span className="has-icon"><i className="fa fa-picture-o"></i></span><span>Dashboard</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard" role="button" onClick={this.toggleDashActive}><span>Dashboard</span></Link></li>
              </ul>
            </li>
            <li className={this.state.kycAct}><Link to="/dashboard/kyc" role="button" onClick={this.toggleKycActive} ><span className="has-icon"><i className="fa fa-id-card"></i></span><span>KYC Verify</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/kyc" role="button" onClick={this.toggleKycActive}><span>KYC Verify</span></Link></li>
              </ul>
            </li>
            {/* <li className={this.state.contAct}><Link to={this.props.kycStatus === 'ACCEPTED' ? "/dashboard/contribution" : this.props.location.pathname} role="button" onClick={this.toggleContriActive} ><span className="has-icon"><i className="fa fa-money"></i></span><span>Contribution</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/contribution" role="button" onClick={this.toggleContriActive}><span>Contribution</span></Link></li>
              </ul>
            </li> */}
            <li className={this.state.contAct}><Link to="/dashboard/contribution" role="button" onClick={this.toggleContriActive} ><span className="has-icon"><i className="fa fa-money"></i></span><span>Contribution</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/contribution" role="button" onClick={this.toggleContriActive}><span>Contribution</span></Link></li>
              </ul>
            </li>
            <li className={this.state.tranAct}><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive}><span className="has-icon"><i className="fa fa-history"></i></span><span>Transaction History</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive} ><span>Transaction History</span></Link></li>
              </ul>
            </li>
            <li className={this.state.ticketAct}><Link to="/dashboard/ticket" role="button" onClick={this.toggleTicketActive}><span className="has-icon"><i className="fa fa-ticket"></i></span><span>Manage Tickets</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/ticket" role="button" onClick={this.toggleTicketActive}><span>Manage Tickets</span></Link></li>
              </ul>
            </li>
            <li className={this.state.secAct}><Link to="/dashboard/security" role="button" onClick={this.toggleSecActive}><span className="has-icon"><i className="fa fa-lock"></i></span><span>Security</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/security" role="button" onClick={this.toggleSecActive}><span>Security</span></Link></li>
              </ul>
            </li>
            {/* <li className={this.state.supportAct}><Link to="/dashboard/support" role="button" onClick={this.toggleSupportActive}><span className="has-icon"><i className="fa fa-life-ring"></i></span><span>Support</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/support" role="button" onClick={this.toggleSupportActive}><span>Support</span></Link></li>
              </ul>
            </li>
            <li className={this.state.faqAct}><Link to="/dashboard/faq" role="button" onClick={this.toggleFaqActive}><span className="has-icon"><i className="fa fa-question-circle"></i></span><span>FAQ</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><a><span>FAQ</span></a></li>
              </ul>
            </li> */}
            {
              window.innerWidth < 768 ? <li className={this.state.profileAct}><Link to="/dashboard/profile" role="button" onClick={this.toggleProfileActive}><span className="has-icon"><i className="fa fa-user"></i></span><span>Update Profile</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/profile" role="button" onClick={this.toggleProfileActive}><span>Update Profile</span></Link></li>
              </ul>
            </li> : null
            }
            {
              window.innerWidth < 768 ? <li className={this.state.resetPassAct}><Link to="/dashboard/resetpassword" role="button" onClick={this.toggleResetPassActive}><span className="has-icon"><i className="fa fa-key"></i></span><span>Reset Password</span></Link>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><Link to="/dashboard/resetpassword" role="button" onClick={this.toggleResetPassActive}><span>Reset Password</span></Link></li>
              </ul>
            </li> : null
            }
            <li><a  onClick={this.showSignOut}  style={{cursor:'pointer'}} ><span className="has-icon"><i className="fa fa-sign-out"></i></span><span>Sign Out</span></a>
              <ul className="nav nav-sub sidebar-niceScroll">
                <li className="nav-sub-header"><a><span>Sign Out</span></a></li>
              </ul>
            </li> 
          </ul>
        </aside>
        </div>
      </div>
    );
  }
}

SideBarNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sidebarnav: makeSelectSideBarNav(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logOut: (user) => dispatch(userLoggedOut(user)),
    push: (route) => dispatch(push(route)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sideBarNav', reducer });

export default compose(
  withReducer,
  withConnect,
)(SideBarNav);
