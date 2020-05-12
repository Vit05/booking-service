import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"
import ErrorBoundry from "./components/error-boundry";
import EventBookingService from "./services/event-booking-service";
import {EventBookingServiceProvider} from "./components/event-booking-service-context";
import store from "./store";

const eventBookingService = new EventBookingService()
console.log(eventBookingService.getEvents());
ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <MuiThemeProvider>
                <EventBookingServiceProvider value={eventBookingService}>
                    <App/>
                </EventBookingServiceProvider>
            </MuiThemeProvider>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
