export default class EventBookingService {
    data = [
        {
            title: "Manicure",
            start: new Date(2020, 4, 12, 17,0,0),
            end: new Date(2020, 4, 12, 18,0,0),
            desc:"some description",
        },
        {
            title: "Manicure 2",
            start: new Date(2020, 4, 13, 10,0,0),
            end: new Date(2020, 4, 13, 11,0,0),
            desc:"some description",
        },
        {
            title: "HAIR COLORING",
            start: new Date(2020, 4, 15, 15,0,0),
            end: new Date(2020, 4, 15, 17,0,0),
            desc:"some description",
        },
        {
            title: "MAKEUP",
            start: new Date(2020, 4, 13, 13,0,0),
            end: new Date(2020, 4, 13, 14,0,0),
            desc:"some description",
        },
        {
            title: "Eyebrows and eyelashes",
            start: new Date(2020, 4, 14, 12,0,0),
            end: new Date(2020, 4, 14, 13,0,0),
            desc:"some description",
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