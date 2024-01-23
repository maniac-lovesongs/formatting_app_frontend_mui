class History{
    /*******************************************************/
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }
    /*******************************************************/
    init(state) {
        this.undoStack.push(state);
    }
    /*******************************************************/
    snapshot(action, snapshot){
        //const temp = snapshotter();
        this.addAction({
            action: action, 
            snapshot: snapshot
        });
    }
    /*******************************************************/
    addAction(state) {
        this.undoStack.push(state);
        this.redoStack = []; // empty redo stack
    }
    /*******************************************************/
    undo() {
        if (this.canUndo()) {
            // remove the last action that is being undone, 
            // and place it on top of the redo stack
            const lastAction = this.undoStack.pop();
            this.redoStack.push(lastAction);
        }

        // return the new top of the undo stack
        return this.getUndoTop();
    }
    /*******************************************************/
    redo() {
        let actionToRedo = this.getUndoTop();
        if (this.canRedo()) {
            // the action we want to redo is the one on 
            // the top of the stack.
            actionToRedo = this.redoStack.pop();
            this.undoStack.push(actionToRedo);
        }

        return actionToRedo;
    }
    /*******************************************************/
    getUndoTop() {
        return this.undoStack[this.undoStack.length - 1];
    }
    /*******************************************************/
    getRedoTop() {
        return this.redoStack[this.redoStack.length - 1];
    }
    /*******************************************************/
    canUndo() {
        return this.undoStack.length > 1; 
    }
    /*******************************************************/
    canRedo() {
        return this.redoStack.length > 0; 
    }
    /*******************************************************/
}
const historyManager = new History();
export {History, historyManager};