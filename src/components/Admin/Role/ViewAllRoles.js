import React, { useState, useEffect, useRef } from 'react';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import {appManager} from "../../../models/AppManager/managers.js";
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { roleDisplay } from './displayTable.js';
import {Box, Grid, Paper} from "@mui/material";
import DisplayTable from '../../DisplayTable/DisplayTable.js';
import Title from "../Title/Title.js";
import "./Role.scss";

/***************************************************************/
const ViewAllRoles = (input) => {
    const ref = useRef(null);
    const [roles, setRoles] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
      if(dataChanged === "temp.roles.editableRows"){
        setRoles(appManager.getTemp("temp.roles.editableRows"));
      }
      else if(dataChanged === "temp.roles.rowModesModel"){
        setRowModesModel(appManager.getTemp("temp.roles.rowModesModel"));
      }
     }});
  /*****************************************************************/
  useEffect(() => {
          if (roles === null) {
              const uri = "/api/roles/all";
              apiCall(uri, {}, (args, d) => {
                if(d && d.success) handleRolesChanged(d.roles);
              });
          }
      }, []);
  /*****************************************************************/
  const handleRolesChanged = (changedRoles) => {
    appManager.setTemp(changedRoles, "temp.roles.editableRows");
  }
  /***************************************************************/
  return (
        <Box
        sx={{
          display: 'flex',
          width: "100vw",
          flexWrap: 'wrap'
        }}
      >
        <Paper 
        sx={{width: "100%", padding: "1em"}}
        elevation={1}>
            <Title className="fonts-title">Roles</Title>
            <h3>View All</h3>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                {roles &&  
                        <DisplayTable
                            setPairs={setRoles}
                            columns={roleDisplay.columns}
                            pairs={roles}
                            dataName={"roles"}
                            deleteTitle="Delete Role"
                            saveTitle="Save Role"
                            updater={() => {}}
                            successMessageDelete={roleDisplay.successMessageDelete}
                            successMessageSave={roleDisplay.successMessageSave}
                            saveMessage={roleDisplay.saveMessage}
                            managed={true}
                            deleteMessage={roleDisplay.deleteMessage}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                        />}
                </Grid>
            </Grid>
        </Paper>
      </Box>
    );
}

export default ViewAllRoles;
/**************************************************************/