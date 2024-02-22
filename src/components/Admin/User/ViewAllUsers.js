import React, { useState, useEffect, useRef} from 'react';
import {useObserver, observerManager} from '../../../utils/hooks/useObserver.js';
import {appManager} from "../../../models/AppManager/managers.js";
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { usersDisplay } from './displayTable.js';
import {Box, Grid, Paper} from "@mui/material";
import { saveResetHelper } from './utils.js';
import SaveReset from "../SaveReset/SaveReset.js";
import DisplayTable from '../../DisplayTable/DisplayTable.js';
import Title from "../Title/Title.js";

/***************************************************************/
const ViewAllUsers = (input) => {
    const ref = useRef(null);
    const [users, setUsers] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    /***************************************************************/
    const [observerId, setObserverId] = useObserver({"callback": (dataChanged) => {
      if(dataChanged === "temp.users.editableRows"){
        setUsers(appManager.getTemp("temp.users.editableRows"));
      }
      else if(dataChanged === "temp.users.rowModesModel"){
        setRowModesModel(appManager.getTemp("temp.users.rowModesModel"));
      }
     }});
  /*****************************************************************/
  useEffect(() => {
          if (users === null) {
              const uri = "/api/users/all";
              apiCall(uri, {}, (args, d) => {
                if(d && d.success) handleUsersChanged(d.users);
              });
          }

          return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        }; 
      }, []);
  /*****************************************************************/
  const handleUsersChanged = (changedUsers) => {
    appManager.setTemp(changedUsers, "temp.users.editableRows");
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
            <Title className="fonts-title">Users</Title>
            <h3>View All</h3>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                {users &&  
                        <DisplayTable
                            setPairs={setUsers}
                            columns={usersDisplay.columns}
                            pairs={users}
                            dataName={"users"}
                            deleteTitle="Delete User"
                            saveTitle="Save User"
                            updater={() => {}}
                            successMessageDelete={usersDisplay.successMessageDelete}
                            successMessageSave={usersDisplay.successMessageSave}
                            saveMessage={usersDisplay.saveMessage}
                            managed={true}
                            deleteMessage={usersDisplay.deleteMessage}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                        />}
                </Grid>
                <Grid
                justifyContent="flex-start"
                item 
                container 
                xs={12}>
                    <SaveReset
                        resetHandler={() => {}}
                        saveHandler={() => {}}
                        saveSuccessMessage={saveResetHelper.makeSaveSuccessMessage()}
                        resetSuccessMessage={saveResetHelper.makeResetSuccessMessage()}
                        saveMessage={saveResetHelper.makeSaveMessage()}
                        resetMessage={saveResetHelper.makeResetMessage()}
                    />
              </Grid>
            </Grid>
        </Paper>
      </Box>
    );
}

export default ViewAllUsers;
/**************************************************************/