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
import {getAppointmentsFreeTime} from "../../utils/appointments_time";


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
                time:""
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
                time:""
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
                    slotDuration={"00:30:00"}
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
                    eventRender={EventDetail}
                    events={events}/>

                <AppointmentDialog data={this.state.appointmentDialog} onCloseAction={this.handleClose}/>


                <EventDialog data={this.state.eventDialogData} onCloseAction={this.handleClose}/>
                {/*<Dialog
                    open={this.state.openEvent}
                    onClose={this.handleClose}>
                    <ValidatorForm
                        ref="form"
                        onSubmit={() => this.updateEvent()}>
                        <DialogTitle onClose={this.handleClose}>
                            {`Просмотр/перенос услуги`}
                        </DialogTitle>
                        <DialogContent dividers>
                            <FormGroup>
                                <TextValidator
                                    label="Ф.И.О."
                                    onChange={(e) => this.handleTitle(e.target.value)}
                                    name="full_name"
                                    value={this.state.title}
                                    validators={['required']}
                                    errorMessages={['Это поле обязательно']}
                                />
                            </FormGroup>

                            <FormGroup>
                                <TextValidator
                                    label="Услуга"
                                    onChange={(e) => this.handleDescription(e.target.value)}
                                    name="service"
                                    select
                                    value={this.state.desc.value}
                                    validators={['required']}
                                    errorMessages={['Это поле обязательно']}>
                                    <MenuItem value="haircut">Стрижка</MenuItem>
                                    <MenuItem value="make_up">Make up</MenuItem>
                                    <MenuItem value="manicure">Маникюр</MenuItem>
                                    <MenuItem value="eyebrowe">Брови</MenuItem>
                                    <MenuItem value="pedicure">Педикюр</MenuItem>
                                    <MenuItem value="hair_color">Окрашивание волос</MenuItem>
                                </TextValidator>
                            </FormGroup>

                            <FormGroup>
                                <TextValidator
                                    label="Время"
                                    value={this.state.timeEvent}
                                    onChange={this.handleTimeEventChange}
                                    name="time"
                                    select
                                    validators={['required', 'notEmpty']}
                                    errorMessages={['Это поле обязательно']}>
                                    <MenuItem value="">
                                        Placeholder
                                    </MenuItem>
                                    {daySchedule.map((item, key) =>
                                        <MenuItem key={key} value={`${item.startVal}_${item.endVal}`}>
                                            {new Date(item.startVal).getHours()} - {new Date(item.endVal).getHours()}
                                        </MenuItem>
                                    )}
                                </TextValidator>
                            </FormGroup>
                        </DialogContent>

                        {eventActions}
                    </ValidatorForm>
                </Dialog>*/}
            </Fragment>

        )
    }

    getSelectedDay = (val) => {
        return new Date(val.getFullYear(), val.getMonth(), val.getDate(), 0, 0, 0).valueOf()
    }

    handleDateNow = (selected) => {
        const dateNow = new Date(Date.now())
        let openSlot;
        selected < this.getSelectedDay(dateNow) ? openSlot = false : openSlot = true
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
                daySchedule: []
            }
        });
    }

    handleDayEventsLoad = (day) => {
        const curDay = this.getSelectedDay(day)
        const dayEventsLoad = this.props.onDayEventsLoad(curDay)
        return dayEventsLoad
    }

    handleSlotSelected = (slotInfo) => {
        const dayEventsLoad = this.handleDayEventsLoad(slotInfo.date)
        this.setState({
            appointmentDialog: {
                id: null,
                title: "",
                start: "",
                end: "",
                startVal: "",
                endVal: "",
                openSlot: true,
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

        const curDay = this.getSelectedDay(eventItem.event.start)
        const dayEventsLoad = this.props.onDayEventsLoad(curDay)
        const serviceOption = eventItem.event.extendedProps.desc
        const freeOptions = getAppointmentsFreeTime(this.props.daySchedule, serviceOption.time)

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
                dayEventsLoad: [],
                daySchedule: []
            }
        })

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