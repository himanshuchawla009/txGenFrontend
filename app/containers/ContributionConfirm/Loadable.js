/**
 *
 * Asynchronously loads the component for ContributionConfirm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
