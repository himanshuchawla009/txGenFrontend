/**
 *
 * SignupConfirm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { toast, ToastContainer } from 'react-toastify';
import makeSelectSignupConfirm, { makeSelectFailureMessage, makeSelectSuccessMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { resendAction } from './actions';
export class SignupConfirm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.resendMail = this.resendMail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resendSuccess) {
      this.notifySuccess(nextProps.resendSuccess);
    } else if (nextProps.resendFailure) {
      this.notifyError(nextProps.resendFailure);
    }
  }
  notifyError(data) {
    toast.error(data);
  }
  notifySuccess(data) {
    toast.success(data);
  }
  resendMail() {
  // console.log(this.props.email);
    this.props.resendMail(this.props.email);
  }
  render() {
    return (
      <div className="wrapper">
        <header className="header signin">
          <ToastContainer position="top-center" autoClose={10000000000000000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover={false} />
          <div className="container">
            <div className="row">

              <div className="col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix">

                <div className="logo"><Link to="/"><img src="/assets/img/logo.png" alt="ZINEUM" /></Link></div>
              </div>
              <div className="col-xs-7 col-sm-6 col-md-10"></div>
            </div>
          </div>
        </header>
        <section className="signin-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <div className="card-header">
                  <h1>Sign Up Success</h1>
                  <h2>
                  Please check your email for verification link.
                  </h2>

                </div>
                <div className="signin-card-body">
                  <h2 style={{ textAlign: 'center' }}>WARNING.</h2>
                  <p>If you DON’T see our emails, please check your SPAM folder.</p>
                  <p> To avoid our email to you being considered as SPAM, please add the following email to your contact list: hello@zineum.io</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SignupConfirm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signupconfirm: makeSelectSignupConfirm(),
  resendSuccess: makeSelectSuccessMessage(),
  resendFailure: makeSelectFailureMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resendMail: (data) => (dispatch(resendAction(data))),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'signupConfirm', reducer });
const withSaga = injectSaga({ key: 'signupConfirm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupConfirm);
