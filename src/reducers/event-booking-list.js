const removeEvent = (items, id) => {
    return items.filter((item) => item.id !== id)
}



const updateEvent = (state, updateEvent) => {

    const {eventBookingList: {events}} = state
    // console.log("@@@_EVENTS--- ", events)
    const event = events.find(({id}) => id === updateEvent.id)
    const eventIndex = events.findIndex(({id}) => id === updateEvent.id)
    console.log(eventIndex);
    console.log("@@@_EVENT--- ",
        {
            ...event,
            start: updateEvent.start,
            end:updateEvent.end,
            curDay: updateEvent.curDay,
            startVal: updateEvent.startVal,
            endVal:updateEvent.endVal
        })

    const updatedItem =  {
        ...event,
        start: updateEvent.start,
        end:updateEvent.end,
        curDay: updateEvent.curDay,
        startVal: updateEvent.startVal,
        endVal:updateEvent.endVal
    }


    return [
        ...events.slice(0, eventIndex),
        updatedItem,
        ...events.slice(eventIndex + 1)
    ]
}

/*const updateEventItems = (eventItems, item, idx) => {
   /!* if (item.count === 0) {
        return [
            ...eventItems.slice(0, idx),
            ...eventItems.slice(idx + 1)
        ]
    }
    if (idx === -1) {
        return [
            ...eventItems,
            item
        ]
    }*!/
    return [
        ...eventItems.slice(0, idx),
        item,
        ...eventItems.slice(idx + 1)
    ]

}*/



const updateEvents = (state, updateEvent)=>{

}
const updateEventBookingList = (state, action) => {
    if (state === undefined) {
        return {
            events: [],
            loading: true,
            error: null,
        }
    }
    switch (action.type) {
        case 'FETCH_EVENTS_REQUEST':
            return {
                events: [],
                loading: true,
                error: null,
            }

        case 'FETCH_EVENTS_SUCCESS':
            return {
                events: action.payload,
                loading: false,
                error: null,
            }

        case 'FETCH_EVENTS_FAILURE':
            return {
                events: [],
                loading: false,
                error: action.payload,
            }

        case 'EVENT_ADDED_TO_CALENDAR':
            return {
                events: [...state.eventBookingList.events,
                    action.payload],
                loading: false,
                error: null,
            }

        case 'EVENT_REMOVE_FROM_CALENDAR':
            return {
                events: removeEvent(state.eventBookingList.events, action.payload),
                loading: false,
                error: null,
            }
        case 'EVENT_UPDATE_FROM_CALENDAR':
           return {
               events: updateEvent(state, action.payload)
           }
            /*return {
                events: removeEvent(state.eventBookingList.events, action.payload),
                loading: false,
                error: null,
            }*/
        default:
            return state.eventBookingList
    }
}


export default updateEventBookingList