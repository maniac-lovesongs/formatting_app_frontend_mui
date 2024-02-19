import React, { useState, useRef } from 'react';
import { useEditable } from 'use-editable';
import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from '../../../utils/hooks/useObserver.js';
import { appManager } from "../../../models/AppManager/managers.js";
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { Box, Grid, Paper } from "@mui/material";
import Title from "../Title/Title.js";
import "./Role.scss";

/***************************************************************/
const Role = (input) => {
  const ref = useRef(null);
  const [roles, setRoles] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});
  /***************************************************************/
  const observerId = useObserver({
    "callback": (dataChanged) => {
      if (dataChanged === "temp.roles.editableRows") {
        setRoles(appManager.getTemp("temp.roles.editableRows"));
      }
      else if (dataChanged === "temp.roles.rowModesModel") {
        setRowModesModel(appManager.getTemp("temp.roles.rowModesModel"));
      }
    }
  });
  /*****************************************************************/
  useEffect(() => {
    if (roles === null) {
      const uri = "/api/roles/all";
      apiCall(uri, {}, (args, d) => {
      //  if (d && d.success) handleRolesChanged(d.roles);
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
        sx={{ width: "100%", padding: "1em" }}
        elevation={1}>
        <Title className="fonts-title">Role</Title>
        <Grid container className="fonts-display" spacing={2}>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Role;
/**************************************************************/