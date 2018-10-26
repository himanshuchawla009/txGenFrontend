/**
*
* KycAlert
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';

class KycAlert extends React.PureComponent {

  render() {
    if(this.props.showAlert){
        if(this.props.kycStatus === 'PENDING'){
            return(
                <div className="alert alert-danger">
                    <span>Please <Link to="/dashboard/kyc">complete</Link> your KYC.</span>
                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }else if(this.props.kycStatus === 'SUBMITTED'){
            return(
                <div className="alert alert-success">
                    <span>Your KYC details are submitted.Our team will soon verify your details.</span>
                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }else if(this.props.kycStatus === 'REPORTED'){
            return(
                <div className="alert alert-danger">
                    <span>Your KYC details have some issues.Please check mail regarding issues and <Link to="/dashboard/kyc">submit</Link> the details again.</span>
                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }else if(this.props.kycStatus === 'REJECTED'){
            return(
                <div className="alert alert-danger">
                    <span>Your KYC request is Rejected. Please check your mail regarding issues and <Link to="/dashboard/kyc">submit</Link> the details again.</span>
                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }
        else{
            return(<div></div>);
        }
    }else{
        return <div></div>
    }
  }
}

KycAlert.propTypes = {

};

export default KycAlert;
