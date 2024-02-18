import {utils, uriFriendlyString} from "../../../utils/utils.js";

const usersDisplay = {
    "columns": [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'username',
        headerName: 'Username',
        width: 150,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 300,        
        editable: true,
      },
      {
        field: 'role_id',
        headerName: 'Role ID',
        width: 90,        
        editable: true,
      },
      {
          field: "view",
          headerName: "View/Edit",
          width: 100,
          renderCell: (params) => {
            const tempName = uriFriendlyString(params.row.username);
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
  
  export {usersDisplay};