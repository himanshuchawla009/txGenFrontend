/**
 *
 * Asynchronously loads the component for CustomLoading
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
