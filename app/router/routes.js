import LoginPage from '../containers/LoginPage'
import RegisterPage from '../containers/RegisterPage'
import DashboardPage from '../containers/DashboardPage'
import { SecurityPage } from '../containers/SecurityPage';


export default [
  {
    path: '/',
    exact: true,
    label: 'Dashboard',
    icon: 'newspaper',
    component: Dashboard
  },
  {
    path: '/signin',
    exact: false,
    label: 'Accounts',
    icon: 'credit card',
    component: LoginPage
  }
]