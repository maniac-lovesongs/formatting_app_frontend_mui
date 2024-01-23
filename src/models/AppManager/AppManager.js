import observerManager from "./ObserverManager";
import {History, historyManager} from "../History/HistoryManager";
import InstaStringModel from "../InstaString/InstaStringModel";

class AppManager{
    /**************************************************************/
    constructor() {
        this.history = new History();
        
        this.string = new InstaStringModel();
        this.defaults = {
            "font": "Sans Serif",
            "style": "normal",
            "selectedText": null,
            "bold": false, 
            "italic": false, 
            "availableStyles": {"bold": true, "italic": true, "normal": true, "bold italic": true}
        };

        this.state = {};
        this.initState();

        this.currentData = null; 
        
        this.panels = {
            'font picker': false
        };
        this.modes = {
            'list': false,
        }
        this.clipboard = null; 

        // take a snapshot of the initial state
        //this.addToHistory("init");
        historyManager.snapshot("init", this.snapshot());
    }
    /**************************************************************/
    initState() {
        const that = this;
        Object.keys(this.defaults).forEach((k) => {
            const temp = that.defaults[k];
            that.state[k] = temp;
        });
    }
    /**************************************************************/
    setStyleBasic(s){
        this.state.style = s; 
        observerManager.notify(["style"]);
    }
    /**************************************************************/
    setCurrentData(c){
        this.currentData = c; 
        this.state.style = c.style;
        this.state.bold = c.styleInfo.isBold;
        this.state.italic = c.styleInfo.isItalic; 
        this.state.font = c.font;

        const styles = Object.keys(this.state.availableStyles);
        for(let i = 0; i < styles.length; i++){
            const st = styles[i];
            this.state.availableStyles[st] = c.availableStyles.includes(st);
        }
        console.log("In AppManager");
        console.log(this.currentData);
        console.log(this.state);

        if (this.string.cursor[0] !== this.string.cursor[1]){
            console.log("A selection was made!");
            console.log(this.string.cursor);
            console.log(c);
            this.string.editSelection(this.state.font,
                this.state.style, c);
        }

        observerManager.notify(["currentData","string"]);
    }
    /**************************************************************/
    setFontBasic(f){
        this.state.font = f; 
        
        observerManager.notify(["font"]);
    }

    /**************************************************************/
    /* Getters                                                    */
    /**************************************************************/
    getSelectedText() {
        return this.state.selectedText;
    }
    /**************************************************************/
    getFont() {
        return this.state.font; 
    }
    /**************************************************************/
    getStyle() {
        return this.state.style;
    }
    /**************************************************************/
    getIsBold() {
        return this.state.bold; 
    }
    /**************************************************************/
    getIsItalic() {
        return this.state.italic; 
    }
    /**************************************************************/
    getAvailableStyles() {
        return this.state.availableStyles;
    }
    /**************************************************************/
    getString() {
        return this.string.string; 
    }
    /**************************************************************/
    getPanel(panel) {
        return this.panels[panel];
    }
    /**************************************************************/
    getState() {
        return this.state;
    }
    /**************************************************************/
    getDefaults() {
        return this.defaults;
    }
    /**************************************************************/
    getClipboard(){
        return this.clipboard;
    }
   /**************************************************************/
   getUriFriendlyStyle(){
        return this.state.style.split(" ").join("_");
    }
    /**************************************************************/
    getUriFriendlyFont(){
        return this.state.font.toLowerCase().split(" ").join("_");
    }
    /**************************************************************/
    getCurrentData(){
        return {...this.currentData, 
            "uriFriendlyStyle": this.getUriFriendlyStyle(), 
            "uriFriendlyFont": this.getUriFriendlyFont()};
    }

