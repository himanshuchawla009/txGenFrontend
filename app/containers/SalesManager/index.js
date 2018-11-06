import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Modal, Button } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
import { makeSelectKycDone, makeSelectUserInfo, makeSelectEthAddress } from '../DashBoardWelcomePage/selectors';
import KycAlert from 'components/KycAlert/Loadable';
import { metamask } from '../../contracts/tokenContract';

class SalesManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Service Type',
          accessor: 'serviceType', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: 'Tokens Bought',
          accessor: 'tokensBought', // Custom cell components!
          className: 'text-center',
        },
        {
          Header: 'Ethereum Address',
          accessor: 'ethAddress', // Custom cell components!
          className: 'text-center',
        }
      ],
      show: false,
      showBuy: false,
      showSell: false,
      salesShow: false,
      status: '',
      showAlert: true,
      ethAddress: '-'
      // page: 1,
      // disableNext: false,
      // disablePrevious: true,
    };
    this.handleShowTicket = this.handleShowTicket.bind(this);
    this.handleShowBuy = this.handleShowBuy.bind(this);
    this.handleShowSell = this.handleShowSell.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentDidMount() {
    console.log("metamask : ", metamask);
  }

  componentWillReceiveProps(nextProps) {
    console.log("kyc done : ",this.nextProps.kycDone);
    console.log("user info : ",this.nextProps.userInfo);
    if(nextProps.kycDone == false) {
      this.setState({
        showAlert:true,
        ethAddress: nextProps.ethAddress
      })
    }
  }

  handleShowTicket() {
    console.log('handleShowTicket called');
    this.setState({
      show: true,
    });
  }

  handleShowBuy() {
    console.log('handleShowBuy called');
    this.setState({
      showBuy: true,
    });
  }

  handleShowSell() {
    console.log('handleShowSell called');
    this.setState({
      showSell: true,
    });
  }

  closeAlert(){
    console.log('close alert');
    this.setState({
      showAlert : false
    });
  }

  handleCloseTicket = () => {
    console.log('handleCloseTicket called');
    this.setState({
      show: false,
    });
  }

  handleCloseBuy = () => {
    console.log('handleCloseBuy called');
    this.setState({
      showBuy: false,
    });
  }

  handleCloseSell = () => {
    console.log('handleCloseSell called');
    this.setState({
      showSell: false,
    });
  }

  handleSalesShow = () => {
    console.log('handleSalesShow called');
    this.setState({
      salesShow: true,
    });
  }

  handleSalesHide = () => {
    console.log('handleSalesHide');
    this.setState({
      salesShow: false,
    });
  }

  handleBuySubmit = event => {
    event.preventDefault();
    console.log("handleBuySubmit");
    const details = {
      tokensBought: event.target[0].value,
      serviceType: "buy",
      ethAddress: this.state.ethAddress
    };
    this.setState({
      data: this.state.data.push(details)
    });
    console.log("details : ", details);
    console.log("data : ", this.state.data);
    console.log("columns : ", this.state.columns);
    this.handleCloseBuy();
  };

  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay" style={{ marginBottom: '50px' }}>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
            {/*
            <KycAlert
              kycStatus={this.props.kycDone}
              closeAlert={this.closeAlert}
              showAlert={this.state.showAlert}
            />
            */}
            <div className="panel panel-info">
              <div className="panel-heading">Token Sales Manager</div>
              <div className="panel-body" style={{ fontSize: '16px' }}>
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-primary b1"
                      onClick={this.handleShowBuy}
                    >
                      Buy
                    </button>
                    <button
                      className="btn btn-primary b2"
                      style={{ left: '100px', position: 'absolute' }}
                      onClick={this.handleShowSell}
                    >
                      Sell
                    </button>
                  </div>
                </div>
                <div className="row" style={{marginTop: '20px'}}>
                  <div className="col-sm-12">
                    <button className="btn btn-primary b1"> Previous Page </button>
                    <button className="btn btn-primary b2" style={{ right: '16px', position: 'absolute' }} >Next Page </button>
                    <ReactTable
                      className="-striped -highlight"
                      showPaginationBottom={false}
                      style={{ marginTop: '20px', fontSize: '12px', cursor: 'pointer' }}
                      data={this.state.data}
                      columns={this.state.columns}
                      // pageSizeOptions={[5, 10]}
                      noDataText={'NO Tickets Found'}
                      rowsText={'Tickets'}
                      defaultPageSize={10}
                    />
                    <br/>
                    <button className="btn btn-primary b1"> Previous Page </button>
                    <button className="btn btn-primary b2" style={{ right: '16px', position: 'absolute' }}>Next Page </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="static-modal">
            <Modal show={this.state.showBuy} onHide={this.handleCloseBuy} bsSize="large" dialogClassName="createTicketModal">
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-12 text-right" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-close" onClick={this.handleCloseBuy}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3>Buy Tokens</h3><hr />
                  </div>
                </div>
                    {
                      (this.props.userInfo.kycStatus === 'ACCEPTED') &&
                      <h2 style={{ textAlign: 'center', color: 'red' }}>Your Kyc is not verified.</h2>
                    }
                    {
                      (!metamask) &&
                      <h2 style={{ textAlign: 'center', color: 'red' }}>
                        Please install metamask chrome extension.
                      </h2>
                    }

                   {
                     ((this.props.userInfo.kycStatus !== 'ACCEPTED') && metamask) &&
                      <div className="row">
                        <div className="col-sm-12">
                           <form className="form-horizontal createBuy-form" onSubmit={this.handleBuySubmit}>
                             <div className="form-group">
                               <label className="control-label col-sm-4"><h4>Number Of Tokens</h4></label>
                               <div className="col-sm-8">
                                 <input type="number" className="form-input" required />
                               </div>
                             </div>
                             <div className="form-group text-center">
                               <button className="form-button">Buy</button>
                             </div>
                           </form>
                        </div>
                      </div>
                    }
                  </Modal.Body>
                </Modal>
              </div>

              <div className="static-modal">
                <Modal show={this.state.showSell} onHide={this.handleCloseSell} bsSize="large" dialogClassName="createTicketModal">
                  <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12 text-right" style={{ cursor: 'pointer' }}>
                        <i className="fa fa-close" onClick={this.handleCloseSell}></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 text-center">
                        <h3>Sell Token</h3><hr />
                      </div>
                    </div>
                    {
                      (this.props.userInfo.kycStatus !== 'ACCEPTED') &&
                      <h2 style={{ textAlign: 'center', color: 'red' }}>Your Kyc is not verified.</h2>
                    }
                    {
                      (!metamask) &&
                      <h2 style={{ textAlign: 'center', color: 'red' }}>
                        Please install metamask chrome extension.
                      </h2>
                    }
                    {
                      ((this.props.userInfo.kycStatus === 'ACCEPTED') && metamask) &&
                      <div className="row">
                        <div className="col-sm-12">
                           <form className="form-horizontal createBuy-form" onSubmit={console.log("form submit Sell")}>
                             <div className="form-group">
                               <label className="control-label col-sm-4"><h4>Number Of Tokens</h4></label>
                               <div className="col-sm-8">
                                 <input type="number" className="form-input" required />
                               </div>
                             </div>
                             <div className="form-group text-center">
                               <button className="form-button">Sell</button>
                             </div>
                           </form>
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

const mapStateToProps = createStructuredSelector({
  kycDone: makeSelectKycDone(),
  userInfo: makeSelectUserInfo(),
  ethAddress: makeSelectEthAddress()
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect
)(SalesManager);
