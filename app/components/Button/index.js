import React from 'react'
import { Button,Icon } from 'semantic-ui-react'
import { tsPropertySignature, throwStatement } from '@babel/types';

const ButtonExampleInverted = (props) => (
  <div>
   
      
      <Button type={props.type} loading={props.buttonLoading} disabled={props.disabled}  inverted color={props.color} onClick={props.onClick}>
        {!! props.icon && <Icon name={props.icon} /> }

        {props.text}
      </Button>
      
  </div>
)

export default ButtonExampleInverted 