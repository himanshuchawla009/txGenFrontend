/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import { Link } from 'react-router-dom';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', width: '100%', height: '100%', background: '#fff', zIndex: '99999', overflow: 'hidden' }}>
        <div className="img-box-mix text-center mx-auto">
          <img src="./assets/img/loader.svg" alt="" className="img-fluid image-animation" />
          <h2>Page Not found</h2>
          <Link style={{ color: '#9D1EFF' }} to="/">← Take Me back!</Link>
        </div>
      </div>
    );
  }
}
