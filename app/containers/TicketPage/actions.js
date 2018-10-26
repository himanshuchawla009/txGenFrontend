/*
 *
 * TicketPage actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createTicket(data) {
  return {
    type: CREATE_TICKET,
    data
  }
}

export function updateTicket(data) {
  return {
    type: UPDATE_TICKET,
    data
  }
}

export function createTicketSuccess(data) {
  return {
    type: CREATE_TICKET_SUCCESS,
    data
  }
}

export function updateTicketSuccess(data) {
  return {
    type: UPDATE_TICKET_SUCCESS,
    data
  }
}

export function resetTicketSuccess() {
  return {
    type: RESET_SUCCESS
  }
}

export function showTickets() {
  return {
    type: GET_TICKETS
  }
}

export function ticketSuccess(data) {
  return {
    type: TICKETS_SUCCESS,
    data
  }
}

export function sendMessage(data) {
  return {
    type: SEND_MESSAGE,
    data
  }
}

export function messageSuccess(data) {
  return {
    type: MESSAGE_SUCCESS,
    data
  }
}

export function getMessages(data) {
  return {
    type: GET_MESSAGES,
    data
  }
}

export function getMessagesSuccess(data) {
  return {
    type: GET_MESSAGES_SUCCESS,
    data
  }
}