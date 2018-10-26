/**
 *
 * Support
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
import makeSelectSupport, { makeSelectSupportSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { submitSupport, submitSupportSuccess } from './actions';
import { ToastContainer, toast } from 'react-toastify';


export class Support extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);

    this.state = {
      submitSuccess : false
    }
    this.submitSupport = this.submitSupport.bind(this);    
  }

  submitSupport(e){
    e.preventDefault();

    const data = {
      topic : e.target[0].value,
      message : e.target[1].value
    }
    if(data.topic === 'select'){
      toast.error('Please select an issue');
    } else if(!data.message){
      toast.error("Message can't be blank");
    } else{
      this.props.support(data);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.supportSuccess){
      if(nextProps.supportSuccess.success){
        this.setState({
          submitSuccess : true
        })
      }else if(nextProps.supportSuccess.success == false){
        toast.error(nextProps.supportSuccess.message);
        this.props.submitSuccess(false);
      }
    }
  }
  
  render() {
    const {submitSuccess} = this.state;
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
            <div className="" style={{ marginBottom: '500px' }}>
            <div className="panel panel-default">
              <div className="panel-heading">Email Support</div>
                <div className="panel-body" style={{fontSize:'16px'}}>
              {
                this.state.submitSuccess ? <div className="alert alert-success text-center"><h4>Your request is submitted,<br />Our team will respond to you soon.<br/>Thank You</h4></div> :
              <div className="contribution">
              <div className="row">
                <div className="text-center col-sm-10 col-sm-offset-1">
                  <h3 style={{color:'#337ab7'}}>Email Support</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10 col-sm-offset-1">
                  <form onSubmit={this.submitSupport}>
                    <div className="form-group">
                      <select className="form-control" defaultValue='select'>
                        <option value='select' hidden>Select a topic</option>
                        <option value='TOKEN NOT RECEIVED'>ZIN token not received</option>
                        <option value='OTHER ISSUES'>Other issues</option>
                        <option  value='FEEDBACK'>Feedback</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea placeholder="message" className="form-control" rows="10"></textarea>
                    </div>
                    <div className="form-group text-right">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

Support.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  support: makeSelectSupport(),
  supportSuccess: makeSelectSupportSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    support : (data) => dispatch(submitSupport(data)),
    submitSuccess : (data) => dispatch(submitSupportSuccess(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'support', reducer });
const withSaga = injectSaga({ key: 'support', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Support);
