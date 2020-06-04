import _ from "lodash"

const getDayEvents = (events, day) => {
    let currentDay = [day]

    const filteredArray = events.filter(function (itm) {
        return currentDay.indexOf(itm.curDay) > -1;
    });


    let schedule;
    const freeTimes = []


    for (let ob = 0; ob < filteredArray.length; ob++) {
        freeTimes.push(filteredArray[ob].start, filteredArray[ob].end)
    }
    const sortedArray = freeTimes.sort((a, b) => a.valueOf() - b.valueOf())
    let countEl = sortedArray.length


    let finishArray;
    const setStartSchedule = new Date(day).setHours(10, 0, 0)
    const setEndSchedule = new Date(day).setHours(20, 0, 0)


    if (sortedArray[0] && sortedArray[0].getHours() === 10) {
        sortedArray.shift()
    } else {
        sortedArray.unshift(new Date(setStartSchedule))
    }

    if (sortedArray[countEl] && sortedArray[countEl].getHours() === 20) {
        sortedArray.pop()
    } else {
        sortedArray.push(new Date(setEndSchedule))
    }

    let unique = [...new Set(sortedArray)];

    return unique
}

const getFreeTimes = (times) => {
    if (times[times.length - 1].valueOf() === times[times.length - 2].valueOf()) {
        times.length = times.length - 2
    }
    let finish = []
    for (let i = 0; i < times.length; i += 2) {
        finish.push({
            start: times[i].valueOf(),
            end: times[i + 1].valueOf()
        })

    }
    return finish
}


const updateCurrentDayEvents = (state, action) => {
    if (state === undefined) {
        return {
            currentDayEvents: [],
            daySchedule: []
        }
    }
    switch (action.type) {


        case 'FETCH_DAY_EVENTS_SUCCESS':
            const curDayEvents = getDayEvents(state.eventBookingList.events, action.currentDay)
            const curFreeTimes = getFreeTimes(curDayEvents)

            return {
                currentDayEvents: curDayEvents,
                daySchedule: curFreeTimes
            }

        default:
            return state.dayEvents
    }
}


export default updateCurrentDayEvents