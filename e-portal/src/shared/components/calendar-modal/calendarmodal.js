import React, { Component } from 'react';
//import { connect } from "react-redux"
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
// import Select from 'react-select';
import Joi from 'joi-browser';
import Input from './helper/input';
import TextArea from './helper/textArea';
import SelectCustom from "./helper/select";
//import { getNotification } from './calendarAction';
import { saveChatNotificationDetails } from '../../../database/dal/firebase/chatNotificationDal';
import './calendar.css';

class CalendarModal extends Component {
  state = {
    data: { datetime: '', duration: '', message: '' },
    errors: {}
  };
  componentDidMount() {

    const loggedInUSer = JSON.parse(localStorage.getItem('user'));
    console.log(loggedInUSer);
  }

  schema = {
    datetime: Joi.allow('').allow(null)
      .label('Date Time'),
    duration: Joi.string()
      .required()
      .label('Duration'),
    message: Joi.string()
      .required()
      .label('Message')
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  randomString(length) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  validateCalendar = () => {
    const errors = {};
    const dateField = "datetime";
    const { datetime } = { ...this.state.data };


    if (!datetime) {
      delete errors[dateField];
      errors[dateField] = "Date and Time can not be blank.";
    } else {
      if (datetime < Date.now()) {
        delete errors[dateField];
        errors[dateField] = "Selected date should be of future date.";
      }
    }
    return errors;
  }

  handleSubmit = e => {

    const randomString = this.randomString(20);
    e.preventDefault();

    const validateErrors = this.validate();
    const calendarError = this.validateCalendar();

    const errors = { ...validateErrors, ...calendarError }

    this.setState({ errors: errors || {} });
    if (Object.keys(errors).length !== 0) {
      return
    }
    //if (errors) return;

    const { data } = this.state;

    //console.log(new Date(data.datetime).toUTCString())
    //const scheduledDate = new Date(data.datetime).toUTCString();
    //const myDate = new Date(1000 * data.datetime);

    //console.log(myDate.toUTCString());
    const createdAt = new Date();
    const loggedInUSer = JSON.parse(localStorage.getItem('user'));
    console.log("loggedInUSer => ", loggedInUSer);
    console.log("this.props.teacherData.userId => ", this.props.teacherData.userId)
    console.log("randomString", randomString)
    if (loggedInUSer) {
      const chatNotificationDetails = {
        nId: randomString,
        charge: '3$',
        createdAt,
        details: data.message,
        paymentStatus: false,
        reschedule: true,
        sId: loggedInUSer.user.uid,
        sStatus: true,
        tId: this.props.teacherData.userId,
        tStatus: true,
        status: -1,
        deleted: false,
        reqForReSchedule: false,
        // reschedule: false,
        comment: [
          {
            by: loggedInUSer.user.uid,
            date: createdAt,
            details: data.message
          }
        ],
        scheduleDate: data.datetime,
        duration: data.duration
      };
      saveChatNotificationDetails({
        ...chatNotificationDetails
      });
      //this.props.history.push('/dashboard');
      //model close display message success or failure
    }
    this.props.closeCalendarModal();
  };

  handleChange = ({ currentTarget: input }) => {

    if (input) {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];

      const data = { ...this.state.data };
      data[input.name] = input.value;

      this.setState({ data, errors });
    }

  };



  handleChange1 = (obj) => {

    const dateField = "datetime";
    const data = { ...this.state.data };
    //data[dateField] = new Date(obj).toISOString();
    console.log(obj._d);
    data[dateField] = Date.parse(obj._d);

    this.setState({ data });


  };

  onCloseModal = () => {
    this.props.closeCalendarModal();
  };

  render() {
    const { firstName, lastName } = this.props.teacherData;

    const openModal = this.props.modalState;
    return (
      <div>
        <Modal
          open={openModal}
          onClose={this.onCloseModal}
          classNames={{ modal: this.props.classes }}
        >
          <form onSubmit={this.handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                />
                <h4 className="modal-title" id="myModalLabel">
                  Send Chat Notification to {firstName} {lastName}{' '}
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 ">Pick Date and Time</div>
                  <div className="col-md-6">Select a duration</div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Datetime
                      value={this.state.datetime}
                      onChange={this.handleChange1}
                      inputProps={{ placeholder: 'Please choose date and time', name: 'datetime', id: 'datetime', className: 'form-control', readOnly: true }}

                    />
                    <div className="c-error">{this.state.errors.datetime}</div>
                    {/* <Input
                      value={this.state.datetime}
                      onChangeHandle={this.handleChange}
                      name="datetime"
                      className="form-control"
                      errorMessage={this.state.errors.datetime}
                      placeHolder="04/20/2019 12:00 AM"
                    /> */}
                  </div>
                  <div className="col-md-6">
                    <SelectCustom
                      value={this.state.duration}
                      onChangeHandle={this.handleChange}
                      name="duration"
                      className="form-control"
                      errorMessage={this.state.errors.duration}
                      placeHolder="Duration"></SelectCustom>


                    {/* <Input
                      value={this.state.duration}
                      onChangeHandle={this.handleChange}
                      name="duration"
                      className="form-control"
                      errorMessage={this.state.errors.duration}
                      placeHolder="Duration"
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">Message</div>
                  <div className="col-md-12">
                    <TextArea
                      value={this.state.message}
                      onChangeHandle={this.handleChange}
                      name="message"
                      className="form-control"
                      errorMessage={this.state.errors.message}
                      placeHolder="Message"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  data-dismiss="modal"
                >
                  Request
                </button>

                <input
                  onClick={this.onCloseModal}
                  type="button"
                  className="btn btn-danger"
                  value="Cancel"
                />
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default CalendarModal;
