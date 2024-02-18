import { makePathName } from "../../../DisplayTable/utils";
import { apiCallPost, apiCall } from "../../../../utils/apiFunctions.js";
import { appManager } from "../../../../models/AppManager/managers.js";
import { uriFriendlyString, makeCharacterSetFromDict } from "./utils.js";
/***************************************************************/
const handleReset = (input) => {
    const resetPath = makePathName(["characterSet", input.style, "editableRows"]);
    const reset = appManager.getReset(resetPath);
    if (reset.resetExists)
        handleCharactersChanged({ ...reset.data },input)
}
/***************************************************************/
const handleAvailableStylesChange = (styles, input, setExistingCharSet) => {
    input.setAvailableStyles(styles);
    setExistingCharSet(styles.includes(input.style));
    if (!styles.includes(input.style)) {
        appManager.setReset(null, makePathName(["characterSet", input.style, "editableRows"]));
        handleCharactersChanged(null,input);
    }
}
/***************************************************************/
const handleCharactersChanged = (changedCharacters,input) => {
    appManager.setTemp(changedCharacters, makePathName(["characterSet",input.style,"editableRows"]));
}
/***************************************************************/
const handleSave = (input,changes,setExistingCharSet, setUsingBase) => {
    const changeData = changes.getChanges();
    const sortedKeys = Object.keys(changeData).sort((a, b) => a - b).reverse();
    console.log(changeData);
   // sortedKeys.forEach((k) => {
    const k = sortedKeys[0]; 
    if (changeData[k].change === "create") {
        handleCreateNewSet(input, changeData[k].data.pairs, setExistingCharSet, setUsingBase);
    }
    else if(changeData[k].change === "update"){
         handleUpdateSet(input,changeData[k].data.pairs, setExistingCharSet, setUsingBase);
    }
   // });
}
/***************************************************************/
const handleCreateNewSet = (input, pairs, setExistingCharSet, setUsingBase) => {
    const tempName = uriFriendlyString(input.fontName);
    const tempStyle = uriFriendlyString(input.style);

    const uri = "/api/fonts/character_sets/create/font/" + tempName + "/style/" + tempStyle;
    const postData = { "pairs": pairs };
    apiCallPost(uri, {}, postData, (args, d) => {
        if (d && d.success) {
            input.setAvailableStyles(d.availableStyles);
            const chs = makeCharacterSetFromDict(d);

            setExistingCharSet(d.availableStyles.includes(input.style));
            setUsingBase(null);

            appManager.setReset(chs, makePathName(["characterSet",input.style,"editableRows"]));
            handleCharactersChanged(chs, input);
        }
    });
}
/***************************************************************/
const handleUpdateSet = (input, pairs, setExistingCharSet, setUsingBase) => {
    const tempName = uriFriendlyString(input.fontName);
    const tempStyle = uriFriendlyString(input.style);

    const uri = "/api/fonts/character_sets/update/font/" + tempName + "/style/" + tempStyle;
    const postData = { "pairs": pairs };
    apiCallPost(uri, {}, postData, (args, d) => {
        if (d && d.success) {
            input.setAvailableStyles(d.availableStyles);
            const chs = makeCharacterSetFromDict(d);

            //setExistingCharSet(d.availableStyles.includes(input.style));
            //setUsingBase(null);
            //appManager.setReset(chs, makePathName(["characterSet",input.style,"editableRows"]));
            //handleCharactersChanged(chs, input);
        }
    });
}
/***************************************************************/
const handleDelete = (e,input,setOpen,handleSuccess, setExistingCharSet) => {
        setOpen(false);
        const s = uriFriendlyString(input.style);
        const uri = "/api/fonts/character_sets/delete/font/" + input.fontName + "/style/" + s;
        apiCall(uri, {}, (args, d) => {
             if(d && d.success){
                 handleAvailableStylesChange(d.availableStyles,input, setExistingCharSet);
                 handleSuccess(true)();
             }
        });
    }
/***************************************************************/
export {
    handleReset,
    handleAvailableStylesChange,
    handleCharactersChanged,
    handleCreateNewSet,
    handleSave,
    handleDelete,
    handleUpdateSet
};