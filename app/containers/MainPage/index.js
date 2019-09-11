/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Tab from 'components/Tab'
import Header from 'components/Header'
import { uploadImage, saveTransaction,getTransactions,clear } from './actions'
import { ToastContainer, toast } from 'react-toastify';

const transactionsColumns = [{
  Header: 'Transaction Name',
  accessor: 'transactionName' // String-based value accessors!
}, {
  Header: 'Storage',
  accessor: 'storageType',
},{
  Header: 'Created At',
  accessor:'created_at',
  Cell: row => (
   
      !!row.value && row.value.substring(0,10)
    
  )
},]

export class MainPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    transactions :[],
    docProperties:[],
    uploadsRequired:0,
    uploadsDone:0,
    loading:false,
    buttonLoading:false,
    txSuccess:false
  }
  componentDidMount(){
    console.log("mounting")
     let data = {
       page:1,
       limit:100
     }
     this.props.getTransactionsAction(data);
  }
  
componentWillReceiveProps(nextProps){
  console.log(nextProps.mainpage,"mainPage props");
  let transactionsState= nextProps.mainpage.transactions;
  if(!!transactionsState) {
     if(transactionsState.success) {
         this.setState({
           transactions: transactionsState.data
         })
     } else {
      this.notify("error","Failed to fetch transactions")

     }
     
  }

  let transactionsSaveState= nextProps.mainpage.txResult;
  if(!!transactionsSaveState) {
     if(transactionsSaveState.success) {
         console.log("Successfully save transaction")
         this.notify("success",transactionsSaveState.message)
         this.setState({
          loading:false,
          txSuccess:true
        })
        this.getAllTransactions()
        this.props.clear();



     } else {

         this.notify("error","Failed to save transaction");
         this.setState({
          loading:false
        })
     }
     this.props.clear();

  }


  let imageResult= nextProps.mainpage.imageResult;
  if(!!imageResult) {
     if(imageResult.success) {
         console.log("uploaded image successfully",imageResult)
         let property = {
           name:imageResult.imageName,
           datatype:'image',
           value:imageResult.url
         }
         this.setState({
           docProperties:[...this.state.docProperties,property],
           uploadsDone:this.state.uploadsDone + 1,
           buttonLoading:false
         })
         this.notify("success",imageResult.message)
         this.props.clear();


     } else {
        if(imageResult.type === 'ipfs') {
          this.notify("error","Failed to save image, ipfs service is down")

        } else {
          this.notify("error","Failed to save image")

        }

        this.setState({
          loading:false
        })
        this.props.clear();

     }
     
  }
}

   notify = (type,message) =>{
     if(type === 'success') {
        toast.success(message);
     } else {
        toast.error(message);

     }
   }

  getAllTransactions = ()=>{
    console.log("mounting")
     let data = {
       page:1,
       limit:100
     }
     this.props.getTransactionsAction(data);
  }

  saveTx = (data)=>{
    if(this.state.uploadsDone !== this.state.uploadsRequired) {
       console.log("please upload all images/documents")
       this.notify("error","Please upload all images/documents");

    } else {
      let modified = data.properties.concat(this.state.docProperties);
    let body = {
      transactionName:data.transactionName,
      properties:modified,
      storageType:data.storageType
    }
    this.setState({
      loading:true
    })
    this.props.saveTransactionAction(body);
    }
  }
  uploadImage = (file, name,type) => {

    console.log(file,name,type)
    var reader = new FileReader();

    if (file.size > 2 * 1024 * 1024) {
      this.notifyError("error","File size should be less than 2MB");
    } else {
     
      reader.readAsDataURL(file);
      let data = {};
      data.file = file;
      data.imageName = name;
      data.type= type;
      this.setState({
        buttonLoading:true
      })
      this.props.uploadImageAction(data);
      
    }
  };
  addUploads = ()=>{

     this.setState({
       uploadsRequired:this.state.uploadsRequired + 1
     })
  }
  clearState = ()=>{
this.setState({
  transactions :[],
    docProperties:[],
    uploadsRequired:0,
    uploadsDone:0,
    loading:false,
    buttonLoading:false,
    txSuccess:false
})
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>MainPage</title>
          <meta name="description" content="Description of MainPage" />
        </Helmet>
        <Header/>
        <ToastContainer />

        <Tab 
         txSuccess={this.state.txSuccess}
         clearState={this.clearState}
         uploadsDone={this.state.uploadsDone}
         uploadsRequired={this.state.uploadsRequired}
         buttonLoading={this.state.buttonLoading}
         loading={this.state.loading}
         notify={this.notify}
         addUploads={this.addUploads}
         saveTransaction={this.saveTx}
         columns={transactionsColumns}
         transactions={this.state.transactions}
         getTransactions={this.getAllTransactions}
         uploadImage={this.uploadImage} />
      </div>
    );
  }
}

MainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainpage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    uploadImageAction: data => dispatch(uploadImage(data)),
    saveTransactionAction: data => dispatch(saveTransaction(data)),
    getTransactionsAction: data => dispatch(getTransactions(data)),
    clear:()=>dispatch(clear())

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainPage);
