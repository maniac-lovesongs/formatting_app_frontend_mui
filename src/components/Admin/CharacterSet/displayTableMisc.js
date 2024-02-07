const characterSet = {
  "columns": [{ 
    field: 'id', 
    headerName: 'ID', 
    width: 90 },{
    field: 'value',
    headerName: 'Value',
    width: 150,
    editable: false},{
    field: 'symbol',
    headerName: 'Symbol',
    width: 150,
    editable: true}], 
  "saveMessage": (params) => {
    return `Would you like to save (${params.row.symbol}, ${params.row.value}) pair?`},
  "deleteMessage": (params) => {
    return `Would you like to delete (${params.row.symbol}, ${params.row.value}) pair?`;
  }
}

export {characterSet};