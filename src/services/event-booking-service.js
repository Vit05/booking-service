import _ from 'lodash'

export default class EventBookingService {
    /*
        data = [
            {2019: []},
            {
                2020: [
                    {
                        0: [],
                        1: [],
                        2: [],
                        3: [],
                        4: [
                            {0:{}},
                            {16:[
                                    {
                                        id:"iddd01",
                                        title: "Manicure",
                                        start: new Date(2020, 4, 16, 17,0,0),
                                        end: new Date(2020, 4, 16, 18,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        id:"iddd02",
                                        title: "Manicure 2",
                                        start: new Date(2020, 4, 16, 10,0,0),
                                        end: new Date(2020, 4, 16, 11,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        id:"iddd03",
                                        title: "HAIR COLORING",
                                        start: new Date(2020, 4, 16, 15,0,0),
                                        end: new Date(2020, 4, 16, 17,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        id:"iddd04",
                                        title: "MAKEUP",
                                        start: new Date(2020, 4, 16, 13,0,0),
                                        end: new Date(2020, 4, 16, 14,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        title: "Eyebrows and eyelashes",
                                        start: new Date(2020, 4, 16, 12,0,0),
                                        end: new Date(2020, 4, 16, 13,0,0),
                                        desc:"some description",
                                    }
                                ]},
                            {17:[
                                    {
                                        id:"iddd01",
                                        title: "Manicure",
                                        start: new Date(2020, 4, 17, 17,0,0),
                                        end: new Date(2020, 4, 17, 18,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        id:"iddd03",
                                        title: "HAIR COLORING",
                                        start: new Date(2020, 4, 17, 16,0,0),
                                        end: new Date(2020, 4, 17, 17,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        id:"iddd04",
                                        title: "MAKEUP",
                                        start: new Date(2020, 4, 17, 10,0,0),
                                        end: new Date(2020, 4, 17, 12,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        title: "Eyebrows and eyelashes",
                                        start: new Date(2020, 4, 17, 12,0,0),
                                        end: new Date(2020, 4, 17, 13,0,0),
                                        desc:"some description",
                                    }
                                ]},
                            {18:[
                                    {
                                        id:"iddd02",
                                        title: "Manicure 2 18",
                                        start: new Date(2020, 4, 18, 11,0,0),
                                        end: new Date(2020, 4, 18, 13,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        id:"iddd03",
                                        title: "HAIR COLORING 18",
                                        start: new Date(2020, 4, 18, 14,0,0),
                                        end: new Date(2020, 4, 18, 15,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        id:"iddd04",
                                        title: "MAKEUP 18",
                                        start: new Date(2020, 4, 18, 19,0,0),
                                        end: new Date(2020, 4, 18, 20,0,0),
                                        desc:"some description",
                                    },
                                    {
                                        title: "Eyebrows and eyelashes 18",
                                        start: new Date(2020, 4, 18, 17,0,0),
                                        end: new Date(2020, 4, 18, 18,0,0),
                                        desc:"some description",
                                    }
                                ]}
                        ],
                        5: [],
                    }
                ]
            },

        ]
    */


