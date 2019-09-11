import React from 'react'
import { Dropdown ,Form,Label} from 'semantic-ui-react'

const options = [
  {
    key: 'uint',
    text: 'Integer',
    value: 'uint',
  },
  {
    key: 'string',
    text: 'String',
    value: 'string',
  },
  {
    key: 'image',
    text: 'Image/Document',
    value: 'image',
  }
]

const DropdownSelection = (props) => (
    <Form.Field>
      <Label pointing='below'>{props.labelName}</Label>
  <Dropdown
    placeholder={props.placeholder || 'Select Datatype'}
    fluid
    selection
    options={props.options|| options}
    onChange={props.onChange}
  />
  </Form.Field>
)

export default DropdownSelection