//import fonts from "./fonts.json";
import utils from "../../utils/utils.js";
const fonts = {};
class FontManager{
    /***********************************************************************/
    constructor() {
        //this.validFonts = new Set(Object.keys(fonts));
        this.currentFont = null; 
        this.default = {
            font: "Sans Serif",
            style: "normal",
            bold: false, 
            italic: false
        };
    }
    /***********************************************************************/
    async isValidFont(font) {
       font = font.toLowerCase().split(" ").join("_");
       const link = "/api/fonts/" + font + "/exists";
       const that = this; 
       fetch(utils.make_backend(link)).then((res) =>
            res.json().then((data) => {
                if(data){
                    if(data.exists){
                        that.currentFont = data.font;
                    }
                }
           })
       );      
    }
    /***********************************************************************/
    fontHasStyle(font, style) {
        // does the font have the style requested?
        return this.currentFont && this.currentFont["styles"].includes(style);
    }
    /***********************************************************************/
    fontHasValue(font, style, value) {
        // first check if the value is alphanumeric
        if (/^[a-zA-Z0-9]+$/.test(value))
            return this.fontHasStyle(font, style) && fonts[font]["styles"][style].hasOwnProperty(value);

        return false; 
    }
    /***********************************************************************/
    orderedList() {
        const fList = Object.keys(fonts);
        fList.sort();
        return fList;
    }
    /***********************************************************************/
    getSymbol(font, style, value) {
        //console.log("Font,style,value " + font + "," + style + "," + value);
        if (this.fontHasValue(font, style, value))
            return fonts[font]["styles"][style][value]["symbol"];
        return value; 
    }
    /***********************************************************************/
    getSample(font, style, string) {
        return string.split('').map((c, i) => {
            return this.getSymbol(font, style, c);
        }).join('');
    }
    /**********************************************************************/
    getAvailableStyles(font) {
        const styles = { "bold": null, "italic": null, "bold italic": null, "normal": null };
        
        let that = this;
        ["bold", "italic", "bold italic", "normal"].forEach((style) => {
            styles[style] = that.fontHasStyle(font, style);
        });
        return styles; 
    }
}

const fontManager = new FontManager();
export default fontManager; 