/**
 *
 * Asynchronously loads the component for SignupConfirm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
