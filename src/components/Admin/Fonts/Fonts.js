import React, { useState, useEffect, useRef } from 'react';
import constants from '../../../utils/constants.js';
import {useObserver, observerManager} from '../../../utils/hooks/useObserver.js';
import {appManager} from "../../../models/AppManager/managers.js";
import { apiCall, apiCallPost } from "../../../utils/apiFunctions.js";
import { fontsDisplay } from '../CharacterSet/displayTableMisc.js';
import {Box, Grid, Paper} from "@mui/material";
import DisplayTable from '../../DisplayTable/DisplayTable.js';
import Title from "../Title/Title.js";
import "./Fonts.scss";

/***************************************************************/
const FontsInner = (input) => {
    const ref = useRef(null);
    const [fonts, setFonts] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    /***************************************************************/
    const [observerId, setObserverId] = useObserver({"callback": (dataChanged) => {
      if(dataChanged === "temp.fonts.editableRows"){
        setFonts(appManager.getTemp("temp.fonts.editableRows"));
      }
      else if(dataChanged === "temp.fonts.rowModesModel"){
        setRowModesModel(appManager.getTemp("temp.fonts.rowModesModel"));
      }
     }});
  /*****************************************************************/
  useEffect(() => {
          if (fonts === null) {
              const uri = "/api/fonts/all";
              apiCall(uri, {}, (args, d) => {
                handleFontsChanged(d.fonts);
              });
          }

          return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        }; 
      }, []);
  /***************************************************************/
  const updateFonts = (updatedRow) => {
    const uri = "/api/fonts/edit/" + updatedRow.id;
    apiCallPost(uri, {}, updatedRow, (args, d) => {
      console.log(d);
    });
  };
  /*****************************************************************/
  const handleFontsChanged = (changedFonts) => {
    appManager.setTemp(changedFonts, "temp.fonts.editableRows");
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
            <Title className="fonts-title">Fonts</Title>
            <h3>View All</h3>
            <Grid container className="fonts-display" spacing={2}>
                <Grid item container>
                {fonts &&  
                        <DisplayTable
                            setPairs={setFonts}
                            columns={fontsDisplay.columns}
                            pairs={fonts}
                            dataName={"fonts"}
                            deleteTitle="Delete Font"
                            saveTitle="Save Font"
                            updater={updateFonts}
                            successMessageDelete={fontsDisplay.successMessageDelete}
                            successMessageSave={fontsDisplay.successMessageSave}
                            saveMessage={fontsDisplay.saveMessage}
                            managed={true}
                            deleteMessage={fontsDisplay.deleteMessage}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                        />}
                </Grid>
            </Grid>
        </Paper>
      </Box>
    );
}

const Fonts = FontsInner;
export default Fonts;
/**************************************************************/