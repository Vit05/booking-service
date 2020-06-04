import updateEventBookingList from "./event-booking-list";
import updateCurrentDayEvents from "./day-events";

const initialState = {

    eventBookingList: {
        events: [],
        loading: true,
        error: null
    },
    dayEvents: {
        currentDayEvents: [],
        daySchedule:[]
    }
}



const reducer = (state, action) => {

    return {
        eventBookingList: updateEventBookingList(state, action),
        dayEvents: updateCurrentDayEvents(state, action),
    }


}

export default reducer