const utils = {
    "make_backend": (uri) => {
        return "http://localhost:5000" + uri
    },
    "uriFriendString": (str) => {
        return str.toLowerCase().split(" ").join("_");
    }
};

const capitalize =  (w) => {
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

const makePathName = (variables) => {
    const temp = ["temp", ...variables].join('.');
    return temp;
}

const uriFriendlyString = utils.uriFriendString;

export {
    utils, 
    capitalize, 
    processStyleName,
    processFontName,
    makePathName,
    uriFriendlyString
};