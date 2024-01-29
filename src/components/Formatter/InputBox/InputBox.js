import React, { useState, useEffect, useRef } from 'react';
import {useObserver} from '../../../utils/hooks/useObserver.js';
import {appManager} from "../../../models/AppManager/managers.js";
import "./InputBox.scss";
/***************************************************************/
const InputBox = (input) => {
    const ref = useRef(null);
    const [inputString, setInputString] = useState([]);
    const [selection, setSelection] = useState([null, null]);
    /***************************************************************/
    const observerId = useObserver({"callback": (dataChanged) => {
        if (dataChanged === "string") {
            setInputString([...appManager.string.getString()]);
            setSelection([...appManager.string.getCursor()]);
        }
        else if (dataChanged === "string.cursor") {
            setSelection([...appManager.string.getCursor()]);
        }  
    }});
    /***************************************************************/
    useEffect(() => {
        setInputString(appManager.getString());
    }, []);
    /***************************************************************/
    const handleMouseUp = (e) => {
        // is it just a cursor?
        if (e.target.selectionStart === e.target.selectionEnd) {
            let cursor = e.target.selectionStart;
            if (e.target.selectionStart !== inputString.length) {
                const cursor = appManager.string.getValidPos(e.target.selectionStart);
                //appManager.setCursor(cursor, cursor);
            } 
            appManager.string.setCursor(cursor,cursor);
        }
        else {
            // if the user is making a selection, and the end of the 
            // selection is the end of the string itself, then all we
            // need to do is find the beginning of the selection
            if (e.target.selectionEnd === inputString.length) {
                const start = appManager.string.getValidPos(e.target.selectionStart);
                appManager.string.setCursor(start, e.target.selectionEnd);
            }
            else {
                // find the end 
                const end = appManager.string.getValidPos(e.target.selectionEnd, "forward");
                // find the beginning
                const start = appManager.string.getValidPos(e.target.selectionStart);
                appManager.string.setCursor(start, end);
            }
        }
    }
    /***************************************************************/
    useEffect(() => {
        // makes sure to refocus the textbox
        ref.current.focus();
        ref.current.setSelectionRange(selection[0], selection[1]);
    }, [selection]);
    /***************************************************************/
    const handleInput = (e) => {
       //console.log(e);
        if (e.nativeEvent.inputType === "insertText" ) {
            appManager.insertSingleCharacter(e.nativeEvent.data, e.target.selectionStart - 1);
        }
        else if(e.nativeEvent.inputType === "insertLineBreak"){
            appManager.insertLineBreak(e.target.selectionStart - 1);
        }
        else if (e.nativeEvent.inputType === "deleteContentBackward") {
            // 1. First branch deletes a single character
            // 2. Second branch deletes a selection (which can be more than one character)
            if (!appManager.string.getSelectionMade()) {
                if (e.target.selectionStart >= 0) appManager.deleteCharacter(e.target.selectionStart);
            }
            else {
                appManager.deleteSelection();
            }
        }
        else if (e.nativeEvent.inputType === "insertFromPaste") {
                const defaults = appManager.getDefaults();
                const temp = e.nativeEvent.data.split('').map((c) => {
                    return {
                        value: c,
                        font: appManager.getFont(),
                        style: appManager.getStyle()
                    };
                });

                appManager.insertFromPaste(temp);
            
            e.preventDefault();
        }
    };

    /***************************************************************/
    const makeString = () => {
        return inputString.map((v) => {
            return v.symbol;
        }).join('');
    }
    /***************************************************************/
    const handleKeyDown = (e) => {
        if (e.code === "ArrowLeft") {
            if (e.target.selectionStart > 0) {
                let cursor = appManager.string.getValidPos(e.target.selectionStart - 1);
                if (cursor === e.target.selectionStart)
                    cursor -= 1;

                appManager.string.setCursor(cursor, cursor);
            }

            e.preventDefault();
        }
        else if (e.code === "ArrowRight") {
            if (e.target.selectionStart < inputString.length) {
                let cursor = appManager.string.getValidPos(e.target.selectionStart + 1, "forward");
                appManager.string.setCursor(cursor, cursor);
            }
            e.preventDefault();            
        }
        else if (e.ctrlKey && e.nativeEvent.key === "c") {
            const substringToCopy = appManager.string.getSubstring(selection);
            appManager.setClipboard(substringToCopy);
           // setClipboard(substringToCopy);
            e.preventDefault();
        }
    }
    /***************************************************************/
    const handleOnFocus = (e) => {
        ref.current.setSelectionRange(selection[0], selection[1]);
    }
    /***************************************************************/
    return (
        <textarea
            ref={ref}
            id="input-box"
            onFocus={handleOnFocus}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onMouseUp={handleMouseUp}
            onClick={handleMouseUp}
            value={makeString()}
            className='input-box'>
        </textarea>
    );
}

export default InputBox;
/***************************************************************/