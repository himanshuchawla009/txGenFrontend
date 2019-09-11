import React from 'react'
import { Divider, Label,Form } from 'semantic-ui-react'

const InputField = (props) => (
   <Form.Field>
      <Label pointing='below'>{props.labelName}</Label>
      <input type='text' required required onChange={props.onChange}/>
    </Form.Field>
)

export default InputField
