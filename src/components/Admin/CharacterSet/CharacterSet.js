import React, { useState, useEffect, useRef } from 'react';
import { appManager } from "../../../models/AppManager/managers.js";
import { apiCall } from '../../../utils/apiFunctions.js';
import constants from '../../../utils/constants.js';
import {DataGrid} from '@mui/x-data-grid';
import {withEditableDataGridRows} from '../../../utils/editableDataGridRowsWrapper.js';
import {withObserver, useObserver} from '../../../utils/withObserver.js';
import "./CharacterSet.scss";

/***************************************************************/
const CharacterSetInner = (input) => {
    const ref = useRef(null);
    const [characters, setCharacters] = useState(null);
    const [fontName, setFontName] = useState(input.fontName);
    const [style, setStyle] = useState(input.characterSet)
    const [rowModesModel, setRowModesModel] = useState({});
    const [observerId, setObserverId] = useState(null);
    const [actionsColumn] = withEditableDataGridRows({"rowModesModel": rowModesModel, 
    "rows": characters, 
    "setRows": setCharacters, 
    "setRowsModel": setRowModesModel});
  /***************************************************************/
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'value',
          headerName: 'Value',
          width: 150,
          editable: false,
        },
        {
          field: 'symbol',
          headerName: 'Symbol',
          width: 150,
          editable: true
        },
        actionsColumn
      ];
   /***************************************************************/
   const getCharacterSetHelper = async (s,f) => {
       const uri = "/api/fonts/character_sets/font/" + f + "/style/" + s;
       apiCall(uri, {}, (args, d) => {
           if (d.characters) {
               const chs = [];
               Object.keys(d.characters).forEach((v) => {
                   chs.push(d.characters[v]); 
               });
               setCharacters(chs);
               appManager.setCurrentData(d);
          } 
       });

    }
    /***************************************************************/
    useEffect(() => {
        // register a listener 
        if (characters === null)
            getCharacterSetHelper(style,fontName);            
        
        const handleDataChange = (dataChanged) => {
            if(dataChanged === "style"){
                const tempStyle = appManager.getStyle();
                getCharacterSetHelper(tempStyle,fontName);
                setStyle(tempStyle);                
            }
        };

        return withObserver(handleDataChange, observerId, setObserverId);  
    }, []);
    /***************************************************************/
    return (
            <React.Fragment>
                {characters && <DataGrid
                        rows={characters}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: constants.NUM_PER_PAGE,
                                },
                            },
                        }}
                        pageSizeOptions={[constants.NUM_PER_PAGE]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />}
            </React.Fragment>
    );
}
const CharacterSet = CharacterSetInner;
export default CharacterSet;
/**************************************************************/