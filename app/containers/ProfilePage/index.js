/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProfilePage, { makeSelectDetails, makeSelectUpdateSuccess } from './selectors';
import makeSelectDashBoardWelcomePage from 'containers/DashBoardWelcomePage/selectors';
import reducer from './reducer';
import saga from './saga';
import { updateDetails, resetSuccess } from './actions';
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { parseNumber, formatNumber, isValidNumber } from 'libphonenumber-js'
export class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
        email : '',
        fullName : '',
        dob : '',
        gender : '',
        phone : '',
        loginAlert : ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
  };

  handleInput(e){
    if(e.target.name == 'loginAlert'){
      this.setState({
        [e.target.name] : e.target.checked
      })
    }else{
      this.setState({
        [e.target.name] : e.target.value
      })
    }
  }

  componentWillMount(){
    const { email, fullName, dob, gender, phone, loginAlert } = this.props.userInfo.userInfo;
    this.state = {
      email,
      fullName,
      dob,
      gender,
      phone,
      loginAlert
    }
  }

  updateDetails(e){
    e.preventDefault()
    if(!isValidNumber(this.state.phone)){
      toast.error('Phone number is invalid');
    }else {
      const { fullName, dob, gender, phone, loginAlert } = this.state;
      this.props.updateDetail({fullName, dob, gender, phone, loginAlert });
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.updateSuccess){
      if(nextProps.updateSuccess.success){
        console.log('toast block')
        toast.success(nextProps.updateSuccess.message);
        nextProps.resetSuccess();
      }
    }
  }
  
  render() {
    const { phone } = this.state;
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <div className="ui-content-body">
        <div className="ui-container container-fluid">
        <div className="panel panel-default">
              <div className="panel-heading">Update Profile</div>
                <div className="panel-body" style={{fontSize:'16px'}}>
          <div className=" contribution row">
            <div className="col-sm-12">
              <div className="row text-center">
                {/* <h2>UPDATE PROFILE</h2> */}
                <h5 style={{color:'#888'}}>Please fill the details down below.<hr/></h5>
              </div>
              <form onSubmit={this.updateDetails}>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label htmlFor="email"><span style={{fontWeight:'500'}}>Email</span></label>
                  </div>
                  <div className="col-sm-9">
                    <input className="form-control" value={this.state.email} type="text" name="email" id="email" disabled/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label htmlFor="fullName"><span style={{fontWeight:'500'}}>Full Name</span></label>
                  </div>
                  <div className="col-sm-9">
                    <input className="form-control" type="text" name="fullName" id="fullName"  value={this.state.fullName} onChange={this.handleInput}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label htmlFor="dob"><span style={{fontWeight:'500'}}>Date Of Birth</span></label>
                  </div>
                  <div className="col-sm-9">
                    <input className="form-control" type="date" name="dob" id="dob" onChange={this.handleInput} value={this.state.dob} onFocus={() => {this.type='date'}}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                      <label htmlFor="gender"><span style={{fontWeight:'500'}}>GENDER</span></label>
                  </div>
                  <div className="col-sm-9">
                      <select id="gender" name="gender" className="form-control" onChange={this.handleInput} value={this.state.gender}>
                        <option value="" hidden>Choose One</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="DECLINE TO STATE">DECLINE TO STATE</option>
                      </select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label htmlFor="phone"><span style={{fontWeight:'500'}}>Phone Number </span></label>
                  </div>
                  <div className="col-sm-9">
                    {/* <input className="form-control" type="text" name="phone" id="phone" onChange={this.handleInput} value={this.state.phone}/> */}
                    <PhoneInput id="phone"
                        placeholder="Enter phone number"
                        name="phone"
                        value={ phone }
                        onChange={ phone => this.setState({ phone }) }
                        error={ phone ? (isValidNumber(phone) ? undefined : 'Invalid phone number') : '' }/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center checkbox">
                    <label>
                      <input type="checkbox" name="loginAlert" id="loginAlert" onChange={this.handleInput} checked={this.state.loginAlert}/>I would like to receive email after every login.
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <button type="submit" className="form-button">Update Profile</button>
                  </div>
                </div>
              </form>
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

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilepage: makeSelectProfilePage(),
  userInfo: makeSelectDashBoardWelcomePage(),
  updateSuccess: makeSelectUpdateSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateDetail : (data) => dispatch(updateDetails(data)),
    resetSuccess : (data) => dispatch(resetSuccess(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
