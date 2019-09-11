/**
 *
 * FormGenerator
 *
 */

import React from 'react';


import { Divider, Label,Form } from 'semantic-ui-react'
import DropDown from '../DropDown';
import Button from '../Button';
function FormGenerator(props) {
  return (
    <div>
        {props.properties.length === 0 ? 
         <h2 style={{textAlign:'center',color:'#FF5722',margin:40}}>Please add properties to this transaction</h2> :
          <div>
              <Form onSubmit={props.saveTransaction}>
               {props.properties.map((field)=>{
            if(field.datatype === 'uint'){
                return(
                    <Form.Field>
                    <Label pointing='below'>{field.propertyName}</Label>
                    <input type='number' min="1" max="5" id={field.propertyName} required onChange={props.onChange}/>
                  </Form.Field>
                )
                 } else if(field.datatype === 'string') {
                     return (
                 <Form.Field>
                    <Label pointing='below'>{field.propertyName}</Label>
                    <input type='text' id={field.propertyName} required  onChange={props.onChange}/>
                  </Form.Field>
                     )
                 } else if(field.datatype === 'bool') {
                    return (
                       
                       
                     <DropDown placeholder="Select boolean value" labelName={field.propertyName} options={[{
                        key: field.propertyName,
                        text: 'true',
                        value: true,
                      },
                      {
                        key: field.propertyName,
                        text: 'false',
                        value: false,
                      }]}
                      onChange={props.onDropdownChange}
                      />
                   
                      
                      )
                 } else if(field.datatype === 'image') {
                    return (
                        <Form.Field>
                           <Label pointing='below'>{field.propertyName}</Label>
                           <div style={{display:'flex',flexDirection:'row'}}>

                           <input type='file' id={field.propertyName} required  onChange={props.onFormFileChange}/>
                           <Button buttonLoading={props.buttonLoading} color="blue" text="upload" onClick={()=>props.fileStorageChoice(field.propertyName)} icon="upload"/>
                           </div>
                         

                         </Form.Field>
                            )
                 } 
        })}

<div style={{textAlign:'center'}}>
<Form.Button content='Save Transaction' />
            </div>

        </Form>


          </div>
         }
       
    </div>
  );
}

FormGenerator.propTypes = {};

export default FormGenerator;
