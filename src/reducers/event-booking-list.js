const updateEventBookingList = (state, action) => {
    if (state === undefined){
        return {
            events: [],
            loading: true,
            error: null
        }
    }
    switch (action.type) {
        case 'FETCH_EVENTS_REQUEST':
            return {
                events: [],
                loading: true,
                error: null
            }

        case 'FETCH_EVENTS_SUCCESS':
            return {
                events: action.payload,
                loading: false,
                error: null
            }

        case 'FETCH_EVENTS_FAILURE':
            return {
                events: [],
                loading: false,
                error: action.payload
            }
        default:
            return state.eventBookingList
    }
}

export default updateEventBookingList