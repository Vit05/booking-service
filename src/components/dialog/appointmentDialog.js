import React, {Component} from "react";
import nextId from "react-id-generator";
import Dialog from "@material-ui/core/Dialog";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import DialogContent from "@material-ui/core/DialogContent";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {getAppointmentsFreeTime} from "../../utils/appointments_time";
import {
    eventAddedToCalendar,
} from "../../actions";
import {connect} from "react-redux";
import {allServices} from "../../utils/services-list";

/*
const services = [
    {
        value: "hair_cut",
        text: "Стрижка",
        time: 2
    },
    {
        value: "make_up",
        text: "Make up",
        time: 2
    },
    {
        value: "manicure",
        text: "Маникюр",
        time: 5
    },
    {
        value: "eyebrowe",
        text: "Брови",
        time: 1
    },
    {
        value: "hair_color",
        text: "Окрашивание волос",
        time: 6
    },
]
*/

class AppointmentDialog extends Component {
    state = {
        start: '',
        title: '',
        desc: {
            value: '',
            text: '',
            time: ''
        },
        timeEvent: '',
        freeTimes: []
    }

    getSelectedDay = (val) => {
        return new Date(val.getFullYear(), val.getMonth(), val.getDate(), 0, 0, 0).valueOf()
    }

    handleTimeEventChange = (event) => {
        const val = event.target.value.split("_")
        const startEventTime = Number(val[0])
        const endEventTime = Number(val[1])

        this.setState({
            timeEvent: event.target.value,
            start: new Date(startEventTime),
            end: new Date(endEventTime)
        })
    };

    setNewAppointment = () => {
        const {start, end, title, desc, startVal, endVal, timeEvent} = this.state;
        const {onCloseAction} = this.props
        const id = nextId()
        const curDay = this.getSelectedDay(start)
        let appointment = {id, title, start, end, desc, curDay, startVal, endVal, timeEvent};
        this.props.onAddedToCalendar(appointment)

        this.setState({
            start: '',
            title: '',
            desc: {
                value: '',
                text: '',
                time: ''
            },
            timeEvent: '',
            freeTimes: []
        })
        onCloseAction()
    }

    handleTitle(e) {
        this.setState({title: e});
    }

    handleService(e) {
        const currentDay = this.props.curDay
        const serviceOption = allServices.find((item) => item.value === e)

        const freeOptions = getAppointmentsFreeTime(this.props.daySchedule, serviceOption.time)
        this.setState({
            desc: {
                value: e,
                text: serviceOption.text,
                time: serviceOption.time
            },
            freeTimes: freeOptions
        });

    }


    componentDidMount() {

        this.setState({
            start: '',
            title: '',
            desc: {
                value: '',
                text: '',
                time: ''
            },
            timeEvent: '',
            freeTimes: []
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.data.openSlot !== prevProps.data.openSlot){
            this.setState({
                start: '',
                title: '',
                desc: {
                    value: '',
                    text: '',
                    time: ''
                },
                timeEvent: '',
                freeTimes: []
            })
        }
    }

    render() {
        const {data} = this.props
        const {freeTimes} = this.state
const services = allServices.map((item)=><MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>)
        const appointmentActions = <DialogActions>
            <Button onClick={this.props.onCloseAction}>Закрыть</Button>
            <Button type="submit">Записать</Button>
        </DialogActions>;

        return (
            <Dialog
                open={data.openSlot}
                onClose={this.props.onCloseAction}>
                <ValidatorForm
                    ref="form"
                    onSubmit={() => this.setNewAppointment()}>
                    <DialogTitle onClose={this.props.onCloseAction}>
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
                                onChange={(e) => this.handleService(e.target.value)}
                                name="service"
                                select
                                value={this.state.desc.value}
                                validators={['required']}
                                errorMessages={['Это поле обязательно']}>
                                {services}
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
                                {freeTimes.map((item, key) =>
                                    <MenuItem key={key} value={`${item.startVal}_${item.endVal}`}>
                                        {moment(new Date(item.startVal)).format("LT")} - {moment(new Date(item.endVal)).format("LT")}
                                    </MenuItem>
                                )}
                            </TextValidator>
                        </FormGroup>
                    </DialogContent>

                    {appointmentActions}
                </ValidatorForm>
            </Dialog>
        )
    }
}


const mapStateToProps = ({dayEvents: {daySchedule}}) => {
    return {daySchedule}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddedToCalendar: (newEvent) => dispatch(eventAddedToCalendar(newEvent)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDialog)
