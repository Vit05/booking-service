import React, {ReactFragment} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";
import './header.scss'

const Navigation = (props) => {
    const {headerClass} = props
    return (
        <List className={headerClass}>
            <ListItem>
                <Typography variant="button" display="block">
                    <Link to="/">Home</Link>
                </Typography>
            </ListItem>
            {/* <ListItem >
                            <Link to="/calendar">Calendar</Link>
                        </ListItem>*/}
            <ListItem>
                <Typography variant="button" display="block">
                    <Link to="/masters">Masters</Link>
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="button" display="block">
                    <Link to="/faq">FAQ</Link>
                </Typography>
            </ListItem>
        </List>
    )
}

const MainDrawer = () => {

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, "left": open});
    };
    return (
        <div>
            <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
                <div
                    className={"nav_list"}
                    role="presentation"
                    onClick={toggleDrawer("left", false)}
                    onKeyDown={toggleDrawer("left", false)}
                >
                    <Navigation headerClass="drawerNavigation"/>

                </div>
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className=""
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer("left", true)}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="caption">
                        AirBeauty
                    </Typography>
                    <Navigation headerClass="headerNavigation"/>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>

    );
}

export default MainDrawer;