import InstaCharacterModel from "../InstaCharacter/InstaCharacterModel.js";
import { observerManager } from "../AppManager/managers.js";

/***************************************************************************/
class InstaStringModel {
    constructor() {
        this.string = [];
        this.ch_id = 0;
        this.characterBank = {};
        this.substring = [];
        this.cursor = [0, 0];
    }
    /***************************************************************************/
    editSelection(font, style, currentData = {}) {
        // first remove the selection from the string temporarily 
        const removedSel = this.string.splice(this.cursor[0], this.cursor[1] - this.cursor[0]);

        let temp = [];
        for (let i = 0; i < removedSel.length; i++){
            if (removedSel[i] !== '') {
                const [instaChar, leaves] = this.createCharacter(
                    font,
                    style,
                    removedSel[i].value,
                    this.cursor[0] + i,
                    currentData);
                
                temp.splice(temp.length, 0, ...leaves);
            }
        }

        // Insert the new array where the original selection is
        this.string.splice(this.cursor[0], 0, ...temp);
        this.cursor[1] = this.cursor[0] + temp.length;
    }
    /****************************************************************************/
    paste(str, selection = false, currentData = {}) {
        let temp = [];
        for (let i = 0; i < str.length; i++){
            if (str[i] !== '') {
                const [instaChar, leaves] = this.createCharacter(str[i].font,
                    str[i].style,
                    str[i].value,
                    this.cursor[0] + i);
                
                temp.splice(temp.length, 0, ...leaves);
            }
        }

        const remove = this.getSelectionLength();

        this.string.splice(this.cursor[0], remove, ...temp);
        this.cursor[1] = this.cursor[0] + temp.length; 
    }
    /****************************************************************************/
    getValidPos(pos, direction = "backwards") {
        if (direction === "backwards") {
            const [length, i] = this.findBeg(pos);
            return i;
        }
        else {
            const i = this.findEnd(pos);
            return i;
        }
    }
    /****************************************************************************/
    getCursor() {
        return this.cursor;
    }
    /****************************************************************************/
    setCursor(start, end) {
        this.cursor = [start, end];
        const subarray = this.string.slice(start, end);
        this.substring = subarray;
        observerManager.notify(["string",
            "string.cursor",
            "selectionMade",
            "string.substring"]);
    }
    /****************************************************************************/
    getSelectionMade() {
        return this.cursor[0] !== this.cursor[1];
    }
    /****************************************************************************/
      getString(){
        return this.string; 
    }
    /****************************************************************************/
    getSubstring(cursor = null) {
        if (cursor === null)
            return this.string.substring;
        return this.string.slice(cursor[0], cursor[1]);
    }
    /****************************************************************************/
    getSelectionLength() {
        let remove = 0; 
        if (this.cursor[0] !== this.cursor[1])
            remove = this.cursor[1] - this.cursor[0];

        return remove;
    }
    /****************************************************************************/
    insertLineBreak(pos){
        return this.insertSingleCharacter('Sans Serif', 'normal','\n',pos)
    }
    /****************************************************************************/
    insertSingleCharacter(font, style, ch, pos, currentData) {
        const [instaChar, leaves] = this.createCharacter(font, style, ch, pos, currentData);
        const remove = this.getSelectionLength();
        const newCursorPos = pos + instaChar.length;
        this.cursor = [newCursorPos, newCursorPos];
        this.string.splice(pos, remove, ...leaves);
        this.ch_id++;

        return instaChar;
    }
    /***************************************************************************/
    createCharacter(font, style,ch, pos, currentData) {
        const instaChar = new InstaCharacterModel(this.ch_id,
            font,
            ch,
            style,
            pos,
            currentData);

        let leaves = [];
        for (let i = 0; i < instaChar.length; i++) {
            if (i === 0) leaves.push(instaChar);
            else leaves.push('');
        }
        
        return [instaChar, leaves];
    }
    /***************************************************************************/
    deleteCharacter(pos) {
        // the length of the character at pos
        const [tempLength, tempPos] = this.findBeg(pos);
        const length = tempLength; 
        pos = tempPos; 

        const character = this.string[pos];
        this.cursor = [pos, pos];
        this.string.splice(pos, length);
        return character;
    }
    /***************************************************************************/
    deleteSelection() {
        this.string.splice(this.cursor[0], this.cursor[1] - this.cursor[0]);
        this.cursor[1] = this.cursor[0]; // collapse the selection to a cursor
    }
    /***************************************************************************/
    inMiddleOfChar(pos) {
        return this.string[pos] === '';
    }
    /***************************************************************************/
    findEnd(pos) {
        let i = pos;
        while (this.inMiddleOfChar(i))
            i++;
        return i; 
    }
    /***************************************************************************/
    findBeg(pos) {
        let length = 0;
        let i = pos; 

        while (this.inMiddleOfChar(i)) 
            i--;
                
        length = this.string[i].length; 
        return [length,i];
    }
    /***************************************************************************/
    deleteAll() {
        this.string = [];
        this.cursor = [0, 0];
    }
    /***************************************************************************/
    setFromSnapshot(s) {
        this.string = [...s.string];
        this.cursor = [...s.cursor];
    }
    /***************************************************************************/
    write() {
        const text = this.string.map((v) => {
            return v !== '' ? v.write() : '';
        });
        return text.join('');
    }
    /***************************************************************************/
    snapshot() {
        const s = this.string.map((c) => {
            if (c !== '')
                return c;
            else return '';
        });

        return {
            string: s,
            cursor: this.cursor
        };
    }
}
/***************************************************************************/
export default InstaStringModel;