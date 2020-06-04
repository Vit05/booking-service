const getAppointmentsFreeTime = (freeSlots, serviceTime )=>{
    const halfHour = 1800000
    // const serviceTime = 3600000 + halfHour

    let freeOptions = [];

    for (let arr = 0; arr < freeSlots.length; arr++) {
        let entitiesCounty = (((freeSlots[arr].end.valueOf() + halfHour) - freeSlots[arr].start.valueOf()) - (halfHour * serviceTime)) / halfHour
        // let freeTimeValues = []
        for (let step = halfHour, i = 0; i < entitiesCounty; i++) {
            freeOptions.push({
                startVal: new Date(freeSlots[arr].start.valueOf() + (i * step)).valueOf(),
                endVal: new Date(freeSlots[arr].start.valueOf() + (i * step) + (halfHour * serviceTime)).valueOf(),
            })
        }

    }
    
    return freeOptions
}

export {getAppointmentsFreeTime}