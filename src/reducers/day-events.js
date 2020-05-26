const getDayEvents = (events, day) => {
    let currentDay = [day]

    const filteredArray = events.filter(function (itm) {
        return currentDay.indexOf(itm.curDay) > -1;
    });

    return filteredArray
}

const getFreeEvents = (daySchedule, dayEvents) => {
    const props = ['startVal', 'endVal'];

    var result = daySchedule.filter(function (o1) {
        return !dayEvents.some(function (o2) {
            return o1.startVal === o2.startVal;
        });
    }).map(function (o) {
        return props.reduce(function (newo, name) {
            newo[name] = o[name];
            return newo;
        }, {});
    });

    return result
}


const updateCurrentDayEvents = (state, action) => {
    if (state === undefined) {
        return {
            currentDayEvents: [],
            daySchedule: [
                {
                    startVal: "10",
                    endVal: "11"
                },
                {
                    startVal: "11",
                    endVal: "12"
                },
                {
                    startVal: "12",
                    endVal: "13"
                },
                {
                    startVal: "13",
                    endVal: "14"
                },
                {
                    startVal: "14",
                    endVal: "15"
                },
                {
                    startVal: "15",
                    endVal: "16"
                },
                {
                    startVal: "16",
                    endVal: "17"
                },
                {
                    startVal: "17",
                    endVal: "18"
                },
                {
                    startVal: "18",
                    endVal: "19"
                },
                {
                    startVal: "19",
                    endVal: "20"
                },

            ]
        }
    }
    switch (action.type) {


        case 'FETCH_DAY_EVENTS_SUCCESS':
            const curDayEvents = getDayEvents(state.eventBookingList.events, action.currentDay)
            const freeEvents = getFreeEvents(action.daySchedule, curDayEvents)
            // console.log("DAY EVENTS---", curDayEvents);
            // console.log("FREE EVENTS---", freeEvents);

            return {
                currentDayEvents: curDayEvents,
                daySchedule: freeEvents
            }

        /*case 'FETCH_DAY_EVENTS_FREE_SUCCESS':

            return daySchedule*/

        default:
            return state.dayEvents
    }
}


export default updateCurrentDayEvents