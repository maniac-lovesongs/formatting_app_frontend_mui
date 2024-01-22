import fontManager from "../InstaFonts/FontManager";

class InstaCharacterModel{
    /***************************************************************************/
    constructor(id, font, value, style, pos) {
        this.id = id; 
        this.font = fontManager.isValidFont(font)? font : fontManager.default.font; 
        this.value = value;
        this.style = fontManager.fontHasStyle(this.font, style) ? style : "normal";
        this.symbol = this.write(); 
        this.length = this.symbol.length; 
        this.starting_pos = pos; 
        this.next_pos = pos + this.length; 
        this.leaves = [];
    }
    /***************************************************************************/
    write() {
        return fontManager.getSymbol(this.font, this.style, this.value);
    }
    /***************************************************************************/
    hashify() {
        return {
            id: this.id, 
            font: this.font, 
            style: this.style, 
            symbol: this.symbol,
            length: this.length, 
            starting_pos: this.starting_pos, 
            ending_pos: this.ending_pos,
            leaves: this.leaves
        }
    }
};

export default InstaCharacterModel;