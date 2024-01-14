import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: 'Event 1',
      start: new Date(2022, 0, 1, 10, 0),
      end: new Date(2022, 0, 1, 12, 0),
    },
    {
      title: 'Event 2',
      start: new Date(2022, 0, 2, 14, 0),
      end: new Date(2022, 0, 2, 16, 0),
    },
    // Add more events as needed
  ];

  const calendarStyle = {
    background: 'white', // Set the background color to white
    borderRadius: '8px', // Optional: Add rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow
  };

  return (
    <div style={{ height: '500px', ...calendarStyle }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="week"
        defaultDate={new Date(2022, 0, 1)}
      />
    </div>
  );
};

export default MyCalendar;
