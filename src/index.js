import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import blue from '@material-ui/core/colors/blue';


import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"
import ErrorBoundry from "./components/error-boundry";
import EventBookingService from "./services/event-booking-service";
import {EventBookingServiceProvider} from "./components/event-booking-service-context";
import store from "./store";

const eventBookingService = new EventBookingService()

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});
ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            {/*<MuiThemeProvider theme={theme}>*/}

                <EventBookingServiceProvider value={eventBookingService}>
                    <App/>
                </EventBookingServiceProvider>
            {/*</MuiThemeProvider>*/}
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root'));
