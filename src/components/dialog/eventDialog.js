import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {
    eventRemoveFromCalendar,
    eventUpdateFromCalendar,
} from "../../actions";
import {connect} from "react-redux";
import moment from "moment";

class EventDialog extends Component {
    state = {
        desc: {
            value: '',
        },
        timeEvent: '',
        start: '',
        end: '',
        startVal: '',
        endVal: ''
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
        console.log(this.state);
    };

    deleteEvent() {
        this.props.onDeletedFromCalendar(this.props.data.id)
        this.props.onCloseAction()
    }

    getSelectedDay = (val) => {
        return new Date(val.getFullYear(), val.getMonth(), val.getDate(), 0, 0, 0).valueOf()
    }

    updateEvent() {
        const {onCloseAction} = this.props
        const {start, end, timeEvent} = this.state
        const {id} = this.props.data;
        const curDay = this.getSelectedDay(start)
        let startVal = start.valueOf()
        let endVal = end.valueOf()
        let appointment = {id, start, end, startVal, endVal, timeEvent, curDay};
        this.props.onUpdateFromCalendar(appointment)
        onCloseAction()
    }

    componentDidMount() {
        this.setState({
            start: '',
            timeEvent: '',
            freeTimes: []
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.data.openEvent !== prevProps.data.openEvent) {
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
        const {data, onCloseAction} = this.props
        /* const eventActions = dayNow ? <DialogActions>
                 <Button onClick={this.handleClose}>Отмена</Button>
                 <Button onClick={() => this.deleteEvent()}>Удалить</Button>
                 <Button onClick={() => this.updateEvent()}>Редактировать</Button>
             </DialogActions> :
             <DialogActions>
                 <Button onClick={this.handleClose}>Закрыть</Button>
             </DialogActions>;*/
        const eventActions = <DialogActions>
            <Button onClick={onCloseAction}>Отмена</Button>
            <Button onClick={() => this.deleteEvent()}>Удалить</Button>
            <Button type="submit">Редактировать</Button>
        </DialogActions>;
        return (
            <Dialog
                open={data.openEvent}
                onClose={onCloseAction}>
                <ValidatorForm
                    ref="form"
                    onSubmit={() => this.updateEvent()}>
                    <DialogTitle onClose={onCloseAction}>
                        {`Просмотр/перенос услуги`}
                    </DialogTitle>
                    <DialogContent dividers>
                        <FormGroup>
                            <TextValidator
                                label="Ф.И.О."
                                disabled
                                onChange={(e) => this.handleTitle(e.target.value)}
                                name="full_name"
                                value={data.title}
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
                                disabled
                                value={data.desc.value}
                                validators={['required']}
                                errorMessages={['Это поле обязательно']}>
                                <MenuItem value="hair_cut">Стрижка</MenuItem>
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
                                validators={['required']}
                                errorMessages={['Это поле обязательно']}>
                                {data.freeTimes.map((item, key) =>
                                    <MenuItem key={key} value={`${item.startVal}_${item.endVal}`}>
                                        {moment(new Date(item.startVal)).format("LT")} - {moment(new Date(item.endVal)).format("LT")}
                                    </MenuItem>
                                )}
                            </TextValidator>
                        </FormGroup>
                    </DialogContent>

                    {eventActions}
                </ValidatorForm>
            </Dialog>
        );
    }
}

const mapStateToProps = ({dayEvents: {daySchedule}}) => {
    return {daySchedule}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateFromCalendar: (updateEvent) => dispatch(eventUpdateFromCalendar(updateEvent)),
        onDeletedFromCalendar: (eventId) => dispatch(eventRemoveFromCalendar(eventId)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDialog)
