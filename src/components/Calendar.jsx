import React, { useState } from 'react';

export const Calendar = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  className = '',
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  const [view, setView] = useState('month'); // 'month' or 'year'

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
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date) => {
    return isSameDay(date, today);
  };

  const isSelected = (date) => {
    return value && isSameDay(date, new Date(value));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(year, month, day);
    if (!isDateDisabled(newDate)) {
      setSelectedDate(newDate);
      if (onChange) onChange(newDate);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentMonth(new Date(year - 1, month, 1));
  };

  const handleNextYear = () => {
    setCurrentMonth(new Date(year + 1, month, 1));
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
    transition: 'background-color 0.2s',
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
    const selected = isSelected(date);
    const today = isToday(date);

    return {
      padding: '8px',
      textAlign: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: selected ? '#007bff' : today ? '#e3f2fd' : 'transparent',
      color: selected ? '#fff' : disabled ? '#ccc' : today ? '#007bff' : '#333',
      fontWeight: selected || today ? '600' : '400',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s',
      border: today && !selected ? '1px solid #007bff' : '1px solid transparent',
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
          onClick={view === 'month' ? handlePrevMonth : handlePrevYear}
          style={navButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          ‹
        </button>
        <div
          style={monthYearStyle}
          onClick={() => setView(view === 'month' ? 'year' : 'month')}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          {view === 'month' ? `${monthNames[month]} ${year}` : year}
        </div>
        <button
          type="button"
          onClick={view === 'month' ? handleNextMonth : handleNextYear}
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
                  if (!isDateDisabled(new Date(year, month, day)) && !isSelected(new Date(year, month, day))) {
                    e.target.style.backgroundColor = '#f0f0f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected(new Date(year, month, day))) {
                    e.target.style.backgroundColor = isToday(new Date(year, month, day)) ? '#e3f2fd' : 'transparent';
                  }
                }}
              >
                {day}
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'year' && (
        <div style={daysGridStyle}>
          {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) => (
            <div
              key={monthIndex}
              style={{
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: monthIndex === month ? '#007bff' : 'transparent',
                color: monthIndex === month ? '#fff' : '#333',
                transition: 'all 0.2s',
              }}
              onClick={() => {
                setCurrentMonth(new Date(year, monthIndex, 1));
                setView('month');
              }}
              onMouseEnter={(e) => {
                if (monthIndex !== month) {
                  e.target.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (monthIndex !== month) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {monthNames[monthIndex].substring(0, 3)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
