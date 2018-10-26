/**
 *
 * ResendConfirmationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectResendConfirmationPage from './selectors';
import reducer from './reducer';
import saga, { resend } from './saga';
import { toast, ToastContainer } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom'; 
import { resendMail } from './actions';
import { makeSelectResendError, makeSelectResendSuccess } from './selectors';
import ReCAPTCHA from 'react-google-recaptcha';

export class ResendConfirmationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
      email : '',
      success : false,
      'g-recaptcha-response': '',
      captcha : false
    }
    this.submitMail = this.submitMail.bind(this);
    this.notifyCaptcha = this.notifyCaptcha.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submitMail(e){
    e.preventDefault();
    const data = {
      email : e.target[0].value,
      captcha: this.state['g-recaptcha-response'],      
    }
    if (this.state.captcha === true) {
      this.setState({
        captcha: false,
      });
      window.grecaptcha.reset();
      this.props.resendMail(data);
    } 
    else {
      this.notifyCaptcha();
    }
  }

  notifyCaptcha() {
    toast.error('Please Verify that you are not a robot');
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.resendSuccess){
      if(nextProps.resendSuccess.success){
        this.setState({
          success : true
        })
      }else{
        toast.error(nextProps.resendSuccess.message)
      }
    }
  }

  onChange = (e) => {
    this.setState({
      'g-recaptcha-response': e,
    });
    if (e.length > 0) {
      this.setState({
        captcha: true,
      });
    }
    // console.log(this.state['g-recaptcha-response']);
  }

  render() {
    if (localStorage.token) {
      return <Redirect to="/dashboard" />;
    }
    if (this.state.success){
      return <section className="signin-block">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <div className="resend">
              <h1>Resend Confirmation Success</h1>
              <p>
                Please check your email for verification link.
              </p>
            </div>
            <div className="signin-card-body">
              <h2 style={{ textAlign: 'center' }}>WARNING.</h2>
              <p>If you DON’T see our emails, please check your SPAM folder.</p>
              <p> To avoid our email to you being considered as SPAM, please add the following email to your contact list: hello@fraction.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    }
    return (
      <div className="wrapper">
        <header className="header signin">

          <div className="container">
            <div className="row">

              <div className="col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix">
                <ToastContainer position="top-center" autoClose={2800} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover={false} />
                <div className="logo">
                <Link to="/">
               {/* <img src="/assets/img/logo.png" alt="ZINEUM" /> */}
                <h4 style={{fontFamily: 'muli', fontWeight: '900', fontSize: '25px',color: '#fff', fontStyle: 'italic', letterSpacing: '0.6'}}>FRACTION0X</h4>
                </Link>
                </div>
              </div>
              <div className="col-xs-7 col-sm-6 col-md-10">
                <div className="header-right">

                  <div className="header-btn-group">
                    <div className="header-btn"><Link to="/signin">Sign In</Link></div>
                  </div>
                </div></div>
            </div>
          </div>
        </header>
        <section className="signin-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <div className="resend">
                  <h1>Resend Confirmation Instruction</h1>
                  <p className="subtitle">Please enter your email address. We will send you an email with Confirmation Instructions.</p>
                </div>
                <div className="signin-card-body">
                  <form onSubmit={this.submitMail} id="forgotPassForm">
                    <div className="form-group">
                      <label htmlFor="emailAddress" className="form-label">Email Address</label>
                      <input id="emailAddress" type="email" name="email" className="form-input form-control" placeholder="Your Email" required />
                    </div>
                    <div className="form-group text-center">
                      <ReCAPTCHA type="image" ref="recaptcha" className="form-captcha" required sitekey="6LdUZHIUAAAAAC-Fs1h2axjwggA74SYYarH3XZ6-" onChange={this.onChange} />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="form-button">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ResendConfirmationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resendconfirmationpage: makeSelectResendConfirmationPage(),
  resendError: makeSelectResendError(),
  resendSuccess: makeSelectResendSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resendMail : (data) => dispatch(resendMail(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resendConfirmationPage', reducer });
const withSaga = injectSaga({ key: 'resendConfirmationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResendConfirmationPage);
