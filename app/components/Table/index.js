
import React, { Component } from 'react'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

 
  const columns = [{
    Header: 'Property Name',
    accessor: 'propertyName' // String-based value accessors!
  }, {
    Header: 'Datatype',
    accessor: 'datatype',
  }]
  class Table extends Component {

render() {
 
 
  return <ReactTable
    data={this.props.data}
    columns={this.props.columns || columns}
    defaultPageSize={5}
    className="-striped -highlight"
    style={{cursor:'pointer'}}

    getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
            if(!!rowInfo) {
                this.props.onClick(rowInfo.original)

            }
     
            // IMPORTANT! React-Table uses onClick internally to trigger
            // events like expanding SubComponents and pivots.
            // By default a custom 'onClick' handler will override this functionality.
            // If you want to fire the original onClick handler, call the
            // 'handleOriginal' function.
            if (handleOriginal) {
              handleOriginal()
            }
          }
        }
      }}
  />
}
  }
  export default Table;