    data = [
        {
            id: "iddd21",
            title: "Manicure",
            start: new Date(2020, 4, 19, 17, 0, 0),
            end: new Date(2020, 4, 19, 18, 0, 0),
            startVal: new Date(2020, 4, 19, 17, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 19, 18, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 19, 0, 0, 0).valueOf(),

            desc: "some description",
        },
        {
            id: "iddd22",
            title: "Manicure 2",
            start: new Date(2020, 4, 20, 10, 0, 0),
            end: new Date(2020, 4, 20, 11, 0, 0),
             startVal: new Date(2020, 4, 20, 10, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 20, 11, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 20, 0, 0, 0).valueOf(),

            desc: "some description",
        },
        {
            id: "iddd23",
            title: "Manicure 1",
            start: new Date(2020, 4, 22, 12, 0, 0),
            end: new Date(2020, 4, 22, 13, 0, 0),
            startVal: new Date(2020, 4, 22, 12, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 22, 13, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 22, 0, 0, 0).valueOf(),

            desc: "some description 3",
        },{
            id: "iddd25",
            title: "Manicure 2",
            start: new Date(2020, 4, 22, 14, 0, 0),
            end: new Date(2020, 4, 22, 15, 0, 0),
            startVal: new Date(2020, 4, 22, 14, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 22, 15, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 22, 0, 0, 0).valueOf(),

            desc: "some description 3",
        },{
            id: "iddd26",
            title: "Manicure 3",
            start: new Date(2020, 4, 23, 10, 0, 0),
            end: new Date(2020, 4, 23, 11, 0, 0),
            startVal: new Date(2020, 4, 23, 10, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 23, 11, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 23, 0, 0, 0).valueOf(),

            desc: "some description 3",
        },{
            id: "iddd27",
            title: "Manicure 4",
            start: new Date(2020, 4, 23, 17, 0, 0),
            end: new Date(2020, 4, 23, 18, 0, 0),
            startVal: new Date(2020, 4, 23, 17, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 23, 18, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 23, 0, 0, 0).valueOf(),

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
            start: new Date(2020, 4, 24, 15, 0, 0),
            end: new Date(2020, 4, 24, 16, 0, 0),
            startVal: new Date(2020, 4, 24, 15, 0, 0).valueOf(),
            endVal: new Date(2020, 4, 24, 16, 0, 0).valueOf(),
            curDay: new Date(2020, 4, 24, 0, 0, 0).valueOf(),

            desc: "some description barber",
        },

    ]

    getEvents() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                /* if (Math.random() > 0.75) {
                     reject(new Error('Some error !!!'))
                 } else {*/
                resolve(this.data)
                // }


