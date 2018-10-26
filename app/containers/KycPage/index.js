/**
 *
 * KycPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { parseNumber, formatNumber, isValidNumber } from 'libphonenumber-js'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectKycPage, { makeSelectSubmitKycSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectDashBoardWelcomePage from '../DashBoardWelcomePage/selectors';
import { submitKyc, submitKycDoc, resetSuccess } from './actions';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Link } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { kycDone, loadProfileAction } from '../DashBoardWelcomePage/actions';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


export class KycPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)

    this.state = {
      frontImg : '',
      frontImgUrl : '/assets/img/id_front.png',
      backImg : '',
      backImgUrl : '/assets/img/id_back.png',
      fullName : this.props.userInfo.userInfo.fullName,
      email : this.props.userInfo.userInfo.email,
      dob: '',
      gender: '',
      phone : '',
      ethAddress : '',
      citizenship : '',
      country : '',
      state : '',
      city: '',
      address: '',
      address2: '',
      doc_type: '',
      doc_number: '',
      redirect : false,
      allUploaded : false,
      otherDoc : 'other',
      showOtherDoc : 'hidden',
      kycStatus : '',
      valid : true
    }

    this.handleFrontImg = this.handleFrontImg.bind(this);
    this.handleBackImg = this.handleBackImg.bind(this);
    this.submitKycDetails = this.submitKycDetails.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.selectCitizenship = this.selectCitizenship.bind(this);
    this.handleshowOtherDoc = this.handleshowOtherDoc.bind(this);
    this.handleOtherDoc = this.handleOtherDoc.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  // ethValidator(e) {
  //   e.preventDefault();

  //   if(this.state.ethAddress.match(/^0x[a-fA-F0-9]{40}$/)){
  //     this.setState({
  //       validAddr: true
  //     })
  //   }else{
  //     this.setState({
  //       validAddr: false
  //     })
  //   }
  // }

  handleOtherDoc(e) {
    e.preventDefault();

    this.setState({
      doc_type : e.target.value
    })
  }

  handleshowOtherDoc(e) {
    e.preventDefault();
    if(e.target.value == 'other'){
      this.setState({
        showOtherDoc : 'text'
      })
    }else{
      this.setState({
        showOtherDoc : 'hidden'
      })
    }
  }

  handleFrontImg(e) {
      e.preventDefault();
      var reader = new FileReader();
      var file = e.target.files[0];
      if(file.size > 2*1024*1024){
        toast.error('File size should be less than 2MB');
      }else{
        reader.onloadend = () => {
          this.setState({
            frontImgUrl : '/assets/img/uploading.svg',
            frontImg : file
          })
        }
        reader.readAsDataURL(file);
        this.props.submitKycDoc({ image : file, field : 'imageFront' })
      }
    }

  handleBackImg(e) {
    e.preventDefault();
    var reader = new FileReader();
    var file = e.target.files[0];
    if(file.size > 2*1024*1024){
      toast.error('File size should be less than 2MB');
    }else{
      reader.onloadend = () => {
        this.setState({
          backImgUrl : '/assets/img/uploading.svg',
          backImg : file
        })
      }
      reader.readAsDataURL(file);
      this.props.submitKycDoc({ image : file, field : 'imageBack' })
    }
  }

  handleInput(e){
    this.setState({
      [e.target.name] : e.target.value
    })

    if(e.target.name === 'ethAddress'){
      if(e.target.value.match(/^0x[a-fA-F0-9]{40}$/) || e.target.value == ''){
        this.setState({
          valid: true
        })
      }else{
        this.setState({
          valid: false
        })
      }
    }
  }

  submitKycDetails(e) {
    e.preventDefault();
    if(!this.state.valid){
      toast.error('Please enter valid ETH Wallet Address');
    }else if(!this.state.allUploaded){
      toast.error('Please fill all the details to submit.')
    }
    else if(!isValidNumber(this.state.phone)){
      toast.error('Phone number is invalid');
    }else{
      const { fullName, email, dob, gender, phone, ethAddress, citizenship, country, state, city, address, address2, doc_type, doc_number } = this.state;
      const kycDetails = {fullName, email, dob, gender, ethAddress, phone, citizenship, country, state, city, address, address2, doc_type, doc_number}
  
      this.props.submitKyc(kycDetails);
    }
  }

  notifyKyc(){
    toast.success(`Your KYC request is submitted.Please wait until request is approved.`)
  }

  notifyAccepted(){
    toast.success(`Your KYC is done.`)
  }

  selectCitizenship (val) {
    this.setState({ citizenship: val });
  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ state: val });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.kycpage.kycDocSuccess){
      if(nextProps.kycpage.kycDocSuccess.image == 'imageFront'){
        this.setState({
          frontImgUrl : nextProps.kycpage.kycDocSuccess.imageUrl,
          allUploaded : nextProps.kycpage.kycDocSuccess.allUploaded
        })
      }
      if(nextProps.kycpage.kycDocSuccess.image == 'imageBack'){
        this.setState({
          backImgUrl : nextProps.kycpage.kycDocSuccess.imageUrl,
          allUploaded : nextProps.kycpage.kycDocSuccess.allUploaded
        })
      }
    }

    if(nextProps.kycpage.submitKycSuccess){
      if(nextProps.kycpage.submitKycSuccess.success){
        this.setState({ kycStatus : 'SUBMITTED' });
        console.log(nextProps.kycpage.submitKycSuccess.message);
        toast.success(nextProps.kycpage.submitKycSuccess.message)
        this.props.loadProfileAction();
      }
      else{
        toast.error(nextProps.kycpage.submitKycSuccess.message);
        this.props.resetSuccess();
      }
    }
  }

  render() {
    // if(this.state.redirect){
    //   this.props.kycDone();
    //   return (
    //     <Redirect to={"/dashboard"} />
    //   )
    // }
    if(this.props.userInfo.userInfo.kycStatus == 'SUBMITTED' || this.state.kycStatus == 'SUBMITTED'){
      this.props.kycActive();
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">
        <div className="ui-content-body">
        <div className="ui-container container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="alert alert-success text-center">
                <h4>Your KYC details are submitted.<br/>Our team will soon verify your details.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
    }
    if(!this.props.userInfo.userInfo.kycStatus == 'ACCEPTED'){
      this.props.kycActive();
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">
        <div className="ui-content-body">
        <div className="ui-container container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="alert alert-success text-center">
                <h5>Your KYC is done.</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
    }
    const { fullName, email, dob, gender, phone, ethAddress, citizenship, country, state, city, address, address2, doc_type, doc_number } = this.state;
    this.props.kycActive()
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">

        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
        <div className="panel-heading">KYC Verification</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-12">
                <div className="row"><div className="col-sm-6"><h3>PERSONAL DETAILS</h3></div>
                <div className="col-sm-6"><h5 style={{color:'#f00'}} className="text-right">(*) denotes required field.</h5></div><hr/></div>
                <form onSubmit={this.submitKycDetails}>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label htmlFor="fullName"><h5>FULL NAME<sup>*</sup></h5></label>
                      <input className="form-control" type="text" name="fullName" id="fullName" value={fullName} onChange={this.handleInput} required/>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label htmlFor="email"><h5>EMAIL<sup>*</sup></h5></label>
                      <input className="form-control" type="email" name="email" id="email" value={email} onChange={this.handleInput} disabled required/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label htmlFor="dob"><h5>DATE OF BIRTH<sup>*</sup></h5></label>
                      <input className="form-control" placeholder="dd/mm/yyyy" type="date" name="dob" id="dob" value={dob} onChange={this.handleInput} required/>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label htmlFor="gender"><h5>GENDER<sup>*</sup></h5></label>
                      <select id="gender" name="gender" className="form-control" onChange={this.handleInput} required>
                        <option value="" hidden>Choose One</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="DECLINE TO STATE">DECLINE TO STATE</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label htmlFor="phone"><h5>PHONE NUMBER<sup>*</sup></h5></label>
                      <PhoneInput id="phone"
                        placeholder="Enter phone number"
                        name="phone"
                        value={ phone }
                        onChange={ phone => this.setState({ phone }) }
                        error={ phone ? (isValidNumber(phone) ? undefined : 'Invalid phone number') : '' }/>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label htmlFor="ethAddress"><h5>ETH WALLET ADDRESS</h5></label>
                      <input className="form-control" type="text" name="ethAddress" id="ethAddress" placeholder="Enter ETH wallet address" title="Please enter valid eth address" value={ethAddress} onChange={this.handleInput}/>
                      { !this.state.valid ? <p style={{color: '#f00'}}>Please enter Valid ETH address.</p> : '' }
                    </div>
                  </div>
                  <div className="row"><div className="col-sm-12"><h3>ADDRESS</h3><hr/></div></div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label htmlFor="citizenship"><h5>CITIZENSHIP<sup>*</sup></h5></label>
                      <CountryDropdown
                          classes="form-control"
                          value={citizenship}
                          onChange={this.selectCitizenship} />
                    </div>
                    <div className="col-sm-6 form-group">
                      <label htmlFor="country"><h5>COUNTRY<sup>*</sup></h5></label>
                        {/* <select id="country" name="country" className="form-control" required>
                          <option value="" hidden>Choose One</option>
                          <option value="indian">INDIAN</option>
                          <option value="us">US</option>
                        </select> */}
                        <CountryDropdown
                          classes="form-control"
                          value={country}
                          onChange={this.selectCountry} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label htmlFor="state"><h5>STATE<sup>*</sup></h5></label>
                      {/* <input className="form-control" type="text" name="state" id="state" placeholder="Enter state" required/> */}
                      <RegionDropdown
                        classes="form-control"
                        country={country}
                        value={state}
                        onChange={this.selectRegion} />
                    </div>
                    <div className="col-sm-6 form-group">
                      <label htmlFor="city"><h5>CITY<sup>*</sup></h5></label>
                      <input className="form-control" type="text" name="city" id="city" value={city} onChange={this.handleInput} placeholder="Enter city" required/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label htmlFor="address"><h5>ADDRESS<sup>*</sup></h5></label>
                      <input className="form-control" type="text" name="address" id="address" value={address} onChange={this.handleInput} placeholder="Enter address" required/>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label htmlFor="address2"><h5>ADDRESS 2</h5></label>
                      <input className="form-control" type="text" name="address2" id="address2" value={address2} onChange={this.handleInput} placeholder="Enter address 2"/>
                    </div>
                  </div>
                  <div className="row"><div className="col-sm-12"><h3>DOCUMENT</h3><hr/></div></div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                      <label htmlFor="doc_type"><h5>TYPE<sup>*</sup></h5></label>
                        <select id="doc_type" name="doc_type" className="form-control" onChange={this.handleInput} onClick={this.handleshowOtherDoc} required>
                          <option value="" hidden>Select Any Document</option>
                          <option value="PASSPORT">PASSPORT</option>
                          <option value={this.state.otherDoc}>ANY NATIONAL ID</option>
                        </select>
                        <input type={this.state.showOtherDoc} id="doc_type" name="doc_type" onChange={this.handleInput} placeholder="Enter National ID" className="form-control" style={{marginTop:"20px"}} required/>
                      </div>
                      <div className="form-group">
                      </div>
                    </div>
                      <div className="col-sm-6 form-group">
                      <label htmlFor="number"><h5>NUMBER<sup>*</sup></h5></label>
                      <input className="form-control" type="text" id="number" placeholder="ID number" name="doc_number" onChange={this.handleInput} required/>
                      
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label htmlFor="front_id"><h5>UPLOAD FRONT ID<sup>*</sup></h5></label>
                      <img className="img-responsive" style={{width:'400px',height:'250px'}} src={this.state.frontImgUrl} alt="front id" id="front_img_src"/>
                      <input type="file" accept="image/png, image/jpeg" name="front_id" style={{margin:'10px 0px 0px 30px'}} onChange={this.handleFrontImg} required/>
                    </div>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="back_id"><h5>UPLOAD BACK ID<sup>*</sup></h5></label>
                        <img className="img-responsive" style={{width:'400px',height:'250px'}} src={this.state.backImgUrl} alt="back id" id="back_img_src"/>
                        <input type="file" accept="image/png, image/jpeg" name="back_id" style={{margin:'10px 0px 0px 30px'}} onChange={this.handleBackImg} required/>
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 text-center">
                      <h5>Maximum Upload file size is <span style={{color: '#f00'}}>2MB</span></h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 text-center">
                    <button className="btn btn-primary" style={{borderRadius: '25px', padding: '10px 80px'}} disabled={!this.state.allUploaded} type="submit">SUBMIT</button>
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

KycPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  kycpage: makeSelectKycPage(),
  userInfo: makeSelectDashBoardWelcomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProfileAction: () => dispatch(loadProfileAction()),
    submitKyc : (data) => dispatch(submitKyc(data)),
    kycDone: () => dispatch(kycDone()),
    submitKycDoc : (data) => dispatch(submitKycDoc(data)),
    resetSuccess : () => dispatch(resetSuccess())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'kycPage', reducer });
const withSaga = injectSaga({ key: 'kycPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(KycPage);
