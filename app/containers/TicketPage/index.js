/**
 *
 * TicketPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import ReactTable from 'react-table';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import 'react-table/react-table.css';
import { Modal, Button } from 'react-bootstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTicketPage, { makeSelectCreateSuccess, makeSelectTickets, makeSelectMessageSuccess, makeSelectGetMessagesSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createTicket, resetTicketSuccess, showTickets, sendMessage, getMessages } from './actions';
import { ToastContainer, toast } from 'react-toastify';
import UserMessage from 'components/UserMessage';


export class TicketPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);

    this.state = {
      data: [],
      columns: [
        {
          Header: 'Ticket Date',
          accessor: 'createdAt',
          className: 'text-center'
        },
        {
          Header: 'Subject',
          accessor: 'subject', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: 'Status',
          accessor: 'status', // Custom cell components!
          className: 'text-center'
        }
      ],
      currentTicketDetails: {
        messages: [],
        subject: '',
        status: '',
        createdAt: '',
        ticketId: ''
      },
      currentTicketMessages: [],
      show: false,
      showTicket: false
    }

    this.closeCreateTicket = this.closeCreateTicket.bind(this);
    this.showCreateTicket = this.showCreateTicket.bind(this);
    this.createTicket = this.createTicket.bind(this);
    this.handleShowTicket = this.handleShowTicket.bind(this);
    this.handleCloseTicket = this.handleCloseTicket.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleShowTicket() {
    this.setState({
      showTicket: true
    })
  }

  handleCloseTicket() {
    this.setState({
      showTicket: false
    })
  }

  componentDidMount() {
    this.props.getTickets();
    this.setState({
      data: this.props.tickets.tickets
    })
  }

  createTicket(e) {
    e.preventDefault();
    const ticket = {
      subject : e.target[0].value,
      message: e.target[1].value
    }

    this.props.createTicket(ticket);
    this.props.getTickets();
    this.setState({
      show: false
    })
  }

  sendMessage(e) {
    e.preventDefault();

    const message = {
      message: e.target[0].value,
      ticketId: this.state.currentTicketDetails.ticketId
    };
    e.target[0].value = '';
    this.props.sendMessage(message);
    this.props.getTickets();
    this.setState({
      data: this.props.tickets.tickets,
    })
  }

  closeCreateTicket() {
    this.setState({
      show : false
    })
  }

  showCreateTicket() {
    this.setState({
      show: true
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data : nextProps.tickets.tickets,
      currentTicketMessages: nextProps.messages.messages
    })
    if(!!nextProps.createSuccess){
       nextProps.getTickets();
      if(!!nextProps.createSuccess.success){
        toast.success(nextProps.createSuccess.message)
        this.setState({
          data: nextProps.tickets.tickets
        })
        nextProps.resetTicketSuccess();
      }
    }

    if(!!nextProps.messageSuccess){
      nextProps.getTickets();
      nextProps.getMessages(this.state.currentTicketDetails.ticketId);
      this.setState({
        data: nextProps.tickets.tickets,
        currentTicketMessages: nextProps.messages.messages
      })
      if(!!nextProps.messageSuccess.success){
        this.setState({
          data: nextProps.tickets.tickets,
          currentTicketMessages: nextProps.messages.messages
        })
        nextProps.resetTicketSuccess();
      }
    }
  }
  
  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay" style={{marginBottom : '50px'}}>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
              <div className="row">
                <div className="col-sm-12">
                    {/* <h2>TICKETS</h2> */}
                </div>
              </div>
              <div className="panel panel-info">
        <div className="panel-heading">TICKETS</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
              <div className="row">
                <div className="col-sm-12">
                  <button className="btn btn-primary" onClick={this.showCreateTicket}>New Ticket</button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <ReactTable
                            className="-striped -highlight"
                            showPaginationBottom={true}
                            style={{ marginTop: '20px', fontSize: '12px', cursor: 'pointer' }}
                            data={this.state.data}
                            columns={this.state.columns}
                            onPageChange={this.pageChange}
                            pageSizeOptions={[5, 10]}
                            noDataText={'NO Tickets Found'}
                            rowsText={'Tickets'}
                            defaultPageSize={10}

                            getTdProps={(state, rowInfo, column, instance) => ({
                              onClick: (e, handleOriginal) => {
                                console.log(rowInfo)
                                // console.log("It was in this row:", rowInfo);
                                this.props.getMessages(rowInfo.original.ticketId);
                                this.setState({
                                  
                                  currentTicketDetails : {
                                    subject: rowInfo.original.subject,
                                    messages: rowInfo.original.messages,
                                    createdAt: rowInfo.original.createdAt,
                                    status: rowInfo.original.status,
                                    ticketId: rowInfo.original.ticketId
                                  },
                                  currentTicketMessages: rowInfo.original.messages
                                })
                                this.handleShowTicket();
                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler will override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                if (handleOriginal) {
                                  handleOriginal();
                                }
                              }
                            })}
                          />
                </div>
              </div>
              </div>
              </div>
            </div>
          </div>
          <div className="static-modal">
            <Modal show={this.state.show} onHide={this.closeCreateTicket} bsSize="large" dialogClassName="createTicketModal">
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-12 text-right" style={{'cursor': 'pointer'}}>
                      <i className="fa fa-close" onClick={this.closeCreateTicket}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3>Create Ticket</h3><hr/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <form className="form-horizontal createTicket-form" onSubmit={this.createTicket}>
                      <div className="form-group">
                        <label className="control-label col-sm-2"><h4>Subject: </h4></label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" required/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-2"><h4>Message: </h4></label>
                        <div className="col-sm-10">
                          <textarea type="text" className="form-control" required/>
                        </div>
                      </div>
                      {/* <div className="form-group text-center">
                          <h4><i className="fa fa-plus-circle" style={{color:'#ffd83c'}}></i> Select a file</h4>
                      </div> */}
                      <div className="form-group text-center">
                        <button className="form-button">Create Ticket</button>
                      </div>
                    </form>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
 {/* TicketDetailsModal */}
          <div className="static-modal">
            <Modal show={this.state.showTicket} onHide={this.handleCloseTicket} bsSize="large" dialogClassName="createTicketModal">
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-12 text-right" style={{'cursor': 'pointer'}}>
                      <i className="fa fa-close" onClick={this.handleCloseTicket}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-7">
                    <h4>Ticket Date: {this.state.currentTicketDetails.createdAt}</h4>
                  </div>
                  <div className="col-sm-4 text-right">
                    <h4>Ticket Status : {this.state.currentTicketDetails.status}</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <h4>Subject: {this.state.currentTicketDetails.subject}<hr/></h4>
                  </div>
                  <div className="col-sm-12">
                  {
                    !!this.state.currentTicketMessages ? 
                    <UserMessage messages={this.state.currentTicketMessages}/> : ''
                  }
                  </div>
                </div>
                {
                  this.state.currentTicketDetails.status == 'CLOSED' ? 
                  <div className="row">
                  <div className="col-sm-12 text-center"><hr />
                    <span className="alert alert-danger" style={{margin: '20px'}}>This ticket is closed.</span>
                    <p></p>
                  </div>
                </div> :
                    <div className="row">
                    <div className="col-sm-12"><hr/>
                      <form className="form-horizontal createTicket-form" onSubmit={this.sendMessage}>
                        <div className="form-group">
                          <label className="control-label col-sm-2"><h4>Message: </h4></label>
                          <div className="col-sm-10">
                            <textarea type="text" className="form-control"/>
                          </div>
                        </div>
                        <div className="form-group text-center">
                          <button type="submit" className="form-button">Send Message</button>
  
                        </div>
                      </form>
                    </div>
                  </div>
                }
              </Modal.Body>
            </Modal>
          </div>
      </div>
    );
  }
}

TicketPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ticketpage: makeSelectTicketPage(),
  createSuccess: makeSelectCreateSuccess(),
  messageSuccess: makeSelectMessageSuccess(),
  tickets: makeSelectTickets(),
  messages: makeSelectGetMessagesSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createTicket: (data) => dispatch(createTicket(data)),
    resetTicketSuccess: () => dispatch(resetTicketSuccess()),
    getTickets: () => dispatch(showTickets()),
    sendMessage: (data) => dispatch(sendMessage(data)),
    getMessages: (data) => dispatch(getMessages(data))
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'ticketPage', reducer });
const withSaga = injectSaga({ key: 'ticketPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TicketPage);
