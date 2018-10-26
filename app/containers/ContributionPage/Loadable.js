/**
 *
 * Asynchronously loads the component for ContributionPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
