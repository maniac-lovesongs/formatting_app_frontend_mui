const capitalize = (w) => {
    return w.charAt(0).toUpperCase() + w.slice(1);
}
const processFontName = (n) => {
    return n.split("_").map((word) => {
        return capitalize(word);
    }).join(" ");
}

const processStyleName = (n) => {
    return capitalize(n.split("_").join(" "));
}
    /***************************************************************/
    const deleteHelper = {
        "makeSuccessMessage": (s,f) => {
            return (<span> You are about to delete all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. Are you sure you 
            want to do this?</span>)
        },
        "makeMesssage": (s,f) => {
            return (
            <span>
                You are about to delete all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. Are you sure you 
                want to do this?
            </span>);
        },
    };
    /***************************************************************/
    const saveResetHelper = {
        "makeSaveMessage":(s,f) => {
            return (<span> You are about to save all of the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. 
            Are you sure you want to do this?</span>)
        },
        "makeResetMessage": (s,f) => {
            return (<span> You are about to reset the <i>{s}</i> characters of the font <i>{processFontName(f)}</i>. 
            Are you sure you want to do this?</span>)
        },
        "makeSaveSuccessMessage": (s,f) => {
            return (<span> You have successfully saved changes to the the data for the <i>{s}</i> character set of the font <i>{processFontName(f)}</i></span>)}
        ,
        "makeResetSuccessMessage": (s,f) => {
            return (<span> You have successfully reset the data for the <i>{s}</i> character set of the font <i>{processFontName(f)}</i></span>)
        },
    }

export {processFontName, processStyleName, capitalize, deleteHelper, saveResetHelper};