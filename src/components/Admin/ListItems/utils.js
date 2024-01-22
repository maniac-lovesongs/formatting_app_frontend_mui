import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import LayersIcon from '@mui/icons-material/Layers';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import PeopleIcon from '@mui/icons-material/People';

const fontItem = {"icon": FormatSizeIcon, "text": "Fonts"};
fontItem["sublist"] = [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}];
const userItem = {"icon": PersonIcon, "text": "Users"};
userItem["sublist"] = [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}];
const roleItem = {"icon": PeopleIcon, "text": "Roles"};
roleItem["sublist"] = [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}];
const templateItem = {"icon": LayersIcon, "text": "Templates"}
templateItem["sublist"] = [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}];
const listItems = [fontItem, userItem, roleItem, templateItem];
export {listItems};