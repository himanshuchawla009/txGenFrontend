/**
 *
 * RedirectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRedirectPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { userLoggedIn } from '../App/actions';

export class RedirectPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/dashboard" />;
    }
    return (<Redirect to="/signin" />);
  }
}

RedirectPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  redirectpage: makeSelectRedirectPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: (user) => dispatch(userLoggedIn(user)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'redirectPage', reducer });
const withSaga = injectSaga({ key: 'redirectPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RedirectPage);