    /**************************************************************/
    /* String                                                    */
    /**************************************************************/
    insertLineBreak(pos){
        const instaChar =
        this.string.insertLineBreak(pos);
            
        //this.addToHistory("inserted character");
        historyManager.snapshot("inserted line break", this.snapshot());
        observerManager.notify(["string", "history", "string.cursor"]);
        return instaChar;       
    }
    /**************************************************************/
    insertSingleCharacter(ch, pos) {
        const instaChar =
            this.string.insertSingleCharacter(this.getFont(),
                this.getStyle(),ch, pos, this.currentData);

        //this.addToHistory("inserted character");
        historyManager.snapshot("inserted character", this.snapshot());
        observerManager.notify(["string", "history", "string.cursor"]);
        return instaChar;
    }
    /**************************************************************/
    insertFromPaste(str) {
        this.string.paste(str,false, this.currentData);
        this.selectionMade = this.string.cursor[0] !== this.string.cursor[1]; 
        //this.addToHistory("paste");
        historyManager.snapshot("paste", this.snapshot());
        observerManager.notify(["string", "history", "string.cursor"]);
    }
    /**************************************************************/
    deleteCharacter(pos) {
        const instaChar = this.string.deleteCharacter(pos);
        //this.addToHistory("character deleted");
        historyManager.snapshot("character deleted", this.snapshot());
        observerManager.notify(["string", "history", "string.cursor"]);
        return instaChar;
    }
    /**************************************************************/
    deleteSelection() {
        this.string.deleteSelection();
        this.selectionMade = false;
        //this.addToHistory("selection deleted");
        historyManager.snapshot("selection deleted", this.snapshot());
        observerManager.notify(["string", "history", "string.cursor"]);
    }
    /**************************************************************/
    deleteAll() {
        this.string.deleteAll();
        this.selectionMade = this.string.cursor[0] !== this.string.cursor[1]; 
        //this.addToHistory("delete all");
        historyManager.snapshot("delete all", this.snapshot());
        observerManager.notify(["string", "history"]);
    }
    /**************************************************************/
    /* Setters                                                    */
    /**************************************************************/
    setSelectedText(t) {
        this.state.selectedText = t; 
        observerManager.notify("state.current.selectedText");
    }
    /**************************************************************/
    setStyle(b, i, clicked) {
        let s = "normal";
        let bold = this.state.bold;
        let italic = this.state.italic; 

        const availableStyles = this.getAvailableStyles();
        if (b && !i && availableStyles["bold"]) {
            s = "bold"
            bold = b;
            italic = i; 
        }
        else if (!b && i && availableStyles["italic"]) {
            s = "italic"
            bold = b; 
            italic = i; 
        }
        else if (b && i && availableStyles["bold italic"]) {
            s = "bold italic";
            bold = b; 
            italic = i; 
        }
        else if (b && i && !availableStyles["bold italic"]) {
            if (clicked === "bold") {
                s = "bold";
                bold = true; 
                italic = false; 
            }
            else if (clicked === "italic") {
                s = "italic";
                bold = false; 
                italic = true; 
            }

        }
        else if (!b && !i) {
            s = "normal";
            bold = b; 
            italic = i; 
        }

        this.state.style = s; 
        this.state.bold = bold;
        this.state.italic = italic;

        if (this.string.cursor[0] !== this.string.cursor[1]) 
            this.string.editSelection(this.state.font,
                this.state.style);
        

        //this.addToHistory("style changed");
        historyManager.snapshot("style changed", this.snapshot());
        observerManager.notify(["state", "string", "history"]);
    }
    /**************************************************************/
    setFont(f) {
        this.state.font = f; 
        this.state.style = f === "Serif" ? "bold" : "normal";
        this.state.availableStyles = this.getAvailableStyles();

        if (this.string.cursor[0] !== this.string.cursor[1]) 
            this.string.editSelection(this.state.font,
                this.state.style);
        

        //this.addToHistory("font change");
        historyManager.snapshot("font change", this.snapshot());
        observerManager.notify(["state", "string", "history"]);
    }    
    /**************************************************************/
    setCursor(start, end) {
        const data = this.string.setCursor(start, end);
        this.selectionMade = start !== end; 
        observerManager.notify(["string",
            "string.cursor",
            "selectionMade",
            "string.substring"]);
    }
    /**************************************************************/
    setPanelOpen(panel) {
        this.panels[panel] = true; 
        observerManager.notify(['panels']);
    }
    /**************************************************************/
    setPanelClosed(panel) {
        this.panels[panel] = false; 
        observerManager.notify(["panels"]);
    }
    /**************************************************************/
    setClipboard(clipboard) {
        this.clipboard = clipboard;
        observerManager.notify(["clipboard"]);
    }

    /**************************************************************/
    /* History                                                    */
    /**************************************************************/
    snapshot() {
        return {
            string: this.string.snapshot(),
            state: {...this.state}
        }
    }
    /**************************************************************
    addToHistory(action) {
        const snapshot = this.snapshot();
        this.history.addAction({
            action: action,
            snapshot: { ...snapshot }
        });
    }
    /**************************************************************/
    doRedo() {
        const snapshot = this.history.redo().snapshot;
        this.string.setFromSnapshot(snapshot.string);
        this.state.setFromSnapshot(snapshot.state);

        observerManager.notify(["state", "history", "string"]);
    }
    /**************************************************************/
    doUndo() {
        const snapshot = this.history.undo().snapshot;
        this.string.setFromSnapshot(snapshot.string);
        this.state.setFromSnapshot(snapshot.state);

        observerManager.notify(["state", "history", "string"]);
    }
    
}

const appManager = new AppManager();
export default appManager;