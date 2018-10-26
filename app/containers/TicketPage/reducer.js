/*
 *
 * TicketPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CREATE_TICKET,
  UPDATE_TICKET,
  CREATE_TICKET_SUCCESS,
  UPDATE_TICKET_SUCCESS,
  RESET_SUCCESS,
  GET_TICKETS,
  TICKETS_SUCCESS,
  SEND_MESSAGE,
  MESSAGE_SUCCESS,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS
} from './constants';

const initialState = fromJS({
  newTicket: '',
  updateTicket: '',
  createTicketSuccess: '',
  updateTicketSuccess: '',
  tickets: [],
  message: '',
  messageSuccess: '',
  ticketId: '',
  messages: '',
  messagesSuccess: ''
});

function ticketPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CREATE_TICKET:
      return state
        .set('newTicket', action.data)
    case UPDATE_TICKET:
      return state
        .set('updateTicket', action.data)
    case CREATE_TICKET_SUCCESS:
      return state
        .set('createTicketSuccess', action.data)
    case UPDATE_TICKET_SUCCESS:
      return state
        .set('updateTicketSuccess', action.data)
    case RESET_SUCCESS:
      return state
        .set('createTicketSuccess', false)
        .set('updateTicketSuccess', false)
        .set('messageSuccess', false)
        .set(('messagesSuccess', false))
    case TICKETS_SUCCESS:
      return state
        .set('tickets', action.data)
    case GET_TICKETS:
      return state
    case SEND_MESSAGE:
      return state
        .set('message', action.data.message)
        .set('ticketId', action.data.ticketId)
    case MESSAGE_SUCCESS:
      return state
        .set('messageSuccess', action.data)
    case GET_MESSAGES:
      return state
        .set('ticketId', action.data)
    case GET_MESSAGES_SUCCESS:
      return state
        .set('messagesSuccess', action.data)
      default:
      return state;
  }
}

export default ticketPageReducer;
