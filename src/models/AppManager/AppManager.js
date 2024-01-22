import observerManager from "./ObserverManager";

class AppManager{
    /**************************************************************/
    constructor() {
        this.state = {
            "font": null,
            "style": null
        };       
        this.panels = {
            'font picker': false
        };
        this.modes = {
            'list': false,
        }
    }
    /**************************************************************/
    setStyle(s){
        this.state.style = s; 
        observerManager.notify(["style"]);
    }
    /**************************************************************/
    setFont(f){
        this.state.font = f; 
        observerManager.notify(["font"]);
    }
    /**************************************************************/
    getStyle(){
        return this.state.style;
    }
    /**************************************************************/
    getFont(){
        return this.state.font;
    }
    /**************************************************************/
    getUriFriendlyStyle(){
        return this.state.style.split(" ").join("_");
    }
    /**************************************************************/
    getUriFriendlyFont(){
        return this.state.font.toLowerCase().split(" ").join("_");
    }
}

const appManager = new AppManager();
export default appManager;