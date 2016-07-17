import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Popup from './Popup' ;
import { Link } from 'react-router';
import Main from './Main';
import * as Actions from '../actions/actionCreators';
import DateTimeField from 'react-bootstrap-datetimepicker';

// Need to add an import for the location of the dates/events themselves
// import events from './events'
// See below for format of each event
/*
{
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
}
*/

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

// Calendar: uses react big calendar api
// Each date will be clickable to show the date list. Each date will have concise info about dates on that day.

export default class Calendar extends Component {
  constructor(props){
    super(props);

    this.state = { 
      current: "",
      open: false,
      events: []
    };
  }

  componentDidMount() {
    return this.getAllEvents();
  }

  componentWillReceiveProps() {
    return this.getAllEvents();
  }

  getAllEvents() {
    return Actions.getEvents()
    .then((response) => {
      console.log("RESPONSE", response);
      return this.setEvents(response.events);
    });
  }

  setEvents(events) {

    // Events won't render to calendar without start, and end time--properties on object have to be explicitly start and end
    // Also need to deal with formatting of date

    // console.log("events", events);
    // for(let i = 0; i < events.length; i++) {
    //   events[i].title = "test";
    //   events[i].start = events[i].date;
    //   events[i].end = new Date(2016, 8, 12, 12, 30, 0, 0)
    // }

    this.setState({
        current: this.state.current,
        open: this.state.open,
        events: events
    });
  }

  createEvent(event) {
    // Need to make a button and modal to deal with this, but the addEvent function works perfectly

    // event.preventDefault();
    // let title = "Date with " + this.refs.name.value +  " at " + this.refs.location.value;
    // let date = this.refs.date.refs.datetimepicker.firstChild.attributes[2].nodeValue;
    // let time = this.refs.time.refs.datetimepicker.firstChild.attributes[2].nodeValue;
    // let start = moment(date + " " + time, "MM/DD/YYYY hh:mm A").toDate();

    // let newEvent = {
    //   title: title,
    //   location: this.refs.location.value || "",
    //   name: this.refs.name.value || "",
    //   notes: this.refs.notes.value || "",
    //   start: start || ""
    // };

    // return Actions.addEvent(newEvent)
    // .then(() => {
    //   return this.getAllEvents();
    // });
  }

  open(selectedEvent) {
    this.setState({
      current: selectedEvent,
      open: true,
    });
  }

  render() {
    return (
      <div>
        <BigCalendar
          selectable
          events={this.state.events}
          onSelectEvent={event => this.open(event)}
        />
        <Popup value={this.state} />
      </div>
    );
  }
}


