import _ from 'lodash'
import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

const ModalExampleScrollingContent = (props) => (
  <Modal open={props.open} onClose={props.toggleModal}>
    <Modal.Header>{props.heading}</Modal.Header>
    <Modal.Content>
       {props.data()}
    </Modal.Content>
    <Modal.Actions>
      <Button primary onClick={props.validateFormData}>
        Add <Icon name='chevron right' />
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ModalExampleScrollingContent
