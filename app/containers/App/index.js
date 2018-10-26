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

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import DashBoardWelcomePage from 'containers/DashBoardWelcomePage/Loadable';
import RedirectPage from 'containers/RedirectPage';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPasswordOuter/Loadable';
import Loading from 'containers/Loading/Loadable';
import TransactionHistory from 'containers/TransactionHistory/Loadable';
import ResendConfirmationPage from 'containers/ResendConfirmationPage/Loadable';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={RedirectPage} />
        <Route exact path="/signin" component={LoginPage} />
        <Route exact path="/signup" component={RegisterPage} />
        <Route path="/dashboard" component={DashBoardWelcomePage} />
        <Route path="/resetPassword/forgot/:token" component={ResetPassword} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resendConfirmation" component={ResendConfirmationPage} />
        <Route path="/transactionHistory" component={TransactionHistory} />
        <Route path="/signin/verify/:token" component={Loading} />
        <Route path="/signup/refer/:token" component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
