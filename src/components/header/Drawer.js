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
                    <List>
                        <ListItem>
                            <Link to="/">Home</Link>
                        </ListItem>
                        <ListItem >
                            <Link to="/calendar">Calendar</Link>
                        </ListItem>
                        <ListItem >
                            <Link to="/masters">Masters</Link>
                        </ListItem>
                        <ListItem >
                            <Link to="/faq">FAQ</Link>
                        </ListItem>
                    </List>

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
                    <Typography variant="h6" className="">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>

    );
}

export default MainDrawer;