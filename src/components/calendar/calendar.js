import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import {withEventBookingService} from "../hoc";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import {connect} from "react-redux"
import moment from "moment";
import {isMobile} from "react-device-detect";
import ru from '@fullcalendar/core/locales/ru'
import {
    fetchEvents,
    dayEventsLoaded,
    eventUpdateFromCalendar
} from '../../actions'

import './main.scss'


import AppointmentDialog from "../dialog/appointmentDialog";
import EventDialog from "../dialog/eventDialog";
import {getAppointmentFreeTimes as utilGetAppointmentFreeTimes} from "../../utils/getAppointmentFreeTimes";
import {getSelectedDay as utilGetSelectedDay} from "../../utils/getSelectedDay";

const isMob = isMobile;

const viewBarDesktop = isMob ? "" : "dayGridMonth,timeGridWeek,timeGridDay,listWeek,timeGridFourDay"
const viewBarMobile = isMob ? "dayGridMonth,timeGridDay,listWeek,timeGridFourDay" : ""

const viewDefault = isMob ? "timeGridFourDay" : "timeGridWeek";
const calendarHeader = {
    left: "prev,next, today",
    center: "title",
    right: viewBarDesktop
}
const calendarFooter = {
    center: viewBarMobile
}
const calendarView = {
    timeGridFourDay: {
        type: 'timeGrid',
        duration: {days: 3},
        buttonText: '3 Дня'
    }
}
const EventDetail = ({event, el, view}) => {
    let content
    if (view.type == "listWeek") {
        content = <Fragment>
            <td>
                <span>{moment(event.start).locale('ru').format("LT")} - {moment(event.end).locale("ru").format("LT")}</span>
            </td>
            <td>{event.title}</td>
            <td>{event.extendedProps.desc.text}</td>
        </Fragment>;
    } else {
        content = <div className="eventItem">
            <p>
                <span>{moment(event.start).locale('ru').format("LT")} - {moment(event.end).locale("ru").format("LT")}</span>
            </p>
            <p>{event.title}</p>
            <p>{event.extendedProps.desc.text}</p>
        </div>
    }

    ReactDOM.render(content, el);
    return el;
};

const handlerDayrander = ({date, el, view}) => {
    console.log(el.getAttribute('data-date'));
    console.log(date.getDate());
    if (date.getDate() % 2 === 0) {
        el.setAttribute("style", "background: #eee3e3")
    }

    // el.style('background: red')
}

class Calendar extends Component {
    state = {
        allDay: false,
        appointmentDialog: {
            openSlot: false,
            id: null,
            title: "",
            start: "",
            end: "",
            startVal: "",
            endVal: "",
            timeEvent: "",
            desc: {
                value: "",
                text: "",
                time: ""
            },
            freeTimes: [],
            dayEventsLoad: [],
            daySchedule: []
        },
        eventDialogData: {
            openEvent: false,
            id: null,
            title: "",
            start: "",
            end: "",
            startVal: "",
            endVal: "",
            timeEvent: "",
            desc: {
                value: "",
                text: "",
                time: ""
            },
            freeTimes: [],
            dayEventsLoad: [],
            daySchedule: []
        }
    }
    calendarComponentRef = React.createRef()

    render() {
        const {events, loading, error} = this.props

        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorIndicator/>
        }

