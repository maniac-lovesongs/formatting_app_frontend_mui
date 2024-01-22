import React, { useState, useEffect, useRef } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import { appManager, observerManager } from "../../../models/AppManager/managers.js";
import {listItems} from "./utils.js";

/***************************************************************/
export const MainListItems = (input) => {
  const ref = useRef(null);
  const [observerId, setObserverId] = useState(null);
  let [open, setOpen] = React.useState([]);
  
  /***************************************************************/
  useEffect(() => {
      // register a listener 
      if (observerId === null) {
          const id = observerManager.registerListener((dataChanged) => {
              //console.log("Something interesting happened to the app, and as a listener I need to update ");
          });
          setObserverId(id);
      }
      open = listItems.map((i) => {
        return false;
      });
      // once the component unmounts, remove the listener
      return () => {
          observerManager.unregisterListener(observerId);
          setObserverId(null);
      };

  }, []);
  /***************************************************************/
  const handleClick = (i) => {
    const temp = [...open];
    temp[i] = !temp[i];
    setOpen(temp);
  };
  /***************************************************************/
  const makeList = (list) => {
    return list.map((item,i) => {
      const IconComponent = item.icon; 
      let listItemButtonProps = {};
      if(item.href){
        listItemButtonProps["component"] = "a";
        listItemButtonProps["href"] = item.href; 
      };

      return(
        <React.Fragment>
          <ListItemButton {...listItemButtonProps} onClick={(e) => {
            handleClick(i);
          }}>
            <ListItemIcon>
              <IconComponent/>
            </ListItemIcon>
            <ListItemText primary={item.text}/>
            {item.sublist && <ListItemIcon>
              {open[i] ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>}
          </ListItemButton>
            {item.sublist && <Collapse in={open[i]} timeout="auto" unmountOnExit>
              <List component="div">
                {makeList(item.sublist)}
              </List>
            </Collapse>}
        </React.Fragment>
      );
    })
  }
  /***************************************************************/
  return (
    <List>
      {makeList(listItems)}
    </List>
  );
  /***************************************************************/
}