import React from 'react';
import Calendar from "../components/calendar/calendar";
import {withRouter} from 'react-router-dom'

const CalendarPage = ({history}) => {

    return (
        <Calendar/>
    )
}

export default withRouter(CalendarPage);