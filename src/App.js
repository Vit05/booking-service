import React, {Component} from 'react';
import Calendar from "./components/calendar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



class App extends Component {

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            },
            main: {
                marginTop: theme.spacing(8),
                marginBottom: theme.spacing(2),
            },
            footer: {
                padding: theme.spacing(3, 2),
                marginTop: 'auto',
                backgroundColor:
                    theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            },
        }));
        return (
            <div className={useStyles.root}>
                <Container component="main" maxWidth="md" className={useStyles.main}>
                    <Calendar/>

                </Container>
                <footer className={useStyles.footer}>
                    <Container maxWidth="sm">
                        <Typography variant="body1">My sticky footer can be found here.</Typography>
                    </Container>
                </footer>
            </div>
        );
    }
}

export default App;
