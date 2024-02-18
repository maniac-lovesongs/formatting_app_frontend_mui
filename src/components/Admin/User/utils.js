    /***************************************************************/
    const saveResetHelper = {
        "makeSaveMessage":() => {
            return (<span> Save changes to users?</span>)
        },
        "makeResetMessage": () => {
            return (<span>Reset users?</span>)
        },
        "makeSaveSuccessMessage": (s,f) => {
            return (<span> You have successfully saved changes to users.</span>)}
        ,
        "makeResetSuccessMessage": (s,f) => {
            return (<span> You have successfully reset users.</span>)
        },
    }

    export {saveResetHelper};