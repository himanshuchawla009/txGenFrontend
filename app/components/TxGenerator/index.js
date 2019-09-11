import React, { Component } from 'react'

import TransactionSteps from '../Steps';
import InputField from '../InputField';
import Properties from '../Table';
import Button from 'components/Button'
import Modal from '../ChoiceModal';
import PropertyModal from '../Modal';
import DropDown from '../DropDown';
import { Form } from 'semantic-ui-react';
import FormGenerator from '../FormGenerator';
import Choice from '../Choice';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

class TxGenerator extends Component {
  state = {
     active:true,
     modalOpen:false,
     propertyModalOpen:false,
     propertyName:false,
     datatype:false,
     properties:[],
     stepOne:true,
     storageChoice:false,
     fileChoice:false,
     apiBody:[],
  }

  toggleModal = ()=>{
    console.log("opening modal")
    this.setState({
        modalOpen:!this.state.modalOpen
    })
}

togglePropertyModal = ()=>{
    this.setState({
        datatype:false,
        propertyName:false,
        propertyModalOpen:!this.state.propertyModalOpen
    })
}

  toggleSteps=()=>{

    if(!!this.props.loading && !!this.props.buttonLoading) {
      this.props.notify("error","Processing,please wait")
    } else{
        this.setState({
            active:!this.state.active,
            stepOne:!this.state.stepOne
        })
    }
    
    
  }

  //for property modal
  onChange=(e)=>{
      e.preventDefault();
      console.log(e.target.value,"value")
      this.setState({
          propertyName:[e.target.value]
      })
  }

  handleDropdownChange = (e, data) => {
    console.log(data.value);
    this.setState({
        datatype:data.value
    })
 }

   //for tx dynamic modal
 onFormInputChange=(e)=>{
    e.preventDefault();
    this.setState({
        [e.target.id]:[e.target.value]
    })
}

onFormFileChange=(e)=>{
    e.preventDefault();
    console.log(e.target.files[0],e.target.id)
    this.setState({
        [e.target.id]:e.target.files[0]
    })
}

onFormDropdownChange = (e, data) => {
    console.log(data.value);
    this.setState({
        [e.target.id]:data.value
    })
 }




  propertyModalContent = ()=>{
      return (
            <Form>

                <InputField labelName={"Enter Property Name"}  onChange={this.onChange}/>
                <DropDown  onChange={this.handleDropdownChange} labelName={"Select a datatype for transaction property"}/>

            </Form>
            

            


      )
  }

  addProperty = ()=>{
      if(!!this.state.propertyName && !!this.state.datatype) {
         console.log(this.state.propertyName,this.state.datatype,this.state.properties);
         let property = { propertyName:this.state.propertyName[0], datatype:this.state.datatype};
         this.setState({
             properties:[...this.state.properties,property]
         })
         this.togglePropertyModal();
         if(this.state.datatype === 'image') {
             this.props.addUploads();
         }

      } else {
        this.props.notify("error","Please add all property details");

      }
  }
  saveTransaction = (e)=>{
      e.preventDefault();

     let apiBody = this.state.properties.map((property)=>{
        console.log(this.state[property.propertyName][0])
        if(!!this.state[property.propertyName][0]) {
            return {
                name:property.propertyName,
                value:this.state[property.propertyName][0],
                datatype:property.datatype
            }
        }
        
      })

     let data = apiBody.filter(function( element ) {
        return element !== undefined;
     });
      console.log(apiBody,"api data")
      this.setState({
          storageChoice:true,
          apiBody:data
      })


  }

  toggleStorageChoice = ()=>{
      this.setState({
          storageChoice:!this.state.storageChoice
      })
  }
  selectChoice = (choice)=>{
      console.log("choice",choice)
      this.toggleStorageChoice();
      let data = {
        
            "transactionName":"test",
            "properties":this.state.apiBody,
            "storageType": choice === "one" ? 'blockchain' :'database'
        
      }
      this.props.saveTransaction(data);

  }

  toggleFileChoice = (key)=>{
    console.log(this.state[key]);
   if(!!this.state[key]){
        this.setState({
            fileChoice:!this.state.fileChoice,
            currentImageKey:key,
            currentImage:this.state[key]
        })
   } else {
  
       this.props.notify("error","Please select any image");
   }
}
selectFileChoice = (choice)=>{
    console.log("choice",choice)

    let type;
    if(choice === 'one') {
      type= 'ipfs'
    } else {
      type = 'aws'
    }
    
    this.setState({
        fileChoice:!this.state.fileChoice
    })

    this.props.uploadImage(this.state.currentImage,this.state.currentImageKey,type)

    
}
  render() {
    return (
      this.props.loading ?  <Segment>
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Segment> :
      <div style={{display:'flex',flexDirection:'column'}}>
        
        <TransactionSteps active={this.state.active} toggleSteps={this.toggleSteps} />

{ this.state.storageChoice && <Choice open={this.state.storageChoice} selectChoice={this.selectChoice} optionOne="Blockchain" optionTwo="Database" toggleModal={this.toggleStorageChoice}/>
}      
{ this.state.fileChoice && <Choice open={this.state.fileChoice} selectChoice={this.selectFileChoice} optionOne="IPFS" optionTwo="AWS S3" toggleModal={this.toggleFileChoice}/>
}  
  {this.state.stepOne &&  <div style={{alignSelf:'flex-end'}}>
           <Button text="ADD PROPERTY" color="red" icon="add" onClick={this.togglePropertyModal}/>

         </div>
        }
         {!this.state.stepOne &&  
         
         <FormGenerator 
         onFormFileChange={this.onFormFileChange}
         saveTransaction={this.saveTransaction} 
         properties={this.state.properties} 
         onChange={this.onFormInputChange} 
         onDropdownChange={this.onFormDropdownChange}
         fileStorageChoice={this.toggleFileChoice}
         disabled={this.props.uploadsRequired !== this.props.uploadsDone}
         buttonLoading={this.props.buttonLoading}
         />
        }

         {this.state.stepOne &&  <Properties column={this.props.columns} data={this.state.properties} onClick={this.toggleModal} />}
      
      <PropertyModal data={this.propertyModalContent} heading="Add Property" open={this.state.propertyModalOpen} toggleModal={this.togglePropertyModal} validateFormData={this.addProperty}/>

        <Modal open={this.state.modalOpen} toggleModal={this.toggleModal}/>
        {this.state.stepOne && 
         <div style={{alignSelf:'flex-end'}}>
           <Button  text="NEXT" color="blue" onClick={this.toggleSteps}/>

         </div>
        }
      </div>
   
   )
  }
}

export default TxGenerator;
