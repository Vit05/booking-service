const removeEvent = (items, id)=>{
    return items.filter((item)=>item.id !==id)
}

const updateEventBookingList = (state, action) => {
    if (state === undefined) {
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

        case 'EVENT_ADDED_TO_CALENDAR':
            return {
                events: [...state.eventBookingList.events,
                    action.payload],
                loading: false,
                error: null
            }

        case 'EVENT_REMOVE_FROM_CALENDAR':
            console.log(removeEvent(state.eventBookingList.events, action.payload));
            return {
                events: removeEvent(state.eventBookingList.events, action.payload),
                loading: false,
                error: null
            }
        default:
            return state.eventBookingList
    }
}


export default updateEventBookingList