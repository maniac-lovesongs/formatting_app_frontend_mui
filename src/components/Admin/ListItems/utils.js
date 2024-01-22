import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import LayersIcon from '@mui/icons-material/Layers';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
const listItems = [
    {"icon": DashboardIcon, "text": "Home", "href": "/admin/dashboard"},
    {"icon": FormatSizeIcon, 
    "text": "Fonts", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All", "href": "/admin/fonts/view/all"}, 
    {"icon": AddCircleIcon, "text": "Create New", "href": "/admin/fonts/create"}]},
    {"icon": PersonIcon, 
    "text": "Users", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All", "href": "/admin/users/view/all"}, 
    {"icon": AddCircleIcon, "text": "Create New", "href": "/admin/users/create"}]},,
    {"icon": PeopleIcon, 
    "text": "Roles", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All", "href": "/admin/roles/view/all"}, 
    {"icon": AddCircleIcon, "text": "Create New", "href": "/admin/roles/create"}]},,
    {"icon": LayersIcon, 
    "text": "Templates", 
    "sublist": [{"icon": AllInclusiveIcon, "text": "View All"}, {"icon": AddCircleIcon, "text": "Create New"}]},
];

export {listItems};