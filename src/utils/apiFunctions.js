import utils from "./utils.js";

const apiCall = async (uri, args, callback) => {
    const link = utils.make_backend(uri);
    fetch(link).then((res) =>
        res.json().then((data) => {
            callback(args,data);
        })
    );
}


export { apiCall};