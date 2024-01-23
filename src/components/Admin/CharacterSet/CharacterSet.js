import React, { useState, useEffect, useRef } from 'react';
import { appManager, observerManager } from "../../../models/AppManager/managers.js";
import utils from '../../../utils/utils.js';
import { apiCall } from '../../../utils/apiFunctions.js';
import constants from '../../../utils/constants.js';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from "react-router-dom";
import "./CharacterSet.scss";

/***************************************************************/
const CharacterSet = (input) => {
    const ref = useRef(null);
    const [observerId, setObserverId] = useState(null);
    const [characters, setCharacters] = useState(null);
    const [fontName, setFontName] = useState(input.fontName);
    const [style, setStyle] = useState(input.characterSet)

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
        if (observerId === null) {
            const id = observerManager.registerListener((dataChanged) => {
                if(dataChanged === "style"){
                    const tempStyle = appManager.getStyle();
                    getCharacterSetHelper(tempStyle,fontName);
                    setStyle(tempStyle);
                }
            });
            setObserverId(id);
        }
        if (characters === null) getCharacterSetHelper(style,fontName);
        // once the component unmounts, remove the listener
        return () => {
            observerManager.unregisterListener(observerId);
            setObserverId(null);
        };

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

export default CharacterSet;
/**************************************************************/