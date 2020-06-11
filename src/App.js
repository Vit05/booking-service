import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    useLocation
} from "react-router-dom";
import Calendar from "./components/calendar";
// import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './main.scss'
import MainDrawer from "./components/header/Drawer"
import MastersPage from "./pages/mastersPage";
import Faq from "./pages/faqPage";
import CalendarPage from "./pages/calendarPage";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default class App extends Component {

    render() {
        // const classes = useStyles();

        return (
            <div className="wrapper">
                <Router>

                    <MainDrawer/>

                    <Container component="main" maxWidth="md" className="main">

                        <Switch>
                            <Route path="/" exact
                                   render={() => <h1>Home page</h1>}
                            />

                            {/*<Route path="/call" exact component={Calendar}/>*/}
                            <Route path="/masters" exact component={MastersPage}/>
                            {/*<Route path="/calendar" exact component={Calendar}/>*/}
                            <Route path="/faq" exact component={Faq}/>
                            <Route path="/master/:id"
                                   render={() => {
                                       return <CalendarPage itemId={1}/>
                                   }}/>

                            <Route render={() => <h2>Page not found</h2>}/>
                        </Switch>
                    </Container>
                </Router>
                <footer className="footer">
                    <Container maxWidth="md">
                        <p>Dev dev dev</p>
                    </Container>
                </footer>
            </div>
        );
    }

}
