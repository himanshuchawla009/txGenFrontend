/**
 *
 * TransferManager
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTransferManager, { makeSelectAllRequests } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Modal, Button } from 'react-bootstrap';
import { createRequest, getRequests } from './actions';
import { toast, ToastContainer } from 'react-toastify';
import { balanceOf, transfer, isCrowdsaleRunning, checkIfAddressLoaded } from '../../contracts/contractService';
import { metamask } from '../../contracts/tokenContract';
import { makeSelectEthAddress,makeSelectKycDone, makeSelectUserInfo } from '../DashBoardWelcomePage/selectors';
import KycAlert from 'components/KycAlert/Loadable';

export class TransferManager extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [
        {
          Header: 'Request Id',
          accessor: 'requestId',
          className: 'text-center',
        },
        {
          Header: 'Your Address',
          accessor: 'senderAddress', // Custom cell components!
          className: 'text-center',
        },
        {
          Header: 'Receiver Address',
          accessor: 'receiverAddress', // Custom cell components!
          className: 'text-center',
        },
        {
          Header: 'Status',
          accessor: 'status', // Custom cell components!
          className: 'text-center',
        },
      ],
      show: false,
      transferShow: false,
      senderAddress: '',
      receiverAddress: '',
      status: '',
      showAlert:true,
    };
    this.handleShowTicket = this.handleShowTicket.bind(this);
  }

  componentDidMount() {
    this.props.getRequests();
    console.log("metamsk",metamask);
    
  }

  componentWillReceiveProps(nextProps) {

    console.log("kyx done",this.props.kycDone);
    console.log("eth address",this.props.ethAddress);
    console.log("user info0", this.props.userInfo);
    if(nextProps.kycDone == false) {
      this.setState({
        showAlert:true
      })
    }
    this.setState({
      data: nextProps.allRequests,
    });

    if (nextProps.transfermanager.successRequest) {
      toast.success('Successfully created transfer request');
    } else if (nextProps.transfermanager.failRequest) {
      toast.error('Failed to create transfer request');
    } else if (nextProps.transfermanager.failGettingRequests) {
      toast.error('Some server side error occured');
    }
  }
  handleShowTicket() {
    this.setState({
      show: true,
    });
  }

  handleCloseTicket = () => {
    this.setState({
      show: false,
    });
  }

  handleTransferShow = () => {
    this.setState({
      transferShow: true,
    });
  }

  handleTransferHide = () => {
    this.setState({
      transferShow: false,
    });
  }

  createRequest =(e) => {
    e.preventDefault();
    console.log('creating');
    const address = e.target[0].value;
    console.log(address);
    const data = {};
    if (address.match(/^0x[a-fA-F0-9]{40}$/)) {
      data.senderAddress = '0x26223710da79470abec3dbc3ac8bc64d38f3cd61';
      data.receiverAddress = address;
      this.props.createRequest(data);
      this.setState({
        show: false,
      });
    } else {
      toast.error('Please enter a valid ethereum address');
    }
  }

  transferAmount = async (e) => {
    e.preventDefault();
    try {
      const amount = e.target[0].value;
      console.log(amount);
      const saleRunning = await isCrowdsaleRunning();

      if (saleRunning) {
        toast.error('You cannot transfer while crowdsale is running');
      } else {
        const balance = await balanceOf(this.state.senderAddress);
        const addressLoaded = await checkIfAddressLoaded(this.state.senderAddress);
        if (!addressLoaded) {
          toast.error('Load your verified address in metamask');
        } else if (balance < amount) {
          toast.error('You don,t have enough balance to send');
        } else {
          await transfer(this.state.senderAddress, this.state.receiverAddress, amount);
          toast.success('Transaction Successfull');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  closeAlert(){
    console.log('SHow alert');
    this.setState({
      showAlert : false
    })
  }

  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay" style={{ marginBottom: '50px' }}>

        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <KycAlert kycStatus={this.props.kycDone} closeAlert={this.closeAlert} showAlert={this.state.showAlert}/>
            <div className="panel panel-info">
              <div className="panel-heading">Token Transfer Manager</div>
              <div className="panel-body" style={{ fontSize: '16px' }}>
                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-primary" onClick={this.handleShowTicket}>Generate Transfer Request</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <ReactTable
                      className="-striped -highlight"
                      showPaginationBottom
                      style={{ marginTop: '20px', fontSize: '12px', cursor: 'pointer' }}
                      data={this.state.data}
                      columns={this.state.columns}
                      pageSizeOptions={[5, 10]}
                      noDataText={'NO Tickets Found'}
                      rowsText={'Tickets'}
                      defaultPageSize={10}
                      getTdProps={(state, rowInfo, column, instance) => ({
                        onClick: (e, handleOriginal) => {
                          this.setState({
                            requestId: rowInfo.original.requestId,
                            senderAddress: rowInfo.original.senderAddress,
                            receiverAddress: rowInfo.original.receiverAddress,
                            status: rowInfo.original.status,
                          });
                          this.handleTransferShow();
                          // IMPORTANT! React-Table uses onClick internally to trigger
                          // events like expanding SubComponents and pivots.
                          // By default a custom 'onClick' handler will override this functionality.
                          // If you want to fire the original onClick handler, call the
                          // 'handleOriginal' function.
                          console.log(rowInfo);
                          if (handleOriginal) {
                            handleOriginal();
                          }
                        },
                      })}

                    />
                  </div>
                </div>
              </div>

            </div>


          </div>
          <div className="static-modal">
            <Modal show={this.state.show} onHide={this.handleCloseTicket} bsSize="large" dialogClassName="createTicketModal">
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-12 text-right" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-close" onClick={this.handleCloseTicket}></i>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3>Create Transction Request</h3><hr />
                  </div>
                </div>
                {(this.props.userInfo.kycStatus !== 'ACCEPTED')&&
                 <h2 style={{ textAlign: 'center', color: 'red' }}>Your Kyc is not verified.</h2>}

  
 {(this.props.userInfo.kycStatus === 'ACCEPTED') &&
                <div className="row">
                  <div className="col-sm-12">
                    <form className="form-horizontal createTicket-form" onSubmit={this.createRequest}>
                      <div className="form-group">
                        <label className="control-label col-sm-2"><h4>Receiver Address: </h4></label>
                        <div className="col-sm-10">
                          <input type="text" className="form-input" required />
                        </div>
                      </div>

                      <div className="form-group text-center">
                        <button className="form-button">Create Request</button>
                      </div>
                    </form>
                  </div>
                </div>
 }

              </Modal.Body>
            </Modal>
          </div>

          <div className="static-modal">
            <Modal show={this.state.transferShow} onHide={this.handleTransferHide} bsSize="large" dialogClassName="createTicketModal">
              <Modal.Body>
                <div className="row">
                   <div className="col-sm-12 text-right" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-close" onClick={this.handleTransferHide}></i>
                  </div>
                 </div>
                <div className="row">
                   <div className="col-sm-12 text-center">
                    <h3>Transfer</h3><hr />
                  </div>
                 </div>

                {(this.state.status === 'APPROVED') ?
                
                  <div className="row">
                    
 {(this.props.userInfo.kycStatus !== 'ACCEPTED') &&  <h2 style={{ textAlign: 'center', color: 'red' }}>Your Kyc is not verified.</h2>}
 {(!metamask) &&  <h2 style={{ textAlign: 'center', color: 'red' }}>Please install metamask chrome extension.</h2>}
 {((this.props.userInfo.kycStatus === 'ACCEPTED') && metamask) && 
                   <div className="col-sm-12">
                      <form className="form-horizontal createTicket-form" onSubmit={this.transferAmount}>
                        <div className="form-group">
                          <label className="control-label col-sm-2"><h4>Amount: </h4></label>
                          <div className="col-sm-10">
                            <input type="number" className="form-input" required />
                          </div>
                        </div>

                        <div className="form-group text-center">
                          <button className="form-button">Transfer</button>
                        </div>
                      </form>
                    </div>

 }

                  </div>
                  :
                  <div className="row">
                    <div className="col-sm-12">
                      {(this.state.status === 'REQUESTED') ?
                        <h2 style={{ textAlign: 'center', color: 'red' }}>Your transfer request approval is pending.</h2>
                        :
                        <h2 style={{ textAlign: 'center', color: 'red' }}>Your transfer request is rejected.</h2>
                      }

                    </div>
                  </div>

                }
              </Modal.Body>
            </Modal>
          </div>
        </div>

      </div>
    );
  }
}

TransferManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transfermanager: makeSelectTransferManager(),
  allRequests: makeSelectAllRequests(),
  kycDone: makeSelectKycDone(),
  ethAddress: makeSelectEthAddress(),
  userInfo: makeSelectUserInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createRequest: (data) => dispatch(createRequest(data)),
    getRequests: () => dispatch(getRequests()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'transferManager', reducer });
const withSaga = injectSaga({ key: 'transferManager', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransferManager);