                /*      var result1 = [
                          {
                              start: new Date(2020, 5, 18, 10, 0, 0),
                              end: new Date(2020, 5, 18, 11, 0, 0)

                          },
                          {
                              start: new Date(2020, 5, 18, 11, 0, 0),
                              end: new Date(2020, 5, 18, 12, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 12, 0, 0),
                              end: new Date(2020, 5, 18, 13, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 13, 0, 0),
                              end: new Date(2020, 5, 18, 14, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 14, 0, 0),
                              end: new Date(2020, 5, 18, 15, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 15, 0, 0),
                              end: new Date(2020, 5, 18, 16, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 16, 0, 0),
                              end: new Date(2020, 5, 18, 17, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 17, 0, 0),
                              end: new Date(2020, 5, 18, 18, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 18, 0, 0),
                              end: new Date(2020, 5, 18, 19, 0, 0)
                          },
                          {
                              start: new Date(2020, 5, 18, 19, 0, 0),
                              end: new Date(2020, 5, 18, 20, 0, 0)
                          },


                          /!*  {
                                "id": "id1",
                                "title": "qqqqqqqqq",
                                "start": "2020-05-18T07:00:00.000Z",
                                "end": "2020-05-18T08:00:00.000Z",
                                "desc": "",
                                "curDay": 1589749200000
                            },
                            {
                                id: 'iddd15',
                                title: 'Manicure 2 18',
                                start: '2020-05-18T08:00:00.000Z',
                                end: '2020-05-18T10:00:00.000Z',
                                curDay: 1589749200000,
                                desc: 'some description'
                            },
                            {
                                id: 'iddd16',
                                title: 'HAIR COLORING 18',
                                start: '2020-05-18T11:00:00.000Z',
                                end: '2020-05-18T12:00:00.000Z',
                                curDay: 1589749200000,
                                desc: 'some description'
                            },
                            {
                                id: 'iddd17',
                                title: 'MAKEUP 18',
                                start: '2020-05-18T16:00:00.000Z',
                                end: '2020-05-18T17:00:00.000Z',
                                curDay: 1589749200000,
                                desc: 'some description'
                            },
                            {
                                id: 'iddd18',
                                title: 'Eyebrows and eyelashes 18',
                                start: '2020-05-18T14:00:00.000Z',
                                end: '2020-05-18T15:00:00.000Z',
                                curDay: 1589749200000,
                                desc: 'some description'
                            },
                            {
                                id: 'id1',
                                title: 'asdadasd',
                                start: '2020-05-18T13:00:00.000Z',
                                end: '2020-05-18T14:00:00.000Z',
                                desc: '',
                                curDay: 1589749200000
                            },
                            {
                                id: 'id2',
                                title: 'asdasdasdasd',
                                start: '2020-05-18T12:00:00.000Z',
                                end: '2020-05-18T13:00:00.000Z',
                                desc: '',
                                curDay: 1589749200000
                            },
                            {
                                id: 'id3',
                                title: 'asdasdasd',
                                start: '2020-05-18T15:00:00.000Z',
                                end: '2020-05-18T16:00:00.000Z',
                                desc: '',
                                curDay: 1589749200000
                            }
      *!/
                      ]
                      var result2 = [
                          {
                              start: new Date(2020, 5, 18, 10, 0, 0),
                              end: new Date(2020, 5, 18, 11, 0, 0),
                              id: 'iddd15',
                              title: 'Manicure 2 18',
                              // start: '2020-05-18T08:00:00.000Z',
                              // end: '2020-05-18T10:00:00.000Z',

                              curDay: 1589749200000,
                              desc: 'some description'
                          },
                          {
                              start: new Date(2020, 5, 18, 12, 0, 0),
                              end: new Date(2020, 5, 18, 13, 0, 0),
                              id: 'iddd16',
                              title: 'HAIR COLORING 18',
                              // start: '2020-05-18T11:00:00.000Z',
                              // end: '2020-05-18T12:00:00.000Z',

                              curDay: 1589749200000,
                              desc: 'some description'
                          },
                          {
                              start: new Date(2020, 5, 18, 17, 0, 0),
                              end: new Date(2020, 5, 18, 18, 0, 0),
                              id: 'iddd17',
                              title: 'MAKEUP 18',
                              // start: '2020-05-18T16:00:00.000Z',
                              // end: '2020-05-18T17:00:00.000Z',

                              curDay: 1589749200000,
                              desc: 'some description'
                          }
                          /!*,
                          {
                              id: 'iddd18',
                              title: 'Eyebrows and eyelashes 18',
                              start: '2020-05-18T14:00:00.000Z',
                              end: '2020-05-18T15:00:00.000Z',
                              curDay: 1589749200000,
                              desc: 'some description'
                          },
                          {
                              id: 'id1',
                              title: 'asdadasd',
                              start: '2020-05-18T13:00:00.000Z',
                              end: '2020-05-18T14:00:00.000Z',
                              desc: '',
                              curDay: 1589749200000
                          },
                          {
                              id: 'id2',
                              title: 'asdasdasdasd',
                              start: '2020-05-18T12:00:00.000Z',
                              end: '2020-05-18T13:00:00.000Z',
                              desc: '',
                              curDay: 1589749200000
                          },
                          {
                              id: 'id3',
                              title: 'asdasdasd',
                              start: '2020-05-18T15:00:00.000Z',
                              end: '2020-05-18T16:00:00.000Z',
                              desc: '',
                              curDay: 1589749200000
                          }*!/
                      ];*/

