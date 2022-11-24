import {
    AppBar,
    Box,
    Button, Container,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem, ListItemButton,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from "next/link";
import MenuItems from "../../../interfaces/menuItems";
import React from "react";
import ScrollToColor from "../../../components/ScrollToColor/ScrollToColor";


type Props = {
    title: string,
    menuItems: MenuItems[],
    window?: () => Window;
}

const drawerWidth = 240;

const Header = ({title, menuItems, window}: Props) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle}
             sx={{textAlign: 'center'}}>
            <Container>

            </Container>
            <Typography variant="h6"
                        sx={{my: 2}}>
                {title.toUpperCase()}
            </Typography>
            <Divider/>
            <List>
                {menuItems.map((menuItem: MenuItems, index) => (
                    <ListItem key={index}
                              disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}}>
                            <Link underline={'none'}
                                  component={NextLink}
                                  href={menuItem.link}>{menuItem.menuTitle.charAt(0).toUpperCase() + menuItem.menuTitle.slice(1)}</Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            <ScrollToColor>
                <AppBar component="nav" >
                    <Container maxWidth={'xl'}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{mr: 2, display: {sm: 'none'}}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant={'h6'}
                                        sx={{flexGrow: 1}}>
                                <Link color={'white'}
                                      component={NextLink}
                                      href="/"
                                      underline="none">
                                    {title.toUpperCase()}
                                </Link>
                            </Typography>

                            <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                                {menuItems.map((menuItem: MenuItems, index) => (
                                    <Button key={index}
                                            href={menuItem.link}
                                            component={NextLink}
                                            sx={{color: '#fff', textTransform: 'none'}}>
                                        {menuItem.menuTitle.charAt(0).toUpperCase() + menuItem.menuTitle.slice(1)}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ScrollToColor>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default Header;