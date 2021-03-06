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

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


import nextId from "react-id-generator";
import {isMobile} from "react-device-detect";
import ru from '@fullcalendar/core/locales/ru'
import {
    fetchEvents,
    eventAddedToCalendar,
    eventRemoveFromCalendar,
    dayEventsLoaded,
    eventUpdateFromCalendar
} from '../../actions'


import './main.scss'

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


const services = {
    "haircut": "Стрижка",
    "make_up": "Make up",
    "manicure": "Маникюр",
    "eyebrowe": "Брови",
    "hair_color": "Окрашивание волос"
}

class Calendar extends Component {
    state = {
        id: null,
        title: "",
        start: "",
        end: "",
        timeEvent: "",
        curDay: "",
        allDay: false,
        desc: {
            value: "",
            text: ""
        },
        openSlot: false,
        openEvent: false,
        dateNow: null,
        clickedEvent: {}
    }
    calendarComponentRef = React.createRef()

    render() {
        const {events, loading, error, daySchedule} = this.props
        const {dayNow} = this.state


        const eventActions = dayNow ? <DialogActions>
                <Button onClick={this.handleClose}>Отмена</Button>
                <Button onClick={() => this.deleteEvent()}>Удалить</Button>
                <Button onClick={() => this.updateEvent()}>Редактировать</Button>
            </DialogActions> :
            <DialogActions>
                <Button onClick={this.handleClose}>Закрыть</Button>
            </DialogActions>;
        const appointmentActions = <DialogActions>
            <Button onClick={this.handleClose}>Закрыть</Button>
            <Button type="submit">Записать</Button>
        </DialogActions>;

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
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    weekends={true}
                    dateClick={(value) => this.handleSlotSelected(value)}
                    eventClick={(value) => this.handleEventSelected(value)}
                    ref={this.calendarComponentRef}
                    navLinks={true}
                    editable={true}
                    eventRender={EventDetail}
                    navLinkDayClick={this.goToDate}
                    events={events}/>
                <Dialog
                    open={this.state.openSlot}
                    onClose={this.handleClose}>
                    <ValidatorForm
                        ref="form"
                        onSubmit={() => this.setNewAppointment()}>
                        <DialogTitle onClose={this.handleClose}>
                            {`Запись на ${moment(this.state.start).format("D.MM.YY")}`}
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
                                    validators={['required']}
                                    errorMessages={['Это поле обязательно']}>
                                    {daySchedule.map((item, key) =>
                                        <MenuItem key={key} value={`${item.startVal}_${item.endVal}`}>
                                            {new Date(item.startVal).getHours()} - {new Date(item.endVal).getHours()}
                                        </MenuItem>
                                    )}
                                </TextValidator>
                            </FormGroup>
                        </DialogContent>

                        {appointmentActions}
                    </ValidatorForm>
                </Dialog>


                <Dialog
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

                            {/*
                            <FormGroup>

                                <FormControl>
                                    <InputLabel htmlFor="time">Время</InputLabel>
                                    <Select id="time"
                                            value={this.state.timeEvent}
                                            onChange={this.handleTimeEventChange}>

                                        {daySchedule.map((item, key) =>
                                            <MenuItem key={key} value={`${item.startVal}_${item.endVal}`}>
                                                {new Date(item.startVal).getHours()} - {new Date(item.endVal).getHours()}
                                            </MenuItem>
                                        )}

                                    </Select>
                                </FormControl>
                            </FormGroup>


                            <hr/>*/}


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
                </Dialog>
            </Fragment>

        )
    }

    componentDidMount() {
        this.props.fetchEvents()
    }

    goToDate = (dateNow) => {
        let calendarApi = this.calendarComponentRef.current.getApi()
        calendarApi.gotoDate('2020-04-29')
    }

    handleTitle(e) {
        this.setState({title: e});
    }

    handleDescription(e) {
        const optionText = services[e]
        this.setState({
            desc: {
                value: e,
                text: optionText
            }
        });

    }

    handleTimeEventChange = (event, data) => {
        console.log(event);
        const val = event.target.value.split("_")
        const startEventTime = Number(val[0])
        const endEventTime = Number(val[1])

        this.setState({
            timeEvent: event.target.value,
            start: new Date(startEventTime),
            end: new Date(endEventTime)
        })
    };
   /* handleTimeEventChange2 = (event, data) => {
        console.log(event);
        const val = event.target.value.split("_")
        const startEventTime = Number(val[0])
        const endEventTime = Number(val[1])

        this.setState({
            timeEvent: event.target.value,
            start: new Date(startEventTime),
            end: new Date(endEventTime)
        })
    };*/

    getCurrentSchedule = (currentDay) => {
        let schedule = []
        for (let hour = 3600000, i = 1; i < 11; i++) {
            schedule.push({
                startVal: new Date(currentDay + hour * (i + 9)).valueOf(),
                endVal: new Date(currentDay + hour * (i + 10)).valueOf()
            })
        }
        return schedule
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
        this.setState({openEvent: false, openSlot: false});
    }

    handleSlotSelected = (slotInfo) => {
        const curDay = this.getSelectedDay(slotInfo.date)
        const daySchedule = this.getCurrentSchedule(curDay)
        this.props.onDayEventsLoad(curDay, daySchedule)
        let timeVal;
        let slotInfoDate = slotInfo.date

        if (slotInfoDate.getHours() === 0) {
            timeVal = ""
        } else {
            timeVal = `${slotInfoDate.valueOf()}_${slotInfoDate.valueOf() + 3600000}`
        }
        const start = new Date(slotInfoDate.valueOf());
        const end = new Date(slotInfoDate.setHours(slotInfoDate.getHours() + 1))

        const openSlot = this.handleDateNow(slotInfo.date.valueOf())
        this.setState({
            title: "",
            desc: {
                value: "",
                text: ""
            },
            start: start,
            timeEvent: timeVal,
            end: end,
            curDay: slotInfo.curDay,
            allDay: false,
            openSlot: openSlot,
            dayNow: openSlot

        });
    }

    handleEventSelected(eventItem) {
        console.log(eventItem);
        console.log(this.state.timeEvent);
        const curDay = this.getSelectedDay(eventItem.event.start)
        const daySchedule = this.getCurrentSchedule(curDay)
        this.props.onDayEventsLoad(curDay, daySchedule)
        const openSlot = this.handleDateNow(eventItem.event.start.valueOf())
        let slotInfoDate = eventItem.event

        let timeVal

            timeVal = `${slotInfoDate.extendedProps.startVal}_${slotInfoDate.extendedProps.startVal}`

        this.setState({
            id: eventItem.event.id,
            title: eventItem.event.title,
            desc: eventItem.event.extendedProps.desc,
            start: eventItem.event.start,
            end: eventItem.event.end,
            allDay: false,
            openEvent: true,

            dayNow: openSlot
        });

    }

    setNewAppointment() {
        const {start, end, title, desc} = this.state;
        const id = nextId()
        const curDay = this.getSelectedDay(start)
        let startVal = start.valueOf()
        let endVal = end.valueOf()
        let appointment = {id, title, start, end, desc, curDay, startVal, endVal};
        this.props.onAddedToCalendar(appointment)
        this.handleClose()
    }

    updateEvent() {
        const {id, start, end, timeEvent} = this.state;
        const curDay = this.getSelectedDay(start)
        let startVal = start.valueOf()
        let endVal = end.valueOf()
        let appointment = {id, start, end, curDay, startVal, endVal, timeEvent};
        this.props.onUpdateFromCalendar(appointment)
        this.handleClose()
    }

    deleteEvent() {
        this.props.onDeletedFromCalendar(this.state.id)
        this.handleClose()
    }


}


const mapStateToProps = ({eventBookingList: {events, loading, error}, dayEvents: {daySchedule}}) => {
    return {events, loading, error, daySchedule}
}
const mapDispatchToProps = (dispatch, {eventBookingService}) => {
    return {
        fetchEvents: fetchEvents(eventBookingService, dispatch),
        onAddedToCalendar: (newEvent) => dispatch(eventAddedToCalendar(newEvent)),
        onDeletedFromCalendar: (eventId) => dispatch(eventRemoveFromCalendar(eventId)),
        onDayEventsLoad: (currentDay, daySchedule) => dispatch(dayEventsLoaded(currentDay, daySchedule)),
        onUpdateFromCalendar: (updateEvent) => dispatch(eventUpdateFromCalendar(updateEvent)),
    }
}


export default withEventBookingService()(
    connect(mapStateToProps, mapDispatchToProps)(Calendar)
)