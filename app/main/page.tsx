"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./main.css";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import Link from "next/link";
import { Box, Button, ButtonGroup } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import url from 'url'
import querystring from 'querystring'
import { BarChart, PieChart } from "@mui/x-charts";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";


// interface Data {
//   average_activityLevelSteps: number; // Adjust the type accordingly
//   // Add other properties as needed
// }
interface DataItem {
  Id: number; // Adjust the type based on your actual data structure
  Date: string
  average_value_heart_rate: number;
  average_temperature: number;
  average_weight: number;
  average_breathing: number;
  average_calorieBurn: number;
  average_activityLevelSteps: number;
  average_foodIntake: number;
  average_waterIntake: number;

  DogID: string;
  AverageWalkingHours: number;
  AverageHoursSlept: number;
  AverageNormalHours:number;
  AverageEatingHours: number;

  Month_Year: string;
  totalWalkingHours: number;
  totalHoursSlept: number;
}

const currentUrl = window.location.href;
const urlObj = new URL(currentUrl);
let dogNum = urlObj.searchParams.get('dog')
let date = urlObj.searchParams.get('date')


export default function Main() {

  // const [data, setData] = useState([]);

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anotherData, setAnotherData] = useState<DataItem[]>([]);
  const [anotherLoading, setAnotherLoading] = useState(true);
  const [anotherError, setAnotherError] = useState<string | null>(null);
  const [another2Data, setAnother2Data] = useState<DataItem[]>([]);
  const [another2Loading, setAnother2Loading] = useState(true);
  const [another2Error, setAnother2Error] = useState<string | null>(null);
  const [another3Data, setAnother3Data] = useState<DataItem[]>([]);
  const [another3Loading, setAnother3Loading] = useState(true);
  const [another3Error, setAnother3Error] = useState<string | null>(null);
  const [dog, setDog] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // State to hold selected date


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:4000/average_'+dogNum);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAnotherData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:4000/BehaviourPatternActionsAverage' + dogNum);
        setAnotherData(response.data);
        setAnotherLoading(false);
      } catch (error) {
        console.error('Error fetching another data:', error);
        setAnotherError('Error fetching another data');
        setAnotherLoading(false);
      }
    };
  
    fetchAnotherData();
  }, []);

  useEffect(() => {
    const fetchAnother2Data = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:4000/MonthlyAverage' + dogNum);
        setAnother2Data(response.data);
        setAnother2Loading(false);
      } catch (error) {
        console.error('Error fetching another data:', error);
        setAnother2Error('Error fetching another data');
        setAnother2Loading(false);
      }
    };
  
    fetchAnother2Data();
  }, []);


  useEffect(() => {
    const fetchAnother3Data = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:4000/averageEachDay' + dogNum);
        setAnother3Data(response.data);
        setAnother3Loading(false);
      } catch (error) {
        console.error('Error fetching another data:', error);
        setAnother3Error('Error fetching another data');
        setAnother3Loading(false);
      }
    };
  
    fetchAnother3Data();
  }, []);
  

  const handleChange = (event: SelectChangeEvent) => {
    setDog(event.target.value);
  };

  useEffect(() => {
    if (dog !== '') {
      var url = require('url');
      const adr = new URL('http://localhost:3000/main');
      adr.searchParams.append('dog', dog);
      window.location.href = adr.toString();
    }
  }, [dog]);

  const handleDogChange = (value: string) => {
    setDog(value);
  };

  const dogOptions = ['canineone', 'caninetwo', 'caninethree'];

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date); // Update selected date state
  };

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.format('DD-MM-YYYY'); // Format date as required
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('date', formattedDate); // Set date parameter in URL
      window.location.href = newUrl.toString(); // Replace current URL with updated one
    }
  }, [selectedDate]);


  if (loading) return <p>Loading...</p>

  const chartData = data.map(item => ({
    hr: item.average_value_heart_rate,
    temp: item.average_temperature,
    wei: item.average_weight,
    breath: item.average_breathing,
    cal: item.average_calorieBurn,
    step: item.average_activityLevelSteps,
    food: item.average_foodIntake,
    water: item.average_waterIntake
  }));

  const anotherChartData = anotherData.map(item => ({
    ID: item.DogID,
    sleep: item.AverageHoursSlept,

  }));

  const anotherChart2Data = another2Data.map(item => ({
    monthYear: item.Month_Year,
    mhr: item.average_value_heart_rate,
    mtemp: item.average_temperature,
    mwei: item.average_weight,
    mbreath: item.average_breathing,
    mcal: item.average_calorieBurn,
    mstep: item.average_activityLevelSteps,
    mfood: item.average_foodIntake,
    mwater: item.average_waterIntake
  }));

  const anotherChart3Data = another3Data.map(item => ({
    Date: item.Date,
    dhr: item.average_value_heart_rate,
    dtemp: item.average_temperature,
    dwei: item.average_weight,
    dbreath: item.average_breathing,
    dcal: item.average_calorieBurn,
    dstep: item.average_activityLevelSteps,
    dfood: item.average_foodIntake,
    dwater: item.average_waterIntake,
    dwalk: item.totalWalkingHours,
    dslept: item.totalHoursSlept
  }));


  const walkingHrs = anotherData.reduce((totalWalk, item) => totalWalk + item.AverageWalkingHours, 0);
  const sleepingHrs = anotherData.reduce((totalSleep, item) => totalSleep + item.AverageHoursSlept, 0);
  const walkingToday: number = another3Data
  .filter(item => item.Date === date)
  .map(item => item.totalWalkingHours)[0] || 0;
  const sleepingToday: number = another3Data
  .filter(item => item.Date === date)
  .map(item => item.totalHoursSlept)[0] || 0;

  const walkingSeriesData = [
    { id: 0, value: (walkingToday-walkingHrs), color: '#2F7509'},
    { id: 1, value: walkingToday, color: '#49B80D'},
    { id: 2, value: (walkingHrs-walkingToday), color: '#ADADAD'},
  ];

  const sleepingSeriesData = [
    { id: 0, value: (sleepingToday-sleepingHrs), color: '#090975'},
    { id: 1, value: sleepingToday, color: '#1313C2'},
    { id: 2, value: (sleepingHrs-sleepingToday), color: '#ADADAD'},
  ];

  console.log(sleepingToday);

    const getSleepReviewMessage = (): string => {
      if (sleepingToday <= 0.9 * sleepingHrs) {
        return 'Your pet\'s sleeping activity is below average today.';
        
      } else if (sleepingToday - sleepingHrs > 0.1 * sleepingHrs) {
        return 'Your pet\'s sleeping activity is above average today.';
        
      } else {
        return 'Your pet\'s sleeping activity is within the normal range today.';
        
      }
    };

    const getWalkReviewMessage = (): string => {
      if (walkingToday <= 0.9 * walkingHrs) {
        return 'Your pet\'s walking activity is below average today.';
        
      } else if (walkingToday - walkingHrs > 0.1 * walkingHrs) {
        return 'Your pet\'s walking activity is above average today.';
        
      } else {
        return 'Your pet\'s walking activity is within the normal range today.';
        
      }
    };

    
  return (
    <main>
        <div>
          <NavBar/>
          <div className="title">
            <h1>Welcome </h1>
          
            <div>
            <Box>
                <ButtonGroup variant="contained">
                  {dogOptions.map(option => (
                    <Button key={option} onClick={() => handleDogChange(option)} disabled={option === dogNum}>
                      {option}
                    </Button>
                  ))}
                </ButtonGroup>
                <br/>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Select a date to view data"
                    format = "DD-MM-YYYY"
                    minDate= {dayjs("2021-1-1")}
                    maxDate= {dayjs("2023-12-31")}
                    onChange={handleDateChange}
                    defaultValue={dayjs(date)}
                  />
                </LocalizationProvider>
            
            </Box>
            </div>
            <h1><div style={{fontWeight: 'lighter'}}>Your pet's health at a glance</div></h1>
            
            </div>
          <div className="cards">
            <div className="card">
              Activity Level 
              <Link href={'/activity?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {data.map(item => item.average_activityLevelSteps)} steps a day</p>
              
            </div>
            <div className="card">
              Calories 
              <Link href={'/calories?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {data.map(item => item.average_calorieBurn)} calories burned a day</p>
            </div>
            <div className="card">
              Sleep 
              <Link href={'/sleep?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {anotherData.map(item => item.AverageHoursSlept)} hours a day</p>
              <p>{getWalkReviewMessage()}</p>
              <p>{getSleepReviewMessage()}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                {another3Data.length > 0 && (
                  <PieChart
                    dataset={chartData}
                    series= {[{ data: walkingSeriesData, innerRadius: 40}]}
                    width={300}
                    height={120}
                    tooltip={{ trigger: 'item' }}
                  />
                )}
                {another3Data.length > 0 && (
                  <PieChart
                    dataset={chartData}
                    series= {[{ data: sleepingSeriesData, innerRadius: 40}]}
                    width={300}
                    height={120}
                    tooltip={{ trigger: 'item' }}
                  />
                )}
              </div>
            </div>
            <div className="card">
              Water Intake 
              <Link href={'/water?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {data.map(item => item.average_waterIntake)} ml a day</p>
            </div>
            <div className="card">
              Heart Rate 
              <Link href={'/heart?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {data.map(item => item.average_value_heart_rate)} beats per minute</p>
            </div>
            <div className="card">
              Breathing Rate 
              <Link href={'/breathing?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {data.map(item => item.average_breathing)} breaths per minute</p>
            </div>
            <div className="card">
              Temperature 
              <Link href={'/temperature?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {data.map(item => item.average_temperature)}°c</p>
            </div>
            <div className="card">
              Weight 
              <Link href={'/weight?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average {data.map(item => item.average_weight)}kg</p>
            </div>
            <div className="card">
              Extra card 
              <Link href={'/activity?dog='+dogNum}><div className="viewmore">View more {">"}</div></Link>
            </div>
          </div>
          <br />
        </div>
        <Footer/>
    </main>
  );
}