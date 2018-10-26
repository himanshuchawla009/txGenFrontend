/**
 *
 * Asynchronously loads the component for DashBoardWelcomePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
