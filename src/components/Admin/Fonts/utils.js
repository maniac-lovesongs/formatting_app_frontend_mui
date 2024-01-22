/***************************************************************/
const handleFilter = (filteredData, setters ={}) => {
    if(filteredData === null)
        filteredData = fonts; 
    setters["displayedFonts"](filteredData);
    const end = filteredData.length < constants.NUM_PER_PAGE? filteredData.length : constants.NUM_PER_PAGE;
    setters["pageNumber"](0);
    setters["range"]([1,end]);
}
/***************************************************************/
const styleFilterer = (f,styles) => {
    const allStyles = Object.keys(styles);
    for(let i = 0; i < allStyles.length; i++){
        const s = allStyles[i];
        if(styles[s] && !f.styles.includes(s))
            return false; 
    }
    return true;
}
/***************************************************************/
const handleStyleFilter = (e, setters = {}) => {
    const style = e.target.name.trim();
    const checked = e.target.checked;
    let temp_styleFilters = {...styleFilters};
    temp_styleFilters[style] = checked;

    const filtered_data = fonts.filter((f) => {
        return styleFilterer(f,temp_styleFilters);
    });

    setters["displayedFonts"](filtered_data);
    setters["styleFilters"](temp_styleFilters);
};
/***************************************************************/
const handlePageNumberChanged = (pageNumber) => {
    const start = pageNumber*constants.NUM_PER_PAGE + 1;
    const temp = (pageNumber + 1)*constants.NUM_PER_PAGE;
    const end = temp > numElements? numElements : temp; 
    setPageNumber(pageNumber);
    setRange([start,end]);
}
/***************************************************************/