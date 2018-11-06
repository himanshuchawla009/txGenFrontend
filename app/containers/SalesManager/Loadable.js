/**
 *
 * Asynchronously loads the component for SalesManager
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
