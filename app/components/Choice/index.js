import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const Choice = (props) => (
  <Modal open={props.open} onClose={props.toggleModal} basic size='small'>
    <Header icon='archive' content='Save transaction' />
    <Modal.Content>
      <p>
        Where do you want to save this transaction?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button  color='green' inverted onClick={()=>{props.selectChoice("one")}}>
        <Icon name='chain' /> {props.optionOne}
      </Button>
      <Button color='green' inverted onClick={()=>{props.selectChoice("two")}}>
        <Icon name='database' /> {props.optionTwo}
      </Button>
    </Modal.Actions>
  </Modal>
)

export default Choice
