class ChangeManager{
    constructor() {
        this.changes = {};
        this.current_id = 0; 
    }

    addChange(ch){
        const id = this.current_id; 
        this.changes[id] = ch; 
        this.current_id++; 
        return id; 
    }

    getChange(id){
        return this.changes[this.current_id];
    }

    deleteChange(id){
        this.changes[id] = null; 
    }

    clearChanges(){
        this.changes = {};
    }

    getChanges(){
        return this.changes;
    }

    clone(){
        const temp = new ChangeManager();
        temp.current_id = this.current_id; 
        Object.keys(this.changes).forEach((k) => {
            const isIterable = typeof this.changes[k] === 'object' && this.changes[k] !== null; 
            temp.changes[k] = isIterable? {...this.changes[k]} : this.changes[k]; 

        });

        return temp; 
    }
}

export default ChangeManager;
