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
        daySchedule:[
            {
                startVal:"10",
                endVal: "11"
            },
            {
                startVal:"11",
                endVal: "12"
            },
            {
                startVal:"12",
                endVal: "13"
            },
            {
                startVal:"13",
                endVal: "14"
            },
            {
                startVal:"14",
                endVal: "15"
            },
            {
                startVal:"15",
                endVal: "16"
            },
            {
                startVal:"16",
                endVal: "17"
            },
            {
                startVal:"17",
                endVal: "18"
            },
            {
                startVal:"18",
                endVal: "19"
            },
            {
                startVal:"19",
                endVal: "20"
            },

        ]
    }
    // currentDayEvents: []

}



const reducer = (state, action) => {

    return {
        eventBookingList: updateEventBookingList(state, action),
        dayEvents: updateCurrentDayEvents(state, action),

        // eventBookingList: updateEventBookingList(state, action),
    }


}

export default reducer