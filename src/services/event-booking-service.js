export default class EventBookingService {

    data = [
        {
            id: "iddd21",
            title: "Manicure",
            start: new Date(2020, 4, 25, 17, 0, 0),
            end: new Date(2020, 4, 25, 18, 0, 0),
            startVal: new Date(2020, 4, 25, 17, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 25, 18, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 25, 0, 0, 0).valueOf(),

            desc: "some description",
        },
        {
            id: "iddd22",
            title: "Manicure 2",
            start: new Date(2626, 4, 26, 10, 0, 0),
            end: new Date(2626, 4, 26, 11, 0, 0),
            startVal: new Date(2626, 4, 26, 10, 0, 0).valueOf(),
            endVal: new Date(2626, 4, 26, 11, 0, 0).valueOf(),
            curDay: new Date(2626, 4, 26, 0, 0, 0).valueOf(),

            desc: "some description",
        },
        {
            id: "iddd23",
            title: "Manicure 1",
            start: new Date(2020, 4, 28, 12, 0, 0),
            end: new Date(2020, 4, 28, 13, 0, 0),
            startVal: new Date(2020, 4, 28, 12, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 28, 13, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 28, 0, 0, 0).valueOf(),

            desc: "some description 3",
        }, {
            id: "iddd25",
            title: "Manicure 2",
            start: new Date(2020, 4, 28, 14, 0, 0),
            end: new Date(2020, 4, 28, 15, 0, 0),
            startVal: new Date(2020, 4, 28, 14, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 28, 15, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 28, 0, 0, 0).valueOf(),

            desc: "some description 3",
        }, {
            id: "iddd26",
            title: "Manicure 3",
            start: new Date(2020, 4, 29, 10, 0, 0),
            end: new Date(2020, 4, 29, 11, 0, 0),
            startVal: new Date(2020, 4, 29, 10, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 29, 11, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 29, 0, 0, 0).valueOf(),

            desc: "some description 3",
        }, {
            id: "iddd27",
            title: "Manicure 4",
            start: new Date(2020, 4, 29, 17, 0, 0),
            end: new Date(2020, 4, 29, 18, 0, 0),
            startVal: new Date(2020, 4, 29, 17, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 29, 18, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 29, 0, 0, 0).valueOf(),

            desc: "some description 3",
        },
        {
            id: "iddd28",
            title: "Manicure 45",
            start: new Date(2020, 4, 22, 15, 0, 0),
            end: new Date(2020, 4, 22, 16, 0, 0),
            startVal: new Date(2020, 4, 22, 15, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 22, 16, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 22, 0, 0, 0).valueOf(),

            desc: "some description 3",
        },
        {
            id: "iddd29",
            title: "barber",
            start: new Date(2020, 4, 27, 15, 0, 0),
            end: new Date(2020, 4, 27, 16, 0, 0),
            startVal: new Date(2020, 4, 27, 15, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 27, 16, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 27, 0, 0, 0).valueOf(),

            desc: "some description barber",
        },
        {
            id: "iddd30",
            title: "Manicure Pedicure",
            start: new Date(2020, 4, 27, 11, 0, 0),
            end: new Date(2020, 4, 27, 12, 0, 0),
            startVal: new Date(2020, 4, 27, 11, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 27, 12, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 27, 0, 0, 0).valueOf(),

            desc: "some description barber",
        },

    ]

    getEvents() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (Math.random() > 0.75) {
                    reject(new Error('Some error !!!'))
                } else {
                    resolve(this.data)
                }
            }, 900)
        })
    }
}