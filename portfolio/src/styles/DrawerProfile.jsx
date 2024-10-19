import { Box, Paper, Typography, Avatar, Divider, styled, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import ConstructionIcon from '@mui/icons-material/Construction';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ArticleIcon from '@mui/icons-material/Article';

const ProfileImage = styled('div')(({ theme }) => ({
    width: theme.spacing(4),
    '& > *': {
        margin: theme.spacing(0),
    }
}));

const PagesLinks = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon />,
        cName: 'nav-text',
    },
    {
        title: 'Projects',
        path: '/Projects',
        icon: <ConstructionIcon />,
        cName: 'nav-text',
    },
    {
        title: 'Blog',
        path: '/blog',
        icon: <ArticleIcon />,
        cName: 'nav-text',
    },
    {
        title: 'About Me',
        path: '/about',
        icon: <DescriptionIcon />,
        cName: 'nav-text',
    },
    {
        title: 'Contact Me',
        path: '/Contact',
        icon: <ConnectWithoutContactIcon />,
        cName: 'nav-text',
    },
];

export default function DrawerProfile({ toggleDrawer, isMdUp, open }) {
    const image = 'https://i.ibb.co/J3PX4G8/117445059-10157076828901876-5592142922346165348-n.jpg';

    return (
        <>
            <Paper sx={{ p: 2, maxWidth: 250, backgroundColor: '#d7ccc8' }}>
                <Box display="flex" justifyContent="space-between">
                    <Box flexGrow={1}>
                        <Typography gutterBottom variant="h7" component="div" sx={{ p: 2 }}>
                            Ali Ahammad
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            WEB DEVELOPER
                        </Typography>
                    </Box>
                    <ProfileImage>
                        <Avatar alt="Ali Ahammad" src={image} sx={{ width: '100px', height: '100px' }} />
                    </ProfileImage>
                </Box>
            </Paper>
            <Divider />
            <List>
                {PagesLinks.map((item, index) => (
                    <div key={index}>
                        <Link to={item.path}>
                            <ListItem className={item.cName}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        </Link>
                    </div>
                ))}
            </List>
        </>
    );
}
