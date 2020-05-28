export default class EventBookingService {

    data = [
        {
            id: "iddd21",
            title: "Валерия Григорян",
            start: new Date(2020, 4, 25, 17, 0, 0),
            end: new Date(2020, 4, 25, 18, 0, 0),
            startVal: new Date(2020, 4, 25, 17, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 25, 18, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 25, 0, 0, 0).valueOf(),
            desc: {value:"hair_cut",text: "Стрижка"}
        },
        {
            id: "iddd22",
            title: "Света Васильева",
            start: new Date(2626, 4, 26, 10, 0, 0),
            end: new Date(2626, 4, 26, 11, 0, 0),
            startVal: new Date(2626, 4, 26, 10, 0, 0).valueOf(),
            endVal: new Date(2626, 4, 26, 11, 0, 0).valueOf(),
            curDay: new Date(2626, 4, 26, 0, 0, 0).valueOf(),
            desc: {value:"pedicure",text: "Педикюр"}
        },
        {
            id: "iddd23",
            title: "Станислав",
            start: new Date(2020, 4, 28, 12, 0, 0),
            end: new Date(2020, 4, 28, 13, 0, 0),
            startVal: new Date(2020, 4, 28, 12, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 28, 13, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 28, 0, 0, 0).valueOf(),
            desc: {value:"hair_cut",text: "Стрижка"}
        }, {
            id: "iddd25",
            title: "Вика Серова",
            start: new Date(2020, 4, 28, 14, 0, 0),
            end: new Date(2020, 4, 28, 15, 0, 0),
            startVal: new Date(2020, 4, 28, 14, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 28, 15, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 28, 0, 0, 0).valueOf(),
            desc: {value:"make_up",text: "Make UP"}
        }, {
            id: "iddd26",
            title: "Андрей Данчук",
            start: new Date(2020, 4, 29, 10, 0, 0),
            end: new Date(2020, 4, 29, 11, 0, 0),
            startVal: new Date(2020, 4, 29, 10, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 29, 11, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 29, 0, 0, 0).valueOf(),
            desc: {value:"barber",text: "Борода"}
        }, {
            id: "iddd27",
            title: "Марина Гришына",
            start: new Date(2020, 4, 29, 17, 0, 0),
            end: new Date(2020, 4, 29, 18, 0, 0),
            startVal: new Date(2020, 4, 29, 17, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 29, 18, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 29, 0, 0, 0).valueOf(),
            desc: {value:"hair_color",text: "Окрашивание волос"}
        },
        {
            id: "iddd28",
            title: "Дарья Донцова",
            start: new Date(2020, 4, 22, 15, 0, 0),
            end: new Date(2020, 4, 22, 16, 0, 0),
            startVal: new Date(2020, 4, 22, 15, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 22, 16, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 22, 0, 0, 0).valueOf(),
            desc: {value:"bla_bla_bla",text: "Просто поболтать"}
        },
        {
            id: "iddd29",
            title: "Сергей Власюк",
            start: new Date(2020, 4, 27, 15, 0, 0),
            end: new Date(2020, 4, 27, 16, 0, 0),
            startVal: new Date(2020, 4, 27, 15, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 27, 16, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 27, 0, 0, 0).valueOf(),

            desc: {value:"hair_cut",text: "Стрижка"}
        },
        {
            id: "iddd30",
            title: "Ольга Бузова",
            start: new Date(2020, 4, 27, 11, 0, 0),
            end: new Date(2020, 4, 27, 12, 0, 0),
            startVal: new Date(2020, 4, 27, 11, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 27, 12, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 27, 0, 0, 0).valueOf(),
            desc: {value:"botox",text: "Ботокс"}
        },
        {
            id: "iddd35",
            title: "Галина Никина",
            start: new Date(2020, 4, 30, 19, 0, 0),
            end: new Date(2020, 4, 30, 20, 0, 0),
            startVal: new Date(2020, 4, 30, 19, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 30, 20, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 30, 0, 0, 0).valueOf(),
            desc: {value:"hair_color",text: "Окрашивание волос"}
        },
        {
            id: "iddd36",
            title: "Саша Валева",
            start: new Date(2020, 4, 30, 13, 0, 0),
            end: new Date(2020, 4, 30, 14, 0, 0),
            startVal: new Date(2020, 4, 30, 13, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 30, 14, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 30, 0, 0, 0).valueOf(),
            desc: {value:"pedicure",text: "Педикюр"}
        },
        {
            id: "iddd37",
            title: "Вадим Велиев",
            start: new Date(2020, 4, 31, 12, 0, 0),
            end: new Date(2020, 4, 31, 13, 0, 0),
            startVal: new Date(2020, 4, 31, 12, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 31, 13, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 31, 0, 0, 0).valueOf(),
            desc: {value:"hair_cut",text: "Стрижка"}
        },

        {
            id: "iddd40",
            title: "Алиса Городецкая",
            start: new Date(2020, 5, 1, 10, 0, 0),
            end: new Date(2020, 5, 1, 11, 0, 0),
            startVal: new Date(2020, 5, 1, 10, 0, 0).valueOf(),
            endVal: new Date(2020, 5, 1, 11, 0, 0).valueOf(),
            curDay: new Date(2020, 5, 1, 0, 0, 0).valueOf(),
            desc: {value:"manicure",text: "Маникюр"}
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