                var result1 = [
                    {
                        start: new Date(2020, 5, 18, 11, 0, 0),
                        end: new Date(2020, 5, 18, 12, 0, 0),
                        startVal: new Date(2020, 5, 18, 11, 0, 0).valueOf(),
                        endVal: new Date(2020, 5, 18, 12, 0, 0).valueOf(),
                        type: 'user', username: 'sandra'
                    },
                    {
                        start: new Date(2020, 5, 18, 12, 0, 0),
                        end: new Date(2020, 5, 18, 13, 0, 0),
                        startVal: new Date(2020, 5, 18, 12, 0, 0).valueOf(),
                        endVal: new Date(2020, 5, 18, 13, 0, 0).valueOf(),
                        type: 'admin', username: 'johnny2'
                    },
                    {
                        start: new Date(2020, 5, 18, 13, 0, 0),
                        end: new Date(2020, 5, 18, 14, 0, 0),
                        startVal: new Date(2020, 5, 18, 13, 0, 0).valueOf(),
                        endVal: new Date(2020, 5, 18, 14, 0, 0).valueOf(),
                        type: 'user', username: 'pete'
                    },
                    {
                        start: new Date(2020, 5, 18, 14, 0, 0),
                        end: new Date(2020, 5, 18, 15, 0, 0),
                         startVal: new Date(2020, 5, 18, 14, 0, 0).valueOf(),
                        endVal: new Date(2020, 5, 18, 15, 0, 0).valueOf(),
                        type: 'user', username: 'pete'
                    },
                    {
                        start: new Date(2020, 5, 18, 15, 0, 0),
                        end: new Date(2020, 5, 18, 16, 0, 0),
                        startVal: new Date(2020, 5, 18, 15, 0, 0).valueOf(),
                        endVal: new Date(2020, 5, 18, 16, 0, 0).valueOf(),
                        type: 'user', username: 'be_bob'
                    }
                ];

                var result2 = [
                    {
                        start: new Date(2020, 5, 18, 14, 0, 0),
                        end: new Date(2020, 5, 18, 15, 0, 0),
                        startVal: new Date(2020, 5, 18, 14, 0, 0).valueOf(),
                        endVal: new Date(2020, 5, 18, 15, 0, 0).valueOf(),
                        email: 'johnny@example.com'
                    },
                    {
                        start: new Date(2020, 5, 18, 15, 0, 0),
                        end: new Date(2020, 5, 18, 16, 0, 0),
                        startVal: new Date(2020, 5, 18, 15, 0, 0).valueOf(),
                        endVal: new Date(2020, 5, 18, 16, 0, 0).valueOf(),
                        email: 'bobby@example.com'
                    }
                ];

                 var props = ['startVal', 'endVal'];

                 var result = result1.filter(function(o1){
                     // filter out (!) items in result2
                     return !result2.some(function(o2){
                         // console.log(o1.startVal === o2.startVal);
                         return o1.startVal === o2.startVal;          // assumes unique id
                     });
                 }).map(function(o){
                     // use reduce to make objects with only the required properties
                     // and map to apply this to the filtered array as a whole
                     return props.reduce(function(newo, name){
                         newo[name] = o[name];
                         // console.log(newo[name],"-----", o[name]);
                         return newo;
                     }, {});
                 });

               /* var result3 = _(result2)
                    .differenceBy(result1, 'startVal', 'endVal')
                    .map(_.partial(_.pick, _, 'startVal', 'endVal'))
                    .value();

                console.log(result3);*/
                /* function comparer(otherArray) {
                     return function (current) {
                         return otherArray.filter(function (other) {
                             return other.start == current.start && other.end == current.end
                         });
                     }
                 }

                 var onlyInA = a.filter(comparer(b));
                 var onlyInB = b.filter(comparer(a));

                 var result = onlyInA.concat(onlyInB);
 */
                // console.log("COMPARE RESULT@@@@@");
                // console.log(result);
                // console.log(dif);

            }, 900)
        })
    }

    /*getDayEvents(data){
        let day = [data]
        console.log(day);
        // console.log(this.data);

        let filteredArray = this.data.filter(function(itm){
            // console.log(itm.curDay)
            return day.indexOf(itm.curDay) > -1;
        });
        console.log(filteredArray)

        return filteredArray
    }
    getOne(){
        this.getDayEvents(new Date(2020, 4, 16, 0,0,0).valueOf())
    }
    getTwo(){
        this.getDayEvents(new Date(2020, 4, 20, 0,0,0).valueOf())
    }*/

}


/*
const ddd = new EventBookingService()

ddd.getOne()
ddd.getTwo()*/
