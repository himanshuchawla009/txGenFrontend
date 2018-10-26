import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Poppins,'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

   h1,h2,h3,h4,h5,h6 {
    font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  }


  #app,section {
    min-height: calc(100% - 100px);
    width: 100%;
  }
  #app > [data-reactroot] { height: 100%; width:100%;}
`;
