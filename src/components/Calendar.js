import React, {Component} from "react";
import {withEventBookingService} from "./hoc";
import Spinner from "./spinner";
import ErrorIndicator from "./error-indicator";
import {connect} from "react-redux"
import BigCalendar from "react-big-calendar";
import moment from "moment";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import TimePicker from "material-ui/TimePicker";
import {fetchEvents} from '../actions'

require("react-big-calendar/lib/css/react-big-calendar.css");



BigCalendar.momentLocalizer(moment);

//Calendar app
class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            start: "",
            end: "",
            desc: "",
            openSlot: false,
            openEvent: false,
            clickedEvent: {}
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        // this.getCachedEvents();
        console.log("Events",this.props.fetchEvents());

    }

    getCachedEvents() {
        const cachedEvents = localStorage.getItem("cachedEvents");
        console.log("Cached Events", JSON.parse(cachedEvents));
        if (cachedEvents) {
            this.setState({events: JSON.parse(cachedEvents)})
        }
        return;
    }

    //closes modals
    handleClose() {
        this.setState({openEvent: false, openSlot: false});
    }

    //  Allows user to click on calendar slot and handles if appointment exists
    handleSlotSelected(slotInfo) {
        console.log("Real slotInfo START", slotInfo.start);
        console.log("Real slotInfo END", typeof slotInfo.end);
        console.log("Real slotInfo", slotInfo);
        this.setState({
            title: "",
            desc: "",
            start: slotInfo.start,
            end: slotInfo.end,
            openSlot: true
        });
    }

    handleEventSelected(event) {
        console.log("event", event);
        this.setState({
            openEvent: true,
            clickedEvent: event,
            start: event.start,
            end: event.end,
            title: event.title,
            desc: event.desc
        });
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

    // Onclick callback function that pushes new appointment into events array.
    setNewAppointment() {
        const {start, end, title, desc} = this.state;
        let appointment = {title, start, end, desc};
        let events = this.state.events.slice();
        events.push(appointment);
        // localStorage.setItem("cachedEvents", JSON.stringify(events));
        console.log(events);
        this.setState({events});
        this.handleClose()
    }

    //  Updates Existing Appointments Title and/or Description
    updateEvent() {
        const {title, desc, start, end, events, clickedEvent} = this.state;
        const index = events.findIndex(event => event === clickedEvent);
        const updatedEvent = events.slice();
        updatedEvent[index].title = title;
        updatedEvent[index].desc = desc;
        updatedEvent[index].start = start;
        updatedEvent[index].end = end;
        // localStorage.setItem("cachedEvents", JSON.stringify(updatedEvent));
        this.setState({
            events: updatedEvent
        });
        this.handleClose()
    }

    //  filters out specific event that is to be deleted and set that variable to state
    deleteEvent() {
        let updatedEvents = this.state.events.filter(
            event => event["start"] !== this.state.start
        );
        localStorage.setItem("cachedEvents", JSON.stringify(updatedEvents));
        this.setState({events: updatedEvents});
        this.handleClose()
    }

    render() {
        console.log("render()");
        console.log(this.state.events);
        const {events, loading, error} = this.props

        const eventActions = [
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
                onClick={this.handleClose}
                onClick={() => {
                    this.updateEvent();
                }}
            />
        ];
        const appointmentActions = [
            <FlatButton label="Cancel" secondary={true} onClick={this.handleClose}/>,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={() => {
                    this.setNewAppointment();
                }}
            />
        ];
        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorIndicator/>
        }
        return (
            <div id="Calendar">
                {/* react-big-calendar library utilized to render calendar*/}
                <BigCalendar
                    events={events}
                    views={["month", "week", "work_week", "day", "agenda"]}
                    timeslots={1}
                    step={60}
                    min={new Date(0, 0, 0, 10, 0, 0)}
                    max={new Date(0, 0, 0, 20, 0, 0)}
                    defaultView="week"
                    defaultDate={new Date()}
                    selectable={true}
                    onSelectEvent={event => this.handleEventSelected(event)}
                    onSelectSlot={slotInfo => this.handleSlotSelected(slotInfo)}
                />

                {/* Material-ui Modal for booking new appointment */}
                <Dialog
                    title={`Book an appointment on ${moment(this.state.start).format(
                        "MMMM Do YYYY"
                    )}`}
                    actions={appointmentActions}
                    modal={false}
                    open={this.state.openSlot}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        floatingLabelText="Title"
                        onChange={e => {
                            this.setTitle(e.target.value);
                        }}
                    />
                    <br/>
                    <TextField
                        floatingLabelText="Description"
                        onChange={e => {
                            this.setDescription(e.target.value);
                        }}
                    />
                    <TimePicker
                        format="ampm"
                        floatingLabelText="Start Time"
                        minutesStep={5}
                        value={this.state.start}
                        onChange={this.handleStartTime}
                    />
                    <TimePicker
                        format="ampm"
                        floatingLabelText="End Time"
                        minutesStep={5}
                        value={this.state.end}
                        onChange={this.handleEndTime}
                    />
                </Dialog>

                {/* Material-ui Modal for Existing Event */}
                <Dialog
                    title={`View/Edit Appointment of ${moment(this.state.start).format(
                        "MMMM Do YYYY"
                    )}`}
                    actions={eventActions}
                    modal={false}
                    open={this.state.openEvent}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        defaultValue={this.state.title}
                        floatingLabelText="Title"
                        onChange={e => {
                            this.setTitle(e.target.value);
                        }}
                    />
                    <br/>
                    <TextField
                        floatingLabelText="Description"
                        multiLine={true}
                        defaultValue={this.state.desc}
                        onChange={e => {
                            this.setDescription(e.target.value);
                        }}
                    />
                    <TimePicker
                        format="ampm"
                        floatingLabelText="Start Time"
                        minutesStep={5}
                        value={this.state.start}
                        onChange={this.handleStartTime}
                    />
                    <TimePicker
                        format="ampm"
                        floatingLabelText="End Time"
                        minutesStep={5}
                        value={this.state.end}
                        onChange={this.handleEndTime}
                    />
                </Dialog>
            </div>
        );
    }
}

//
//
//
//
const mapStateToProps = ({eventBookingList:{events, loading, error}}) => {
    return {events, loading, error}
}
const mapDispatchToProps = (dispatch, {eventBookingService}) => {
    return {
        fetchEvents: fetchEvents(eventBookingService, dispatch),
    }
}



export default withEventBookingService()(
    connect(mapStateToProps, mapDispatchToProps)(Calendar)
)
