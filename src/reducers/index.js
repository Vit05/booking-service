import updateEventBookingList from "./event-booking-list";
// import eventAddedToCalendar from "./event-booking-events";

const initialState = {

    eventBookingList: {
        events: [],
        loading: true,
        error: null
    }

}



const reducer = (state, action) => {

    return {
        eventBookingList: updateEventBookingList(state, action),

        // eventBookingList: updateEventBookingList(state, action),
    }


}

export default reducer