        return (
            <Fragment>
                <FullCalendar
                    locale={ru}
                    firstDay={1}
                    defaultView={viewDefault}
                    header={calendarHeader}
                    footer={calendarFooter}
                    views={calendarView}
                    eventLimit={true}
                    slotDuration={"00:60:00"}
                    allDaySlot={false}
                    contentHeight={"auto"}
                    minTime={"10:00:00"}
                    maxTime={"20:00:00"}
                    min={"10:00:00"}
                    max={"20:00:00"}
                    disableDragging={true}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    weekends={true}
                    dateClick={(value) => this.handleSlotSelected(value)}
                    eventClick={(value) => this.handleEventSelected(value)}
                    ref={this.calendarComponentRef}
                    editable={false}
                    dayRender={handlerDayrander}
                    eventRender={EventDetail}
                    events={events}/>

                <AppointmentDialog data={this.state.appointmentDialog} onCloseAction={this.handleClose}/>

                <EventDialog data={this.state.eventDialogData} onCloseAction={this.handleClose}/>
            </Fragment>

        )
    }

    handleDateNow = (selected) => {
        // console.log("selectedDay", selected.getDay());
        const dateNow = new Date(Date.now())
        let openSlot;
        // selected < utilGetSelectedDay(dateNow) && selected.getDate() % 2 === 0 ? openSlot = false : openSlot = true

        if (selected < utilGetSelectedDay(dateNow)) {
            openSlot = false
        } else {
            selected.getDate() % 2 === 0 ? openSlot = false : openSlot = true

        }
        console.log(openSlot);
        return openSlot
    }

    handleClose = () => {
        this.setState({
            appointmentDialog: {
                openSlot: false,
                id: null,
                title: "",
                start: "",
                end: "",
                timeEvent: "",
                desc: {
                    value: "",
                    text: ""
                },
                freeTimes: [],
                dayEventsLoad: [],
                daySchedule: []
            },
            eventDialogData: {
                openEvent: false,
                id: null,
                title: "",
                start: "",
                end: "",
                timeEvent: "",
                desc: {
                    value: "",
                    text: ""
                },
                freeTimes: [],
                dayEventsLoad: [],
                daySchedule: [],
                isView: ''
            }
        });
    }

    handleDayEventsLoad = (day) => {
        const curDay = utilGetSelectedDay(day)
        const dayEventsLoad = this.props.onDayEventsLoad(curDay)
        return dayEventsLoad
    }

    handleSlotSelected = (slotInfo) => {
        const dayEventsLoad = this.handleDayEventsLoad(slotInfo.date)
        const isOpenSlot = this.handleDateNow(slotInfo.date)
        console.log(slotInfo);
        this.setState({
            appointmentDialog: {
                id: null,
                title: "",
                start: slotInfo.date,
                end: "",
                startVal: "",
                endVal: "",
                openSlot: isOpenSlot,
                timeEvent: "",
                desc: {
                    value: "",
                    text: ""
                },
                freeTimes: [],
                dayEventsLoad: dayEventsLoad,
                daySchedule: this.props.daySchedule
            }
        })
    }

    handleEventSelected(eventItem) {

        const curDay = utilGetSelectedDay(eventItem.event.start)
        const dayEventsLoad = this.props.onDayEventsLoad(curDay)
        const serviceOption = eventItem.event.extendedProps.desc
        const freeOptions = utilGetAppointmentFreeTimes(this.props.daySchedule, serviceOption.time)
        const isView = this.handleDateNow(eventItem.event.start)
        console.log(eventItem.event.extendedProps);
        this.setState({
            eventDialogData: {
                openEvent: true,
                id: eventItem.event.id,
                title: eventItem.event.title,
                start: eventItem.event.start,
                end: eventItem.event.end,
                startVal: eventItem.event.extendedProps.startVal,
                endVal: eventItem.event.extendedProps.endVal,
                timeEvent: eventItem.event.extendedProps.timeEvent,
                desc: {
                    value: eventItem.event.extendedProps.desc.value,
                    text: eventItem.event.extendedProps.desc.text,
                    time: eventItem.event.extendedProps.desc.time
                },
                curDay: curDay,
                freeTimes: freeOptions,
                dayEventsLoad: dayEventsLoad,
                daySchedule: [],
                isView: isView
            }
        })
        console.log(this.state.eventDialogData);

    }

    componentDidMount() {
        this.props.fetchEvents()
    }
}


const mapStateToProps = ({eventBookingList: {events, loading, error}, dayEvents: {daySchedule}}) => {
    return {events, loading, error, daySchedule}
}
const mapDispatchToProps = (dispatch, {eventBookingService}) => {
    return {
        fetchEvents: fetchEvents(eventBookingService, dispatch),
        onDayEventsLoad: (currentDay) => dispatch(dayEventsLoaded(currentDay)),
        onUpdateFromCalendar: (updateEvent) => dispatch(eventUpdateFromCalendar(updateEvent)),
    }
}


export default withEventBookingService()(
    connect(mapStateToProps, mapDispatchToProps)(Calendar)
)