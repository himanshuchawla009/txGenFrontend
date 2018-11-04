import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect, Link  } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import FaqPage from 'components/FaqPage/Loadable';
import Balance from 'components/Balance/Loadable';
import Refer from 'components/Refer/Loadable';
import KycAlert from 'components/KycAlert/Loadable';
import NavBarContainer from 'containers/NavBarContainer';
import TransactionHistory from 'containers/TransactionHistory';
import KycPage from 'containers/KycPage';
import TicketPage from 'containers/TicketPage';
import ContributionPage from 'containers/ContributionPage';
import TransferManager from 'containers/TransferManager';
import SecurityPage from 'containers/SecurityPage';
import ResetPassword from 'containers/ResetPassword';
import ProfilePage from 'containers/ProfilePage';
import SideBarNav from 'containers/SideBarNav';
import CustomLoading from 'components/CustomLoading/Loadable';
import { ToastContainer, toast } from 'react-toastify';
import { makeGlobalParent } from 'containers/App/selectors';
import { loadProfileAction, submitSocial, resetKycDone } from './actions';
import makeSelectDashBoardWelcomePage, { makeSelectKycDone }from './selectors';
import SupportPage from 'containers/Support';
import { resetSuccess } from '../KycPage/actions';
import $ from 'jquery'

import reducer from './reducer';
import saga from './saga';
import Web3 from 'web3';

const ABI = require('./CrowdSale');
const initialState={
  dash: '',
  sec: '',
  kyc: '',
  cont: '',
  tran: '',
  support: '',
  faq: '',
  ticket: '',
  profile: '',
  resetPass: '',
  transfer:'',
};

export class DashBoardWelcomePage extends React.PureComponent {
  constructor() {
    super();
    this.compactNav = this.compactNav.bind(this);
    this.openNav = this.openNav.bind(this);
    this.webScreenCompact = this.webScreenCompact.bind(this);
    this.state = {
      compact: 'ui',
      dash: '',
      kyc: '',
      sec: '',
      cont: '',
      tran: '',
      faq: '',
      ticket: '',
      profile: '',
      resetPass: '',
      support: '',
      alertMsg: '',
      showAlert: true,
      showVideo: false,
      notifyTransactions: [],
      transfer: '',
    };
    this.toggleContActive = this.toggleContActive.bind(this);
    this.toggleDashActive = this.toggleDashActive.bind(this);
    this.toggleSecActive = this.toggleSecActive.bind(this);
    this.toggleTranActive = this.toggleTranActive.bind(this);
    this.toggleKycActive = this.toggleKycActive.bind(this);
    this.toggleTicketActive = this.toggleTicketActive.bind(this);
    this.toggleSupportActive = this.toggleSupportActive.bind(this);
    this.toggleFaqActive = this.toggleFaqActive.bind(this);
    this.toggleProfileActive = this.toggleProfileActive.bind(this);
    this.toggleResetPassActive = this.toggleResetPassActive.bind(this);
    this.toggleTransferActive = this.toggleTransferActive.bind(this);
    this.dashActive = this.dashActive.bind(this);
    this.buyPage = this.buyPage.bind(this);
    this.socialSubmit = this.socialSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.showVideo = this.showVideo.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
    this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
    this.contract = new this.web3.eth.Contract(ABI, '0xcc760e05f33d4d9775248fac39e8cfde40476270');
  }
  componentWillMount() {
    this.props.loadProfileAction();
    console.log(this.props);
  }

