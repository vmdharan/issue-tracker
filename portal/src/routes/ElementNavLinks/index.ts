import IconMapper from 'helpers/IconMapper';
import SchemaService from 'services/schema';

import * as styles from 'components/organisms/SideNav/index.module.scss';

const ElementNavLinks = SchemaService.GetNavLinks().map((item) => ({
    ...item,
    icon: IconMapper({
        iconName: item.icon,
        iconClassName: styles['side-nav-icon'],
    }),
}));

export default ElementNavLinks;
