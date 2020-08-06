import HomeIcon from '@material-ui/icons/Home';
import MenuBook from '@material-ui/icons/MenuBook';
import Info from '@material-ui/icons/Info';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';

export const leftNavTabs = [
    {
        path: '/home',
        label: 'common_home',
        Icon: HomeIcon
    },
    {
        path: '/topics',
        label: 'nav_questions',
        Icon: MenuBook
    },
    {
        path: '/information',
        label: 'common_information',
        Icon: Info
    },
    {
        label: 'common_posts',
        path: '/posts',
        Icon: ChromeReaderMode
    }
];
