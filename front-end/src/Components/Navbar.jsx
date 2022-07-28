import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../Redux/Auth/actions';
import LogoutIcon from '@mui/icons-material/Logout';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

export const Navbar = () => {

    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link to="/">
                    <ListItemButton>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </Link>
            </List>
            <List>
                <Link to="/grocery">
                    <ListItemButton>
                        <ListItemIcon><FoodBankIcon /></ListItemIcon>
                        <ListItemText primary="Grocery" />
                    </ListItemButton>
                </Link>
            </List>
            <List>
                <Link to="/pharmacy">
                    <ListItemButton>
                        <ListItemIcon><LocalPharmacyIcon /></ListItemIcon>
                        <ListItemText primary="Pharmacy" />
                    </ListItemButton>
                </Link>
            </List>
            <Divider />
            <List>
                {!token?<Link to="/login">
                    <ListItemButton>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                </Link>: ""}
                {token?<ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText onClick={()=>{dispatch(logoutSuccess())}} primary="Logout" />
                </ListItemButton>: ""}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer("left", true)}
                    >
                        <MenuIcon  />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        E-Commerce
                    </Typography>
                    {token ? <Button color="inherit" onClick={() => { dispatch(logoutSuccess()) }}>Logout<LogoutIcon/></Button> : <Link to="/login"><Button color="inherit">  Login  <LoginIcon /></Button></Link>}
                </Toolbar>
            </AppBar>
            <div>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
        </Box>
    );
}

