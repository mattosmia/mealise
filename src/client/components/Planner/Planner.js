import React, { useState } from 'react';
import DatePicker from "react-datepicker";
 
import './DatePicker.scss';
import './Planner.scss';

export default function Planner() {
  const date = new Date();
  
  const [startDate, setStartDate] = useState(date);
  
  const handleDateChange = date => {
    setStartDate(date);
  };

  return (
    <section className="planner">
      <h1>Planner</h1>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={handleDateChange}
      />
      <div className="planner__wrapper">
        
      </div>
    </section>
  )
}