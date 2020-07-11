import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";

import plannerReducer from './Planner.reducer';
import PageContext from '../../helpers/pageContext';

import { authHeaders } from '../../helpers/auth';
 
import './Planner.scss';

import PlannerDayCard from './PlannerDayCard';
import AlertMessage from '../_AlertMessage/AlertMessage';
import { Link } from 'react-router-dom';

export default function Planner() {
  const page = useContext(PageContext);

  const [plannerState, dispatch] = useReducer(plannerReducer, { meals: [] });

  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 6); // today + 6 days = 1 week :)

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(initialEndDate);
  const [plannerRange, setPlannerRange] = useState([]);

  useEffect(() => {
    if (!page.isLoading) page.setIsLoading(true);
    axios.get("/api/meal", authHeaders())
    .then(res => {
      const mealList = res.data.data || [];
      dispatch({
        type: 'GET_MEAL_LIST',
        payload: mealList
      })
    }).catch(err => 
      console.log('Error fetching meals', err)
    ).finally(() =>
      page.setIsLoading(false)
    )
  }, []);

  useEffect(() => {
    const newDateRange = [];
    for (let date = new Date(new Date(startDate).setHours(0,0,0,0)); date <= endDate; date.setDate(date.getDate() + 1)) {
      newDateRange.push(new Date(date));
    }
    setPlannerRange(newDateRange);
  }, [startDate,endDate]);

  return (
    <section className="planner">
      <h1>Planner</h1>
      {! page.isLoading && <>
      {! plannerState.meals.length ?
        <div className="planner--unavailable">Your planner will be available after you <Link to="/meals">add your first meal</Link>.</div>
        :
        <>
      <div className="planner__datepicker">
        <label><span>From:</span>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          todayButton="Today"
          dateFormat="dd/MM/yyyy"
        /></label>
        <label><span>To:</span>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          todayButton="Today"
          dateFormat="dd/MM/yyyy"
        /></label>
      </div>
      <div className="planner__wrapper">
        { ! plannerRange.length ?
          <AlertMessage>Something went wrong. Please try again.</AlertMessage> :
          plannerRange.map(i => <PlannerDayCard key={i.getTime()} date={i} plannerData={plannerState} />)
        }
      </div>
      </>
      }
      </>}
    </section>
  )
}