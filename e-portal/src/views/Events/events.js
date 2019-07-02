import React, { Component } from "react"
import { connect } from 'react-redux';
import "./eventstyle.css"

// import { EVENT_CONSTANT } from '../../constant/Event-Constant'
import ModalPopUp from '../../shared/components/modalpopup/modalpopup';
import DateTimePicker from 'react-datetime-picker';
import { saveEventDetails } from '../../database/dal/firebase/eventDal'
import { openModalPopUp, getStudentList, /* addStudent */ } from './eventAction';
// import TimePicker from 'react-bootstrap-time-picker';
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customEndDate: new Date(),
      customStartDate: new Date(),
      hideStartCalender: false,
      hideEndCalender: false,
      endDateCalender: false,
      taggedStudentsNames: [],
      startDate: new Date(),
      endDate: (new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()),
      fields: {},
      errors: {},
      errorDate: '',
      emptydate: ''

    }
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.clearEventForm = this.clearEventForm.bind(this);
  }

  componentDidMount() {
    this.props.getStudentList();

  }
  onChangeDate = date => {
    console.log('date', date);
  }


  toggleStartCalender = () => {
    const startDateToggle = this.state.hideStartCalender;
    this.setState({
      hideStartCalender: !startDateToggle
    })
  }

  toggleEndCalender = () => {
    const startDateToggle = this.state.hideStartCalender;
    this.setState({
      hideStartCalender: !startDateToggle
    })
  }


  toggleEndCalender = () => {
    const startDateToggle = this.state.hideEndCalender;
    this.setState({
      hideEndCalender: !startDateToggle
    })
  }
  allDayEvent = (event) => {
    if (event.target.checked) {
      this.setState({
        endDateCalender: true
      })
    }
    else {
      this.setState({
        endDateCalender: false
      })
    }

  }

  goBackToDashboard = () => {
    this.props.history.goBack();
  }

  openModal = () => {
    this.props.openModalPopUp();
  }

  onChangeStartDate = (date) => {
    const startDateToggle = this.state.hideStartCalender;
    this.setState({
      hideStartCalender: !startDateToggle
    })
  }

  onChangeEndDate = () => {
    const startDateToggle = this.state.hideEndCalender;
    this.setState({
      hideEndCalender: !startDateToggle
    })
  }
  onSaveStudentsList = (studentList) => {
    console.log('studentList', studentList);
  }

  onStartDateChange = (startdate) => {
    console.log('start date', startdate);
    this.setState({
      customStartDate: startdate
    })
    console.log('this.state', this.state.customStartDate);
  }
  getStudentList = (studentList) => {
    this.setState({
      taggedStudentsNames: studentList
    })
  }

  onEndDateChange = (event) => {

    this.setState({
      customEndDate: event
    })
  }

  /// form validation 
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Event Name 
    if (!fields["eventName"]) {
      errors["eventName"] = "Event Name Cannot be empty";
      formIsValid = false
    }

    //Event Name 
    if (!fields["location"]) {
      errors["location"] = "Location can not be empty";
      formIsValid = false
    }

    if (!fields["EventDescription"]) {
      errors["EventDescription"] = "EventDescription Can not be empty";
      formIsValid = false
    }

    if (this.state.taggedStudentsNames && this.state.taggedStudentsNames.length === 0) {
      errors["studentTagged"] = "Please Tagged atleast one student for event";
      formIsValid = false
    }
    if (errors) {
      this.setState({
        errors: errors
      })
    }
    return formIsValid;
  }


  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }



  contactSubmit(e) {
    e.preventDefault();
    let validationMessage = true
    if (this.state.customEndDate === null || this.state.customStartDate === null) {
      this.setState({
        emptydate: "End Date or Start date can not be empty"
      })
      validationMessage = false;
    }
    if (this.state.customEndDate < this.state.customStartDate) {
      this.setState({
        errorDate: "End Date can not be less than start date"
      })
      validationMessage = false;
    }
    else {
      this.setState({
        errorDate: ""
      })
    }
    if (this.handleValidation() && validationMessage) {
      const eventCreatedDate = new Date();
      const loggedInUSer = JSON.parse(localStorage.getItem('user'));
      if (loggedInUSer) {
        const eventDetails = {
          userId : loggedInUSer.user.uid,
          eventCreatedDate,
          eventName: this.state.fields.eventName,
          eventLocation: this.state.fields.location,
          eventDescription: this.state.fields.EventDescription,
          eventStartDate: this.state.customStartDate,
          eventEndDate: this.state.customEndDate,
          AllDayEvent: false,
          Students: this.state.taggedStudentsNames
        }
        saveEventDetails({
          ...eventDetails
        })
        this.props.history.push('/dashboard');
      }
    } else {
      alert("Form has errors.")
    }
  }

  clearEventForm = () => {
    this.setState({
      taggedStudentsNames: [],
      customEndDate: '',
      customStartDate: ''
    })

    document.getElementById("create-event-form").reset();
  }
  render() {
    let style = {}
    this.state.endDateCalender ? style = { 'display': 'none' } : style = {}
    return (

      <div className="wrapper">
        <ModalPopUp onSaveStudentsList={this.getStudentList} taggedStudentFromEvent={this.state.taggedStudentsNames} ></ModalPopUp>
        <div className="row">
          <div className="back-to-dashborad" onClick={this.goBackToDashboard}><i className="fa fa-angle-left left-arrow-icon"></i><span>Back To Dashboard</span></div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <h1>Create Event</h1>
            <form onSubmit={this.contactSubmit.bind(this)} className="form-group event-form" id="create-event-form">
              <div className="form-group">
                <label className="event-form-label">Event Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange.bind(this, "eventName")} />
                <span style={{ color: "red" }}>{this.state.errors["eventName"]}</span>
              </div>
              <div className="form-group">
                <label className="event-form-label" >Location</label>
                <input type="text" className="form-control" onChange={this.handleChange.bind(this, "location")} />
                <span style={{ color: "red" }}>{this.state.errors["location"]}</span>
              </div>
              <div className="form-group">
                <label className="event-form-label">Event Description:</label>
                <textarea rows="4" cols="50" className="form-control" onChange={this.handleChange.bind(this, "EventDescription")}></textarea>
                <span style={{ color: "red" }}>{this.state.errors["EventDescription"]}</span>
              </div>
              <div className="input-container">
                <label className="calender-label event-form-label">Students :</label>
                <input type="text" className="form-control" disabled={true} value={this.state.taggedStudentsNames} onChange={this.handleChange.bind(this, "studentTagged")} /> <i className="fa fa-search search-icon" aria-hidden="true" onClick={this.openModal}></i>
                <span style={{ color: "red" }}>{this.state.errors["studentTagged"]}</span>
              </div>
              <div className="start-end-date">
                <div className="row">
                  <div className="col-6 col-sm-12 col-md-6 col-lg-6">

                    <div className="input-container">
                      <label className="calender-label event-form-label">Start Date :</label>
                      <DateTimePicker
                        value={this.state.customStartDate}
                        onChange={this.onStartDateChange}
                      />
                    </div>
                    <div className="complete-calender">

                    </div>
                  </div>
                  <div className="col-6 col-sm-12 col-md-6 col-lg-6" disabled={this.state.endDateCalender}>

                    <div className="input-container" style={style}>
                      <label className="calender-label event-form-label">End Date :</label>
                      <DateTimePicker
                        value={this.state.customEndDate}
                        onChange={(event) => this.onEndDateChange(event)}
                      />
                    </div>

                  </div>
                </div>
                <p style={{ color: "red" }}>{this.state.errorDate}</p>
                <p style={{ color: "red" }}>{this.state.emptydate}</p>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 check-box-all-day-event">
                    <label className="margin-both event-form-label">All Day Event </label>
                    <input type="checkbox" name="checkbox" value="value" onClick={this.allDayEvent} />
                  </div>
                </div>
                <div className="form-group margin-top-bottom">
                  <input type="submit" className="btn btn-primary margin-both btn-event-save" value="Create Event" />
                  <input type="button" className="btn btn-secondary btn-event-cancel" value="Cancel" onClick={this.clearEventForm} />
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    taggedStudentName: state.event.taggedStudentNames,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    openModalPopUp: () => dispatch(openModalPopUp()),
    getStudentList: () => dispatch(getStudentList())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);