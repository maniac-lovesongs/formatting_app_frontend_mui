import { makePathName } from "../../DisplayTable/utils";
import { appManager } from "../../../models/AppManager/managers.js";

const makeCharacterSetFromDict = (d) => {
    const chs = [];
    Object.keys(d.chs).forEach((v) => {
        chs.push(d.chs[v]);
    });
    return chs;
}

const initCharacterSet = (d, chs, input) => {
    if (!input.availableStyles) {
        input.setAvailableStyles(d.availableStyles);
    }

    input.setExistingCharSet(d.availableStyles.includes(input.style));
    input.setUsingBase(null);
    appManager.setReset(chs, makePathName(["characterSet",
        input.style,
        "editableRows"]));
    handleCharactersChanged(chs,input);
}


const handleReset = (input) => {
    const resetPath = makePathName(["characterSet", input.style, "editableRows"]);
    const reset = appManager.getReset(resetPath);
    if (reset.resetExists)
        handleCharactersChanged({ ...reset.data },input)
}

const handleAvailableStylesChange = (styles,input) => {
    input.setAvailableStyles(styles);
    input.setExistingCharSet(styles.includes(input.style));
    if (!styles.includes(input.style)) {
        appManager.setReset(null, makePathName(["characterSet",
            input.style,
            "editableRows"]));
        handleCharactersChanged(null,input);
    }
}

const handleCharactersChanged = (changedCharacters,input) => {
    appManager.setTemp(changedCharacters,
        makePathName(["characterSet",
            input.style,
            "editableRows"]));
}

export {
    makeCharacterSetFromDict,
    initCharacterSet,
    handleReset,
    handleAvailableStylesChange,
    handleCharactersChanged
};