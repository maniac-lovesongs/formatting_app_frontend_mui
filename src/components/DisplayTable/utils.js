const makePathName = (variables) => {
    const temp = ["temp", ...variables].join('.');
    return temp;
}

export { makePathName };