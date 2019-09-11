import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const TransactionSteps = (props) => (
 <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Step.Group>
    <Step active={props.active} onClick={props.toggleSteps}>
      <Icon name='truck' />
      <Step.Content>
        <Step.Title>Add Properties</Step.Title>
        <Step.Description>Create Custom Properties</Step.Description>
      </Step.Content>
    </Step>
    <Step active={!props.active} onClick={props.toggleSteps}>
      <Icon name='credit card' />
      <Step.Content>
        <Step.Title>Execute Transaction</Step.Title>
        <Step.Description>Add data for transaction</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
 </div>
)

export default TransactionSteps
