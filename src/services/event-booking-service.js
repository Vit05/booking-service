export default class EventBookingService {

    data = [
        {
            id: "iddd37",
            title: "Вадим Велиев",
            start: new Date(2020, 5, 2, 12, 0, 0),
            end: new Date(2020, 5, 2, 13, 0, 0),
            startVal: new Date(2020, 5, 2, 12, 0, 0).valueOf(),
            endVal: new Date(2020, 5, 2, 13, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 2, 0, 0, 0).valueOf(),
            desc: {value: "hair_cut", text: "Стрижка", time: 2}
        },
        {
            id: "iddd41",
            title: "Алиса Алисова",
            start: new Date(2020, 5, 2, 15, 0, 0),
            end: new Date(2020, 5, 2, 16, 0, 0),
            startVal: new Date(2020, 5, 2, 15, 0, 0).valueOf(),
            endVal: new Date(2020, 5, 2, 16, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 2, 0, 0, 0).valueOf(),
            desc: {value: "hair_cut", text: "Стрижка", time: 2}
        },
        {
            id: "iddd40",
            title: "Алиса Городецкая",
            start: new Date(2020, 5, 1, 10, 0, 0),
            end: new Date(2020, 5, 1, 12, 30, 0),
            startVal: new Date(2020, 5, 1, 10, 0, 0).valueOf(),
            endVal: new Date(2020, 5, 1, 12, 30, 0).valueOf(),
            curDay: new Date(2020, 5, 1, 0, 0, 0).valueOf(),
            desc: {value: "manicure", text: "Маникюр", time: 5}
        },

        {
            id: "iddd77",
            title: "Алиса Городецкая",
            start: new Date(2020, 5, 1, 13, 30, 0),
            end: new Date(2020, 5, 1, 16, 0, 0),
            startVal: new Date(2020, 5, 1, 13, 30, 0).valueOf(),
            endVal: new Date(2020, 5, 1, 16, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 1, 0, 0, 0).valueOf(),
            desc: {value: "manicure", text: "Маникюр", time: 5}
        },
        {
            id: "iddd78",
            title: "Алиса Городецкая",
            start: new Date(2020, 5, 1, 17, 30, 0),
            end: new Date(2020, 5, 1, 20, 0, 0),
            startVal: new Date(2020, 5, 1, 17, 30, 0).valueOf(),
            endVal: new Date(2020, 5, 1, 20, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 1, 0, 0, 0).valueOf(),
            desc: {value: "manicure", text: "Маникюр", time: 5}
        },
        {
            id: "iddd43",
            title: "Алиса Городецкая",
            start: new Date(2020, 5, 3, 18, 0, 0),
            end: new Date(2020, 5, 3, 20, 0, 0),
            startVal: new Date(2020, 5, 3, 18, 0, 0).valueOf(),
            endVal: new Date(2020, 5, 3, 20, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 3, 0, 0, 0).valueOf(),
            desc: {value: "manicure", text: "Маникюр", time: 5}
        }, {
            id: "iddd83",
            title: "Алиса Городецкая",
            start: new Date(2020, 5, 5, 10, 0, 0),
            end: new Date(2020, 5, 5, 11, 0, 0),
            startVal: new Date(2020, 5, 5, 10, 0, 0).valueOf(),
            endVal: new Date(2020, 5, 5, 11, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 5, 0, 0, 0).valueOf(),
            desc: {value: "manicure", text: "Маникюр", time: 5}
        },
        {
            id: "iddd44",
            title: "Алиса Городецкая",
            start: new Date(2020, 5, 5, 19, 0, 0),
            end: new Date(2020, 5, 5, 20, 0, 0),
            startVal: new Date(2020, 5, 5, 19, 0, 0).valueOf(),
            endVal: new Date(2020, 5, 5, 20, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 5, 0, 0, 0).valueOf(),
            desc: {value: "manicure", text: "Маникюр", time: 5}
        },

    ]

    getEvents() {
        return new Promise((resolve, reject) => {
            /*setTimeout(() => {

                if (Math.random() > 0.75) {
                    reject(new Error('Some error !!!'))
                } else {
                    resolve(this.data)
                }
            }, 900)*/
            resolve(this.data)
        })
    }
}