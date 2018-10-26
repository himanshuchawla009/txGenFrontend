/**
 *
 * ResetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Redirect } from 'react-router-dom';
import makeSelectResetPassword, { makeSelectResetError, makeSelectResetSuccess } from './selectors';
import { resetError, resetSuccess, resetPassword } from './actions';
import reducer from './reducer';
import saga from './saga';

export class ResetPassword extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.formValidation = this.formValidation.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
  console.log(nextProps)
    if (nextProps.resetSuccess) {
      this.notify();
      this.props.success(false);
    } else if (nextProps.resetError) {
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


  notifyError() {
    toast.error('Your old password is not correct');
  }
  notify() {
    toast.success('Your password has been changed successfully');
  }
  notifyPasswordError() {
    toast.error('New password cannot be same as the old password.');
  }
  notifyPasswordNotSame() {
    toast.error('Password do not match');
  }

  formSubmit(e) {
    e.preventDefault();
    let userData;
    if (this.formValidation(e.target[1].value, e.target[2].value)) {
      userData = {
        oldPassword: e.target[0].value,
        newPassword: e.target[1].value,
      };
      // console.log(userData);
      if (userData.oldPassword == userData.newPassword) {
        this.notifyPasswordError();
      } else {
        this.props.reset(userData);
      }
    }
  }

  formValidation(newPass, confirmNew) {
    if (newPass === confirmNew) {
      return true;
    }
    this.notifyPasswordNotSame();
    return false;
  }
  render() {
    if (!localStorage.token) {
      return <Redirect to="/" />;
    }
    return (
      <div >

        <section>
        <div className="ui-container container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">Reset Password</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3 col-md-10 col-md-offset-1">
                {/* <div className="card-header">
                  <h1 className="reset-title">Reset Password</h1>
                </div> */}
                <div className="contribution" style={{ marginBottom: '200px' }}>
                  <form onSubmit={this.formSubmit}>
                  <div className="row form-group">
                    <div className="col-sm-4">
                      <label htmlFor="oldPassword"><span style={{fontWeight: '500'}}>OLD PASSWORD</span></label>
                    </div>
                    <div className="col-sm-8">
                      <input id="oldPassword" type="password" className="form-input form-control" name="oldPassword" placeholder="Enter Old Password" autoComplete="off" required />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-sm-4">
                      <label htmlFor="newPassword"><span style={{fontWeight: '500'}}>NEW PASSWORD</span></label>
                    </div>
                    <div className="col-sm-8">
                      <input id="newPassword" minLength={6} maxLength={256} type="password" className="form-input form-control" name="newPassword" placeholder="Enter New Password" autoComplete="off" required />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-sm-4">
                      <label htmlFor="confPassword"><span style={{fontWeight: '500'}}>CONFIRM PASSWORD</span></label>
                    </div>
                    <div className="col-sm-8">
                      <input id="confPassword" minLength={6} maxLength={256} type="password" className="form-input form-control" name="confPassword" placeholder="Confirm New Password" autoComplete="off" required />
                    </div>
                  </div>
                    <div className="text-center">
                      <button type="submit" className="form-button">Reset Password</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetpassword: makeSelectResetPassword(),
  resetSuccess: makeSelectResetSuccess(),
  resetError: makeSelectResetError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    reset: (data) => dispatch(resetPassword(data)),
    success: (data) => dispatch(resetSuccess(data)),
    error: (data) => dispatch(resetError(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetPassword);
