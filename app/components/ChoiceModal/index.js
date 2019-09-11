import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ChoiceModal = (props) => (
  <Modal open={props.open} onClose={props.toggleModal} basic size='small'>
    <Header icon='archive' content='Delete Transaction Property' />
    <Modal.Content>
      <p>
        Do you want to delete this property?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ChoiceModal