  componentDidMount() {
    const outer = this;
    this.contract.events.transactionNotify()
    .on('data', function (event) {
      const transaction = {
        address: event.returnValues['0'],
        amount: event.returnValues.weiAmount / Math.pow(10, 18)
      }
      var newArray = outer.state.notifyTransactions.slice();    
      newArray.unshift(transaction);
      outer.setState({notifyTransactions:newArray})
    });
    console.log('dashboard');
    if (this.props.location.pathname == '/dashboard') {
      this.setState({
        dash: 'active',
        cont: '',
        kyc: '',
        tran: '',
        sec: '',
        support: '',
        ticket: '',
        faq: '',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/contribution') {
      this.setState({
        dash: '',
        cont: 'active',
        kyc: '',
        tran: '',
        sec: '',
        support: '',
        ticket: '',
        faq: '',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/kyc') {
      this.setState({
        dash: '',
        cont: '',
        kyc: 'active',
        tran: '',
        sec: '',
        support: '',
        ticket: '',
        faq: '',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/transactionHistory') {
      this.setState({
        dash: '',
        cont: '',
        kyc: '',
        tran: 'active',
        sec: '',
        support: '',
        ticket: '',
        faq: '',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/security') {
      this.setState({
        dash: '',
        cont: '',
        kyc: '',
        tran: '',
        sec: 'active',
        support: '',
        ticket: '',
        faq: '',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/ticket') {
      this.setState({
        dash: '',
        cont: '',
        kyc: '',
        tran: '',
        sec: '',
        support: '',
        faq: '',
        ticket: 'active',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/support') {
      this.setState({
        dash: '',
        cont: '',
        kyc: '',
        tran: '',
        sec: '',
        support: 'active',
        ticket: '',
        faq: '',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/faq') {
      this.setState({
        dash: '',
        cont: '',
        kyc: '',
        tran: '',
        sec: '',
        support: '',
        ticket: '',
        faq: 'active',
        profile: '',
        resetPass: '',
        transfer:'',
      });
    } else if (this.props.location.pathname == '/dashboard/profile') {
      this.setState({
        dash: '',
        cont: '',
        kyc: '',
        tran: '',
        sec: '',
        support: '',
        faq: '',
        ticket: '',
        profile: 'active',
        resetPass: '',
        transfer:'',
      });
    }
    else if (this.props.location.pathname == '/dashboard/transferManager') {
      this.setState({
        dash: '',
        cont: '',
        kyc: '',
        tran: '',
        sec: '',
        support: '',
        faq: '',
        ticket: '',
        profile: '',
        resetPass: '',
        transfer:'active',
      });
    }
  }

  showVideo(e){
    e.preventDefault();

    this.setState({
      showVideo : true
    });
  }

  closeVideo(e){
    this.setState({
      showVideo : false
    })
  }


  socialSubmit(e){
    e.preventDefault();

    const socialDetails = {
      name : this.props.dashboardwelcomepage.userInfo.fullName,
      twitter : e.target[0].value,
      telegram : e.target[1].value
    }
    this.props.submitSocial(socialDetails);
  }

  buyPage(e) {
    if(this.props.dashboardwelcomepage.userInfo.kycStatus !== 'ACCEPTED'){
      toast.error('Please complete your kyc to contribute')
    }else{
      this.toggleContActive()
    }
  }

  handleSubmitVote(data) {
    // console.log(data);
    this.props.submitVote(data);
  }
  compactNav() {
   // console.log(window.innerWidth);
    if (window.innerWidth < 770) {
     // console.log('compacting');
      if (this.state.compact === 'ui') {
        this.setState({
          compact: 'ui ui-aside-compact',

        });
      } else {
        this.setState({
          compact: 'ui',
          dashAct: 'active',
          kycAct: '',
          contAct: '',
          tranActive: '',
          secActive: '',
          supportActive: '',
          ticketActive: '',
          faqActive: '',
          profileActive: '',
          resetPassActive: ''
        });
      }
    }
  }
  webScreenCompact() {
    // console.log('compacting');
    if (this.state.compact === 'ui') {
      this.setState({
        compact: 'ui ui-aside-compact',

      });
    } else {
      this.setState({
        compact: 'ui',

      });
    }
  }

  openNav() {
    // console.log('opening');
    this.setState({
      compact: 'ui',
    });
  }
  toggleDashActive() {
    this.setState({
      ...initialState,
      dash: 'active'
    });
  }
  toggleSecActive() {
    this.setState({
      ...initialState,
      sec: 'active'
    });
  }
  toggleContActive() {
    this.setState({
      ...initialState,
      cont: 'active'
    });
  }
  toggleTranActive() {
    this.setState({
      ...initialState,
      tran: 'active'
    });
  }
  toggleSupportActive() {
    this.setState({
      ...initialState,
      support: 'active'
    });
  }
  dashActive() {
    this.setState({
      ...initialState,
      dash: 'active'
    });
    this.notifyTimeout();
  }
  toggleKycActive() {
    this.setState({
      ...initialState,
      kyc: 'active'
    });
  }
  toggleFaqActive() {
    this.setState({
      ...initialState,
      faq: 'active'
    });
  }
  toggleTicketActive() {
    this.setState({
      ...initialState,
      ticket: 'active'
    });
  }
  toggleProfileActive() {
    this.setState({
      ...initialState,
      profile: 'active'
    });
  }
  toggleResetPassActive() {
    this.setState({
      ...initialState,
      resetPass: 'active'
    });
  }
  toggleTransferActive() {
    this.setState({
      ...initialState,
      transfer: 'active'
    });
  }
  notifyTimeout() {
    toast.error('Transaction timeout ,Please try again and complete transaction within 30 minutes');
  }
  notify() {
    toast.success('Thanks for the voting. You can refer friends now');
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.kycDone){
      this.props.loadProfileAction();
      this.props.resetKycDone();
      this.toggleDashActive();
    }
  }

  closeAlert(){
    console.log('SHow alert');
    this.setState({
      showAlert : false
    })
  }

  render() {
    console.log(this.state.notifyTransactions);
    if(this.state.notifyTransactions.length == 1){
      setTimeout(function(){
        $("#notify").addClass("hidden");
       }, 5000);
    }

    if(this.state.notifyTransactions.length > 1){
      setTimeout(function(){
        $("#notify").addClass("hidden");
       }, 5000);
       let arr = this.state.notifyTransactions;
       arr.pop();
       this.setState({
         notifyTransactions: arr
       })
      //  if(this.state.notifyTransactions.length >= 1){
        $("#notify").removeClass("hidden");
      //  }
    }

  
    const { kycStatus } = this.props.dashboardwelcomepage.userInfo; 
    if (!localStorage.token) {
      return <Redirect to="/" />;
    }
    if (this.props.dashboardwelcomepage.loading) {
      return (
        <div>
          <CustomLoading />
        </div>);
    }
    return (
      <div>
        <NavBarContainer username={this.props.dashboardwelcomepage.userInfo.fullName} />
        <div id="ui" className={this.state.compact}>
          <ToastContainer position="top-center" autoClose={6000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
          <SideBarNav
            kycStatus={this.props.dashboardwelcomepage.userInfo.kycStatus}
            dash={this.state.dash}
            sec={this.state.sec}
            tran={this.state.tran}
            transfer={this.state.transfer}
            cont={this.state.cont}
            kyc={this.state.kyc}
            support={this.state.support}
            faq={this.state.faq}
            ticket={this.state.ticket}
            profile= {this.state.profile}
            resetPass = {this.state.resetPass}
            compact={this.compactNav}
            open={this.openNav}
            webCompact={this.webScreenCompact}
            dashAct={this.state.dashAct}
            toggleDashActive={this.toggleDashActive}
            toggleContActive={this.toggleContActive}
            toggleKycActive={this.toggleKycActive}
            toggleSecActive={this.toggleSecActive}
            toggleTranActive={this.toggleTranActive}
            toggleSupportActive={this.toggleSupportActive}
            toggleFaqActive={this.toggleFaqActive}
            toggleProfileActive={this.toggleProfileActive}
            toggleResetPassActive={this.toggleResetPassActive}
            toggleTicketActive={this.toggleTicketActive}
            toggleTransferActive={this.toggleTransferActive}
          />
          {(this.props.location.pathname == '/dashboard') ?
             <div id="content" className="ui-content ui-content-aside-overlay">
              <KycAlert kycStatus={this.props.dashboardwelcomepage.userInfo.kycStatus} closeAlert={this.closeAlert} showAlert={this.state.showAlert}/>
              {/*
                kycStatus === 'ACCEPTED' ? <Link to="/dashboard/contribution" > 
                <button onClick={this.buyPage} className="form-buy-button"> <span>Buy Coins</span></button>
                </Link> : <button onClick={this.buyPage} className="form-buy-button"> <span>Buy Coins</span></button>
              */}
              <div className="ui-content-body">
                <div className="ui-container container-fluid">
                  <Balance userInfo={this.props.dashboardwelcomepage.userInfo} />
                  {/* <Refer code={this.props.dashboardwelcomepage.userInfo} /> */}
                </div>
              </div>

            </div> : (this.props.location.pathname == '/dashboard/security') ?
              <SecurityPage /> :
              (this.props.location.pathname == '/dashboard/profile') ?
              <ProfilePage /> :
              (this.props.location.pathname == '/dashboard/resetpassword') ?
                <div id="content" className="ui-content ui-content-aside-overlay reset-password">
                  <div className="ui-content-body">
                    <div className="ui-container container-fluid">
                      <ResetPassword />
                    </div>
                  </div>
                </div> :
                  (this.props.location.pathname == '/dashboard/contribution') ?
                  <ContributionPage /> :
                  (this.props.location.pathname == '/dashboard/transferManager') ?
                  <TransferManager /> :
                  (this.props.location.pathname == '/dashboard/support') ?
                  <SupportPage /> :
                  (this.props.location.pathname == '/dashboard/faq') ?
                  <FaqPage /> :
                  (this.props.location.pathname == '/dashboard/ticket') ?
                  <TicketPage /> :
                  (this.props.location.pathname == '/dashboard/kyc') ?
                    <KycPage dashActive={this.toggleDashActive} kycActive={this.toggleKycActive}/> :
                  (this.props.location.pathname == '/dashboard/transactionHistory') ?
                    <TransactionHistory message={this.props.global.depositSuccess} /> :
'' }
          <div id="footer" className="ui-footer">© 2018 Fraction0x, All Rights Reserved</div>
          <div className="sticky-telegram-logo"><a href=" https://t.me/zineumofficial" className="sticky-telegram-icon" target="_blank">Telegram</a></div>
          { this.state.notifyTransactions.length > 0 ? 
          <div className="notify-deposit fade-in" id="notify">
          <p><strong>{this.state.notifyTransactions[this.state.notifyTransactions.length-1].address}</strong><br/> 
            has contributed <strong>{this.state.notifyTransactions[this.state.notifyTransactions.length-1].amount}ETH</strong></p>
          </div> : null
          }
        </div>        
      </div>);
  }
}

DashBoardWelcomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardwelcomepage: makeSelectDashBoardWelcomePage(),
  global: makeGlobalParent(),
  kycDone: makeSelectKycDone()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProfileAction: () => dispatch(loadProfileAction()),
    submitSocial: (data) => dispatch(submitSocial(data)),
    resetKycDone: () => dispatch(resetKycDone())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashBoardWelcomePage', reducer });
const withSaga = injectSaga({ key: 'dashBoardWelcomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashBoardWelcomePage);
