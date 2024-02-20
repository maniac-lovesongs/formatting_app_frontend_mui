import {appManager} from "../../models/AppManager/managers.js";
import { apiCall } from "../../utils/apiFunctions.js";
const prepareFont = (f,s, fontDatabase) => {
    const font = fontDatabase.chs[f];
    const currentData = {
        "availableStyles": fontDatabase.allFonts[f].styles, 
        "style": s,
        "font": f,
        "chs": font[s], 
        "characters": font[s],
        "font_id": fontDatabase.allFonts[f].id, 
        "style_id": fontDatabase.allStyles[s].id,
        "styleInfo": fontDatabase.allStyles[s]
    };

    return currentData;
};

const prepareCurrentData = () => {
    const s = appManager.getStyle();
    const f = appManager.getFont();
    let fontDatabase = localStorage.getItem("fontDatabase");
    if(!fontDatabase){
        const uri = "/api/fonts/character_sets/all_sets";
        apiCall(uri, {}, (args, d) => {
            if (d && d.success) {
                const currenData = prepareFont(f,s,d);
                localStorage.setItem("fontDatabase", JSON.stringify(d));
                appManager.setCurrentData(currenData);
            }
        });                
    }
    else{
        fontDatabase = JSON.parse(fontDatabase);
        const font = fontDatabase.chs[f];
        const currentData = prepareFont(f,s,fontDatabase);
        appManager.setCurrentData(currentData);
    }
}

export {prepareFont, prepareCurrentData};