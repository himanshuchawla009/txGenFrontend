/**
*
* CustomLoading
*
*/

import React,{Component} from 'react';
// import styled from 'styled-components';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'




 class CustomLoading extends Component {
   

    render() {
     
      return  (
     <Segment>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
  
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Segment>
      )
};
 }

export default CustomLoading;
