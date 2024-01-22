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

export {processFontName, processStyleName};