import React, {Component} from "react";
import {withEventBookingService} from "./hoc";
import Spinner from "./spinner";
import ErrorIndicator from "./error-indicator";
import {connect} from "react-redux"
import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import {
    fetchEvents,
    eventAddedToCalendar,
    eventRemoveFromCalendar,
    dayEventsLoaded,
    eventUpdateFromCalendar
} from '../actions'
import nextId from "react-id-generator";
import 'moment/locale/ru';

require("react-big-calendar/lib/css/react-big-calendar.css");

moment.locale("ru-ru", {
    week: {
        dow: 1 //Monday is the first day of the week.
    }
});
const localizer = momentLocalizer(moment)
const messages = {
    previous: '<<',
    next: '>>',
    today: 'Текущий(я)',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Повестка дня',
    date: 'Дата',
    time: 'Время',
    event: 'Запись', // Or anything you want
    showMore: total => `Еще + ${total} записи`
}
//Calendar app
class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            title: "",
            start: "",
            end: "",
            timeEvent: null,
            curDay: "",
            allDay: false,
            desc: "",
            openSlot: false,
            openEvent: false,
            dateNow: null,
            clickedEvent: {}
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.fetchEvents()
    }


    setTitle(e) {
        this.setState({title: e});
    }

    setDescription(e) {
        this.setState({desc: e});
    }

    handleStartTime = (event, date) => {
        this.setState({start: date});
    };
    handleEndTime = (event, date) => {
        this.setState({end: date});
    };
    handleTimeEventChange = (event, data) => {
        const val = event.target.value.split("_")

        const startEventTime = Number(val[0])
        const endEventTime = Number(val[1])
        /* console.log("Select value---", new Date(`${startEventTime}`));
        console.log("Select value---", typeof  startEventTime);
        console.log("Select value---", {
                timeEvent: event.target.value,
                start: new Date(startEventTime),
                end: new Date(endEventTime)
            }
        );*/

        this.setState({
            timeEvent: event.target.value,
            start: new Date(startEventTime),
            end: new Date(endEventTime)
        })
    };
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

    handleClose() {
        this.setState({openEvent: false, openSlot: false});
    }

    handleSlotSelected(slotInfo) {
        const curDay = this.getSelectedDay(slotInfo.start)
        const daySchedule = this.getCurrentSchedule(curDay)
        this.props.onDayEventsLoad(curDay, daySchedule)
        const timeVal = `${slotInfo.start.valueOf()}_${slotInfo.end.valueOf()}`

        const openSlot = this.handleDateNow(slotInfo.start.valueOf())

        console.log(slotInfo);
        this.setState({
            title: "",
            desc: "",
            start: slotInfo.start,
            timeEvent: timeVal,
            end: slotInfo.end,
            curDay: slotInfo.curDay,
            allDay: false,
            openSlot: openSlot
        });
    }

    handleEventSelected(eventItem) {
        const curDay = this.getSelectedDay(eventItem.start)
        const daySchedule = this.getCurrentSchedule(curDay)

        this.props.onDayEventsLoad(curDay, daySchedule)


        const timeVal = `${eventItem.start.valueOf()}_${eventItem.end.valueOf()}`

        const openSlot = this.handleDateNow(eventItem.start.valueOf())
        console.log("UPDATE EVENT INFO___", eventItem);
        this.setState({
            id: eventItem.id,
            openEvent: true,
            clickedEvent: eventItem,
            start: eventItem.start,
            end: eventItem.end,
            title: eventItem.title,
            desc: eventItem.desc,
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
        console.log(appointment);
        this.props.onAddedToCalendar(appointment)
        this.handleClose()
    }

    updateEvent() {
        // const {id}=this.props
        const {id, start, end} = this.state;
        const curDay = this.getSelectedDay(start)
        let startVal = start.valueOf()
        let endVal = end.valueOf()
        // const index = events.findIndex(event => event === clickedEvent);
        let appointment = {id, start, end, curDay, startVal, endVal};

        this.props.onUpdateFromCalendar(appointment)

        /*const updatedEvent = events.slice();
        updatedEvent[index].title = title;
        updatedEvent[index].desc = desc;
        updatedEvent[index].start = start;
        updatedEvent[index].end = end;*/
        // localStorage.setItem("cachedEvents", JSON.stringify(updatedEvent));
        /*this.setState({
            events: updatedEvent
        });
        this.handleClose()*/
    }

    deleteEvent() {
        this.props.onDeletedFromCalendar(this.state.id)
        this.handleClose()
    }

    render() {
        const {events, loading, error, daySchedule} = this.props
        const {dayNow} = this.state

        // const {localizer} = this.props
        const eventActions = dayNow ? [
            <FlatButton
                label="Cancel"
                primary={false}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                secondary={true}
                keyboardFocused={true}
                onClick={() => {
                    this.deleteEvent();
                }}
            />,
            <FlatButton
                label="Confirm Edit"
                primary={true}
                keyboardFocused={true}
                onClick={() => {
                    this.updateEvent()
                }}
            />
        ] : [
            <FlatButton label="Cancel" secondary={true}
                        onClick={this.handleClose}/>];
        const appointmentActions = [
            <FlatButton label="Cancel" secondary={true}
                        onClick={this.handleClose}/>,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={() => {
                    this.setNewAppointment()
                }}/>];

        const TouchCellWrapper = ({ children, value, onSelectSlot }) => (
            React.cloneElement(React.Children.only(children), {
                onTouchEnd: () => onSelectSlot({ action: 'click', slots: [value] }),
            })
        );

        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorIndicator/>
        }
        return (
            <div id="Calendar">
                <BigCalendar
                    components={{
                        dateCellWrapper: (props) => (
                            <TouchCellWrapper {...props} onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)} />
                        ),
                    }}
                    events={events}
                    localizer={localizer}
                    views={["month", "week", "day", "agenda"]}
                    timeslots={1}
                    step={60}
                    min={new Date(0, 0, 0, 10, 0, 0)}
                    max={new Date(0, 0, 0, 20, 0, 0)}
                    defaultView={'week'}
                    defaultDate={new Date()}
                    selectable={true}
                    eventPropGetter={e => ({
                        style: {
                            backgroundColor: '#99ff00',
                            borderColor: '#777',
                            color: '#333333'
                        }
                    })}
                    dayPropGetter={e => ({style: {backgroundColor: '#cdcdcd'}})}
                    popup={true}
                    onSelectEvent={event => this.handleEventSelected(event)}
                    onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)}

                />

                <Dialog
                    title={`Book an appointment on ${moment(this.state.start).format("MMMM Do YYYY")}`}
                    actions={appointmentActions}
                    modal={false}
                    open={this.state.openSlot}
                    onRequestClose={this.handleClose}>

                    <TextField
                        floatingLabelText="Title"
                        onChange={e => {
                            this.setTitle(e.target.value);
                        }}/>
                    <br/>
                    <TextField
                        floatingLabelText="Description"
                        onChange={e => {
                            this.setDescription(e.target.value)
                        }}/>
                    <br/>
                    <br/>
                    <label>
                        Chose time for event
                        <select value={this.state.timeEvent} onChange={this.handleTimeEventChange}>
                            <option selected>Select time</option>
                            {daySchedule.map((item, key) =>
                                <option key={key} value={`${item.startVal}_${item.endVal}`}>
                                    {new Date(item.startVal).getHours()} - {new Date(item.endVal).getHours()}
                                </option>
                            )}
                        </select>
                    </label>

                    {/*   <TimePicker
                        format="ampm"
                        floatingLabelText="Start Time"
                        minutesStep={30}
                        value={this.state.start}
                        onChange={this.handleStartTime}
                    />
                    <TimePicker
                        format="ampm"
                        floatingLabelText="End Time"
                        minutesStep={30}
                        value={this.state.end}
                        onChange={this.handleEndTime}
                    />*/}
                </Dialog>

                <Dialog
                    title={`View/Move Appointment of ${moment(this.state.start).format("MMMM Do YYYY")}`}
                    actions={eventActions} modal={false}
                    open={this.state.openEvent} onRequestClose={this.handleClose}>

                    <TextField
                        defaultValue={this.state.title}
                        floatingLabelText="Title"
                        onChange={e => {
                            this.setTitle(e.target.value)
                        }}/>
                    <br/>

                    <TextField
                        floatingLabelText="Description"
                        multiLine={true}
                        defaultValue={this.state.desc}
                        onChange={e => {
                            this.setDescription(e.target.value)
                        }}/>

                    <br/>
                    <br/>
                    {this.state.dayNow?(<label>
                        Chose time for event
                        <select value={this.state.timeEvent} onChange={this.handleTimeEventChange}>
                            <option selected>Select time</option>
                            {daySchedule.map((item, key) =>
                                <option key={key} value={`${item.startVal}_${item.endVal}`}>
                                    {new Date(item.startVal).getHours()} - {new Date(item.endVal).getHours()}
                                </option>
                            )}
                        </select>
                    </label>):
                        null}
                </Dialog>
            </div>
        );
    }
}

//
//
//
//
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
