import React, { Component } from 'react'
import { Segment, Tab,Icon ,Divider,Image} from 'semantic-ui-react'
import Transactions from '../Table';
import Modal from '../Modal';
import TxGenerator from '../TxGenerator';
import AceEditor from 'react-ace';
import  { Link } from 'react-router-dom';
const panes = [
  { menuItem: 'Generate Transactions' },
  { menuItem: 'Transactions' },
]

class TabExampleOnTabChange extends Component {
  state = {
      activeIndex:0,
      modalOpen:false,
      codeOpen:false,
      currentTransaction:{}
  }

 

  handleChange = (e, data) => {
     this.setState({
         activeIndex:data.activeIndex
     })
     if(data.activeIndex === 1) {
         this.props.getTransactions();
     } else {
         this.props.clearState();
     }
  }

  toggleModal = ()=>{
      console.log("opening modal")
      this.setState({
          modalOpen:!this.state.modalOpen
      })
  }

  toggleCodeModal = ()=>{
    console.log("opening modal")
    this.setState({
        codeOpen:!this.state.codeOpen
    })
}

  showData = (data)=>{
    console.log("opening modal")
    this.setState({
        modalOpen:!this.state.modalOpen,
        currentTransaction:data
    })
}

showCode = ()=>{
    return (
        <AceEditor
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name="blah2"
        width="100%s"
        // onLoad={this.onLoad}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={!!this.state.currentTransaction && this.state.currentTransaction.contractCode}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          readOnly: true,
          useWorker: false
        }}
      />
    )
}
  transactionDetailModalContent = ()=>{
    return (
        <div style={{display:'flex',flexDirection:'column'}}>

           <div style={{alignSelf:'flex-start'}}>
           {!!this.state.currentTransaction.storageType &&
            this.state.currentTransaction.storageType === 'blockchain' &&
             <h5>Transaction Hash: <Link  style={{cursor:'pointer'}} target="_blank" to={`https://rinkeby.etherscan.io/tx/${this.state.currentTransaction.txHash}`}>{this.state.currentTransaction.txHash}</Link></h5>
           }
               </div>
         <div style={{alignSelf:'flex-end'}}>
            {!!this.state.currentTransaction.storageType &&
            this.state.currentTransaction.storageType === 'blockchain' &&
           
            
                 <Icon onClick={()=>this.toggleCodeModal()} name='code' style={{cursor:'pointer'}} size="big"/> 
                }
         </div>
       <div>
       <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                       <div>
                       <h2>Property Name</h2>
                       </div>
                       <div>
                       <h2>Property Value</h2>

                       </div>

                   </div>
                   <Divider/>

         {
           !!this.state.currentTransaction.transactionProperties &&
           this.state.currentTransaction.transactionProperties.map((tx)=>{
               return(
                 <div>
                       <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                    <div>
                       <h4>{tx.name}</h4>
                       </div>
                       <div>
                        {(tx.datatype === 'image' || tx.value.indexOf('http') !== -1) ? 
                              <Link to={tx.value} style={{cursor:'pointer'}} target="_blank">Click to view</Link>
                              :
                              <h4>{tx.value}</h4>

                            }
                       </div>

                   </div>
                   <Divider/>
                     </div>
               )
           })  
         }

       </div>
        
        </div>
    )
}


  render() {
    return (
      <div>
        <Tab panes={panes} onTabChange={this.handleChange} />
        <Segment >
          { (this.state.activeIndex  === 0 && !this.props.txSuccess) &&
            <TxGenerator 
            uploadsRequired={this.props.uploadsRequired}
            uploadsDone={this.props.uploadsDone}
            buttonLoading={this.props.buttonLoading}

            loading={this.props.loading}
            notify={this.props.notify}
            addUploads={this.props.addUploads}
            uploadImage={this.props.uploadImage}
            saveTransaction={this.props.saveTransaction} /> }

            {(this.state.activeIndex  === 1 || this.props.txSuccess) &&  <Transactions data={this.props.transactions} onClick={this.showData} columns={this.props.columns}/> }
        </Segment>
        <Modal data={this.showCode} heading="Transaction Smart Contract Code" open={this.state.codeOpen} toggleModal={this.toggleCodeModal}/>

        <Modal data={this.transactionDetailModalContent} heading="Transaction Details" open={this.state.modalOpen} toggleModal={this.toggleModal}/>
      </div>
    )
  }
}

export default TabExampleOnTabChange
