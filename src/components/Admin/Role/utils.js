    /***************************************************************/
    const saveResetHelper = {
        "makeSaveMessage":() => {
            return (<span> Save changes to roles?</span>)
        },
        "makeResetMessage": () => {
            return (<span>Reset roles?</span>)
        },
        "makeSaveSuccessMessage": (s,f) => {
            return (<span> You have successfully saved changes to roles.</span>)}
        ,
        "makeResetSuccessMessage": (s,f) => {
            return (<span> You have successfully reset roles.</span>)
        },
    }

    export {saveResetHelper};