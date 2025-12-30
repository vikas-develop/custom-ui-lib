import React, { useState } from 'react';

export const RangeCalendar = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  className = '',
  ...props
}) => {
  const [startDate, setStartDate] = useState(value?.start ? new Date(value.start) : null);
  const [endDate, setEndDate] = useState(value?.end ? new Date(value.end) : null);
  const [currentMonth, setCurrentMonth] = useState(startDate || new Date());
  const [view, setView] = useState('month');

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const isDateDisabled = (date) => {
    if (disabled) return true;
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date) => {
    return isSameDay(date, today);
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isStartDate = (date) => {
    return startDate && isSameDay(date, startDate);
  };

  const isEndDate = (date) => {
    return endDate && isSameDay(date, endDate);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    if (isDateDisabled(clickedDate)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      if (onChange) onChange({ start: clickedDate, end: null });
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
        if (onChange) onChange({ start: clickedDate, end: startDate });
      } else {
        setEndDate(clickedDate);
        if (onChange) onChange({ start: startDate, end: clickedDate });
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarStyle = {
    width: '100%',
    maxWidth: '350px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    ...props.style,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const navButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px 8px',
    color: '#007bff',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const monthYearStyle = {
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
  };

  const weekdaysStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    marginBottom: '8px',
  };

  const weekdayStyle = {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    padding: '8px 0',
  };

  const daysGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  };

  const dayStyle = (day) => {
    const date = new Date(year, month, day);
    const disabled = isDateDisabled(date);
    const inRange = isInRange(date);
    const isStart = isStartDate(date);
    const isEnd = isEndDate(date);
    const today = isToday(date);

    return {
      padding: '8px',
      textAlign: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: isStart || isEnd ? '#007bff' : inRange ? '#e3f2fd' : today ? '#f0f0f0' : 'transparent',
      color: isStart || isEnd ? '#fff' : disabled ? '#ccc' : '#333',
      fontWeight: isStart || isEnd || today ? '600' : '400',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s',
    };
  };

  const emptyDayStyle = {
    padding: '8px',
  };

  return (
    <div style={calendarStyle} className={className} {...props}>
      <div style={headerStyle}>
        <button
          type="button"
          onClick={handlePrevMonth}
          style={navButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          ‹
        </button>
        <div
          style={monthYearStyle}
          onClick={() => setView(view === 'month' ? 'year' : 'month')}
        >
          {view === 'month' ? `${monthNames[month]} ${year}` : year}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          style={navButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          ›
        </button>
      </div>

      {view === 'month' && (
        <>
          <div style={weekdaysStyle}>
            {dayNames.map((day) => (
              <div key={day} style={weekdayStyle}>
                {day}
              </div>
            ))}
          </div>
          <div style={daysGridStyle}>
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} style={emptyDayStyle} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                style={dayStyle(day)}
                onClick={() => handleDateClick(day)}
                onMouseEnter={(e) => {
                  const date = new Date(year, month, day);
                  if (!isDateDisabled(date) && !isInRange(date) && !isStartDate(date) && !isEndDate(date)) {
                    e.target.style.backgroundColor = '#f0f0f0';
                  }
                }}
                onMouseLeave={(e) => {
                  const date = new Date(year, month, day);
                  if (!isInRange(date) && !isStartDate(date) && !isEndDate(date)) {
                    e.target.style.backgroundColor = isToday(date) ? '#f0f0f0' : 'transparent';
                  }
                }}
              >
                {day}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

