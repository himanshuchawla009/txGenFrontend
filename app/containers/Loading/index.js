/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoading, { makeSelectVerified, makeSelectExpired } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { verifyToken } from './actions';
import CustomLoading from 'components/CustomLoading/Loadable';
export class Loading extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // console.log(this.props.match.params.token) 
    this.props.verify(this.props.match.params.token);
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CustomLoading />
      </div>
    );
  }
}

Loading.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  verified: makeSelectVerified(),
  expired: makeSelectExpired(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    verify: (token) => dispatch(verifyToken(token)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loading', reducer });
const withSaga = injectSaga({ key: 'loading', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Loading);
