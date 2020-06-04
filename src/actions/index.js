const eventsLoaded = (events) => {
    return {
        type: 'FETCH_EVENTS_SUCCESS',
        payload: events
    }
}


const eventsRequested = () => {
    return {
        type: 'FETCH_EVENTS_REQUEST'
    }
}

const eventsError = (error) => {
    return {
        type: 'FETCH_EVENTS_FAILURE',
        payload: error.message
    }
}

const fetchEvents = (eventBookingService, dispatch) => () => {
    dispatch(eventsRequested());
    eventBookingService.getEvents()
        .then((data) => dispatch(eventsLoaded(data)))
        .catch((err) => dispatch(eventsError(err)))
}


export const eventAddedToCalendar = (newEvent)=>{
    return {
        type: 'EVENT_ADDED_TO_CALENDAR',
        payload: newEvent
    }
}

export const eventRemoveFromCalendar = (eventId)=>{
    return {
        type: 'EVENT_REMOVE_FROM_CALENDAR',
        payload: eventId
    }
}

export const eventUpdateFromCalendar = (updateEvent)=>{
    return {
        type: 'EVENT_UPDATE_FROM_CALENDAR',
        payload: updateEvent
    }
}

export const dayEventsLoaded = (currentDay) => {
    return {
        type: 'FETCH_DAY_EVENTS_SUCCESS',
        currentDay
    }
}


export {
    fetchEvents
}