import { observerManager } from "../AppManager/managers.js";

class InstaCharacterModel{
    /***************************************************************************/
    constructor(id, font, value, style, pos, currentData) {
        this.id = id; 
        this.font = currentData? currentData.font : font; 
        this.value = value; 
        this.style = currentData? currentData.style : style; 
        this.symbol = (currentData && currentData.characters[value])? currentData.characters[value].symbol : value;
        this.length = this.symbol.length;
        this.starting_pos = pos;
        this.next_pos = pos + this.length; 
        this.leaves = [];
    }
    /***************************************************************************/
    write() {
        return this.symbol;
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