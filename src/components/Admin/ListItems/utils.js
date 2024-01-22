import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import LayersIcon from '@mui/icons-material/Layers';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import PeopleIcon from '@mui/icons-material/People';

const listItems = [
    {"icon": FormatSizeIcon, 
    "text": "Fonts", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}]},
    {"icon": PersonIcon, 
    "text": "Users", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}]},,
    {"icon": PeopleIcon, 
    "text": "Roles", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}]},,
    {"icon": LayersIcon, 
    "text": "Templates", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}]},
];

export {listItems};