import { useState } from 'react'
import { styled, useTheme, useMediaQuery, Drawer, Toolbar, Typography, Divider, IconButton } from '@mui/material'
import MuiAppBar from "@mui/material/AppBar"

import MenuIcon from '@mui/icons-material/Menu'
import DrawerProfile from './DrawerProfile';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 250;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
}));


export default function NavigationBar() {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const [open, setOpen] = useState(false);

    const toggleDrawer = event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(!open);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="fixed" open={open} sx={{ backgroundColor: '#8d6e63' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        My Portfolio
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                
                variant={isMdUp ? "permanent" : "temporary"}

                sx={{
                    
                    position: 'relative',
                    flexShrink: 0,

                    '& .MuiDrawer-paper': {
                        overflowY: 'visible',
                        backgroundColor: '#bcaaa4',
                        width: drawerWidth,

                    },
                }}
                anchor="left"
                open={open}
                onClose={toggleDrawer}
            >
                <DrawerHeader>
                    <IconButton color="primary" sx={{ display: { xs: 'block', md: 'none' } }} onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <DrawerProfile />
            </Drawer>
        </>
    )

}