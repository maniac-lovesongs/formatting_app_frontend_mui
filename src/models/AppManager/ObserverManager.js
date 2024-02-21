class ObserverManager{
    constructor() {
        this.listeners = [];
    }

    registerListener(callback) {
        console.log("registering callback");
        console.log(callback);
        this.listeners.push(callback);
        console.log(this.listeners);
        return this.listeners.length - 1; 
    }

    unregisterListener(id) {
        console.log("The id is: " + id);
        this.listeners[id] = null;
        console.log(this.listeners);
    }

    notify(dataChanged) {
        // This handles multiple data changed at the same time.
        const data = Array.isArray(dataChanged) ? dataChanged : [dataChanged];
        const listeners = this.listeners;

        data.forEach((d) => {
            listeners.forEach((listener, i) => {
                if (listener !== null && listener !== undefined)
                    listener(d);
            });
        });
    }
}

const observerManager = new ObserverManager();
export default observerManager;