import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPage state domain
 */
const selectTicketPageDomain = (state) => state.get('ticketPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TicketPage
 */

const makeSelectTicketPage = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.toJS()
);

const makeSelectCreateTicket = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('newTicket')
);

const makeSelectUpdateTicket = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('updateTicket')
);

const makeSelectCreateSuccess = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('createTicketSuccess')
);

const makeSelectUpdateSuccess = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('updateTicketSuccess')
)

const makeSelectTickets = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('tickets')
)

const makeSelectMessage = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('message')
)

const makeSelectMessageSuccess = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('messageSuccess')
)

const makeSelectTicketId = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('ticketId')
)

const makeSelectGetMessagesSuccess = () => createSelector(
  selectTicketPageDomain,
  (substate) => substate.get('messagesSuccess')
)
export default makeSelectTicketPage;
export {
  selectTicketPageDomain,
  makeSelectCreateTicket,
  makeSelectUpdateTicket,
  makeSelectCreateSuccess,
  makeSelectUpdateSuccess,
  makeSelectTickets,
  makeSelectMessage,
  makeSelectMessageSuccess,
  makeSelectTicketId,
  makeSelectGetMessagesSuccess
};
