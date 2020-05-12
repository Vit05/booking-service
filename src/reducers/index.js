import updateEventBookingList from "./event-booking-list";

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
    }


}

export default reducer