/**
 *
 * Asynchronously loads the component for ResetPasswordOuter
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
