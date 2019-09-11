import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeaderWithIcon = () => (
  <Header as='h2'>
    <Icon name='settings' />
    <Header.Content>
      Transaction Generator
      <Header.Subheader>Generate Transactions</Header.Subheader>
    </Header.Content>
  </Header>
)

export default HeaderWithIcon