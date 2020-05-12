const eventsLoaded = (newEvents) => {
    return {
        type: 'FETCH_EVENTS_SUCCESS',
        payload: newEvents
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
        payload: error
    }
}
const fetchEvents = (eventBookingService, dispatch) => () => {
    dispatch(eventsRequested());
    eventBookingService.getEvents()
        .then((data) => dispatch(eventsLoaded(data)))
        .catch((err) => dispatch(eventsError(err)))
}

export {
    fetchEvents
}