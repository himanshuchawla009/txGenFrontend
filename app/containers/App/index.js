/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MainPage from 'containers/MainPage/Loadable';

const AppWrapper = styled.div`
  margin: 20 auto;
  display: flex;
  min-height: 100%;
  padding: 20px 16px;
  flex-direction: column;

`;


export default function App() {
  return (
    <div style={{margin:'20 auto',display:'flex',minHeight:'100%',padding:'20px 16px',flexDirection:'column'}}>

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
