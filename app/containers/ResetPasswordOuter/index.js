/**
 *
 * ResetPasswordOuter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { passwordReset } from 'containers/App/actions';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectResetPasswordOuter, { makeSelectResetToken, makeSelectResetError, makeSelectResetSuccess, makeSelectResetErrorMessage, makeSelectResetSuccessMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { resetPassword } from './actions';

export class ResetPasswordOuter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      resetToken: '',
      errorPassword: '',
      match: '',
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.token != null) {
    // console.log(this.props.match.params.token);
      this.setState({
        resetToken: this.props.match.params.token,
      });
    } else {
      this.setState({
        resetToken: '',
      });
    }
    if (this.props.error) {
      this.notify(this.props.errorMessage);
    }
  }

  componentWillReceiveProps(nextProps) {
  // console.log(nextProps)
    if (nextProps.error) {
      this.notify(nextProps.errorMessage);
    }
  }
  
  shouldComponentUpdate(nextProps) {
    if (nextProps) {
      return true;
    } 
    return false;
  }

  notify(error) {
    toast.error(error);
  }
  notifySuccess(message) {
    toast.success(message);
  }

  formSubmit(e) {
    e.preventDefault();
    const newPassword = e.target[0].value;
    const confPassword = e.target[1].value;

    // console.log(newPassword)
    const data = {
      token: this.props.match.params.token,
      newPassword: e.target[0].value,
    };

    if (newPassword == confPassword) {
      this.props.reset(data);
      this.props.passwordReset();
    } else {
      this.notify('Password do not match');
    }
  }
  passwordMatch() {
    const pass = document.getElementById('newPassword').value;
    const password = document.getElementById('confPassword').value;
    if (password === '') {
      this.setState({
        match: '',
      });
    }
    if (pass === password) {
      this.setState({
        match: true,
      });
    } else {
      this.setState({
        match: false,
      });
    }
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
                <ToastContainer position="top-center" type="error" autoClose={2800} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover={false} />
                <div className="logo"><img src="/assets/img/logo.png" alt="ZINEUM" /></div>
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
                  <h1>Reset Password</h1>
                  <p className="subtitle">Please enter your new password.</p>
                </div>
                <div className="signin-card-body">
                  <form onSubmit={this.formSubmit}>
                    <div className="form-group">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input id="newPassword" type="password" className="form-input form-control" name="newPassword" placeholder="Enter New Password" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confPassword" className="form-label">Confirm Password</label>
                      <input id="confPassword" onChange={this.passwordMatch} type="password" className="form-input form-control" name="confPassword" placeholder="Confirm New Password" required />
                    </div>
                    {(this.state.match == true) ? <p style={{ color: '#00bb27' }}>Password matched</p> : (this.state.match === '') ? <p style={{ color: '#0000fe' }}></p> : <p style={{ color: '#ff0000' }}>Password do not match</p>}
                    <div className="text-center">
                      <button type="submit" className="form-button">Reset Password</button>
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

ResetPasswordOuter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetpasswordouter: makeSelectResetPasswordOuter(),
  resetToken: makeSelectResetToken(),

  success: makeSelectResetSuccess(),
  error: makeSelectResetError(),
  successMessage: makeSelectResetSuccessMessage(),
  errorMessage: makeSelectResetErrorMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    reset: (data) => dispatch(resetPassword(data)),
    passwordReset: () => dispatch(passwordReset()),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPasswordOuter', reducer });
const withSaga = injectSaga({ key: 'resetPasswordOuter', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPasswordOuter);
