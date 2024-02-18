import { makePathName } from "../../../DisplayTable/utils";
import { appManager } from "../../../../models/AppManager/managers.js";
import { capitalize,  utils } from "../../../../utils/utils.js";
import { handleCharactersChanged } from "./handlers.js";
/***************************************************************/
const uriFriendlyString = utils.uriFriendString;
/***************************************************************/
const makeCharacterSetFromDict = (d) => {
    const chs = [];
    Object.keys(d.chs).forEach((v) => {
        chs.push(d.chs[v]);
    });
    return chs;
}
/***************************************************************/
const initCharacterSet = (d, chs, input, setExistingCharSet, setUsingBase) => {
    if (!input.availableStyles) {
        input.setAvailableStyles(d.availableStyles);
    }

    setExistingCharSet(d.availableStyles.includes(input.style));
    setUsingBase(null);
    appManager.setReset(chs, makePathName(["characterSet", input.style, "editableRows"]));
    handleCharactersChanged(chs,input);
}
/***************************************************************/
const makeTitle = (style) => {
    return style.split(" ").map((c) => {
        return capitalize(c);
    }).join(" ");
}
/***************************************************************/
export {
    uriFriendlyString,
    makeTitle,
    makeCharacterSetFromDict,
    initCharacterSet
};
/***************************************************************/