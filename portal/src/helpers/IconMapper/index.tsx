import React from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import CategoryIcon from '@mui/icons-material/Category';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

type IconMapperPropsType = {
    iconName: string;
    iconClassName: string;
};

const IconMapper = (props: IconMapperPropsType) => {
    switch (props.iconName) {
        case 'dashboard':
            return <DashboardIcon className={props.iconClassName} />;
        case 'business':
            return <BusinessIcon className={props.iconClassName} />;
        case 'folder':
            return <FolderIcon className={props.iconClassName} />;
        case 'newspaper':
            return <NewspaperIcon className={props.iconClassName} />;
        case 'category':
            return <CategoryIcon className={props.iconClassName} />;
        case 'label-important':
            return <LabelImportantIcon className={props.iconClassName} />;
        case 'assignment':
            return <AssignmentIcon className={props.iconClassName} />;
        case 'people':
            return <PeopleIcon className={props.iconClassName} />;
        default:
            return;
    }
};

export default IconMapper;
