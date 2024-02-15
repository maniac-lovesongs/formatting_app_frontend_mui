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
      editable: true
    }], 
  "successMessageDelete": (params) => {
    return `You deleted (${params.row.symbol}, ${params.row.value}) pair.`
  },
  "successMessageSave": (params) => {
    return `You successfully saved changes to (${params.row.symbol}, ${params.row.value}) pair.`
  },
  "saveMessage": (params) => {
    return `Would you like to save (${params.row.symbol}, ${params.row.value}) pair?`},
  "deleteMessage": (params) => {
    return `Would you like to delete (${params.row.symbol}, ${params.row.value}) pair?`;
  }
}

const fontsDisplay = {
  "columns": [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'styles',
      headerName: 'Styles',
      width: 200,        
      editable: false,
      renderCell: (params) => {
        return <span>{params.row.styles.join(", ")}</span>;
      }
    },
    {
        field: "view",
        headerName: "View/Edit",
        width: 100,
        renderCell: (params) => {
          const tempName = params.row.name.toLowerCase().split(" ").join("_"); 
          return <a href={params.id +"/name/" + tempName}>View/Edit</a>
        },
    }],
  "successMessageDelete": (params) => {
    return `You successfully deleted the (${params.row.symbol}, ${params.row.value}) pair.`
  },
  "successMessageSave": (params) => {
      return `You successfully saved changes to (${params.row.symbol}, ${params.row.value}) pair.`
    },
  "saveMessage": (params) => {
    return `Would you like to save font ${params.row.name}?`
  },
  "deleteMessage": (params) => {
    return `Would you like to delete font ${params.row.name}?`}
}

export {characterSet, fontsDisplay};