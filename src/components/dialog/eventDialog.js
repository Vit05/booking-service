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
import {getSelectedDay as utilGetSelectedDay} from "../../utils/getSelectedDay";

class EventDialog extends Component {
    state = {
        desc: {
            value: '',
        },
        timeEvent: '',
        start: '',
        end: '',
        startVal: '',
        endVal: '',
        isEdit: ""
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

    deleteEvent() {
        let isDelete = confirm("Удалить Запись?");
        if (!isDelete) {
            this.props.onCloseAction()
        } else {
            this.props.onDeletedFromCalendar(this.props.data.id)
            this.props.onCloseAction()
        }
    }

    updateEvent() {
        const {onCloseAction} = this.props
        const {start, end, timeEvent} = this.state
        const {id} = this.props.data;
        const curDay = utilGetSelectedDay(start)
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
        const eventActions = data.isView ? <DialogActions>
                <Button onClick={onCloseAction}>Отмена</Button>
                <Button onClick={() => this.deleteEvent()}>Удалить</Button>
                <Button type="submit">Редактировать</Button>
            </DialogActions> :
            <DialogActions>
                <Button onClick={onCloseAction}>Закрыть</Button>
            </DialogActions>;
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={data.openEvent}
                onClose={onCloseAction}>
                <ValidatorForm
                    ref="form"
                    onSubmit={() => this.updateEvent()}>
                    <DialogTitle onClose={onCloseAction}>
                        {data.isView? `Просмотр/перенос услуги`: `Просмотр`}
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

                                <MenuItem value={data.desc.value}>{data.desc.text}</MenuItem>

                            </TextValidator>
                        </FormGroup>
                        <FormGroup>
                            <TextValidator
                                label="Время"
                                value={!data.isView? data.timeEvent : this.state.timeEvent}
                                onChange={this.handleTimeEventChange}
                                name="time"
                                select
                                autoFocus
                                disabled={!data.isView? true: false}
                                validators={['required']}
                                errorMessages={['Это поле обязательно']}>
                                {!data.isView ? <MenuItem value={`${data.startVal}_${data.endVal}`} selected="true">
                                        {moment(new Date(data.startVal)).format("LT")} - {moment(new Date(data.endVal)).format("LT")}
                                    </MenuItem>
                                    : data.freeTimes.map((item, key) =>
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
