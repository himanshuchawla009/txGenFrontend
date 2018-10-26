/**
 *
 * ForgotPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Link } from 'react-router-dom';
import { forgotPassword, mailSent, mailError } from './actions';
import makeSelectForgotPassword, { makeSelectMail, makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ReCAPTCHA from 'react-google-recaptcha';

export class ForgotPassword extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      'g-recaptcha-response': '',
      captcha : false
    }
    this.forgotPass = this.forgotPass.bind(this);
    this.notifyCaptcha = this.notifyCaptcha.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.mailSent)
    const forgotPassForm = document.getElementById('forgotPassForm');
    if (nextProps.mailSent) {
      this.notify();
      this.props.sent(false);
      forgotPassForm.reset();
    } else if (nextProps.mailError) {
      // console.log(nextProps.mailSent);
      this.notifyError();
      this.props.error(false);
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps) {
      return true;
    }
    return false;
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

  forgotPass(e) {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      captcha: this.state['g-recaptcha-response'],
    };
    // console.log(e.target[0].value);
    if (this.state.captcha === true) {
      this.setState({
        captcha: false,
      });
      window.grecaptcha.reset();
      this.props.forgot(data);
    } 
    else {
      this.notifyCaptcha();
    }
  }
  notifyCaptcha() {
    toast.error('Please Verify that you are not a robot');
  }
  notifyError() {
    toast.error('Your account does not exist. Please sign-up to create your account.');
  }
  notify() {
    toast.success('Password reset link has been sent to your email.');
  }

  render() {
    if (localStorage.token) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="wrapper">
        <header className="header signin">

          <div className="container">
            <div className="row">

              <div className="col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix">
                <ToastContainer position="top-center" autoClose={2800} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover={false} />
                <div className="logo"><Link to="/">
                {/* <img src="/assets/img/logo.png" alt="ZINEUM" /> */}
                <h4 style={{fontFamily: 'muli', fontWeight: '900', fontSize: '25px',color: '#fff', fontStyle: 'italic', letterSpacing: '0.6'}}>FRACTION0X</h4>
                </Link></div>
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
                <div className="card-header">
                  <h1>Forgot Password</h1>
                  <p className="subtitle">Please enter your email address. We will send you an email to reset your password.</p>
                </div>
                <div className="signin-card-body">
                  <form onSubmit={this.forgotPass} id="forgotPassForm">
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

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,

};

const mapStateToProps = createStructuredSelector({
  forgotpassword: makeSelectForgotPassword(),
  mailSent: makeSelectMail(),
  mailError: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    forgot: (data) => dispatch(forgotPassword(data)),
    sent: (data) => dispatch(mailSent(data)),
    error: (data) => dispatch(mailError(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'forgotPassword', reducer });
const withSaga = injectSaga({ key: 'forgotPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPassword);
