"use client";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './sleep.css';
import { PieChart } from '@mui/x-charts';
import { Box, Button, ButtonGroup, SelectChangeEvent } from "@mui/material";

interface DataItem {
  Id: number; // Adjust the type based on your actual data structure
  Date: string
  average_waterIntake: number;
  // Add other properties as needed
}

const currentUrl = window.location.href;
const urlObj = new URL(currentUrl);
let dogNum = urlObj.searchParams.get('dog')
console.log(dogNum)

  
  export default function Login() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          var http = require('http');
          
          const response = await axios.get<DataItem[]>('http://localhost:4000/averageEachDayCanineOne');
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

    const [dog, setDog] = useState<string>('');
  
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

  
  
    if (loading) return <p>Loading...</p>
    const chartData = data.map(item => ({
      name: item.Date,
      value: item.average_waterIntake
    }));
  return (
    <main>
        <div>
          <NavBar/>
          </div>
          <div> <h1> Sleep Page </h1>

          <div>
            <Box>
                <ButtonGroup variant="contained">
                  {dogOptions.map(option => (
                    <Button key={option} onClick={() => handleDogChange(option)} disabled={option === dogNum}>
                      {option}
                    </Button>
                  ))}
                </ButtonGroup>
            </Box>
            </div>
          
          <PieChart
              dataset={chartData}
              xAxis={[{ scaleType: 'band', data: data.map(item => item.Date) }]}
              series={[
                {
                  data: [
                    //{id:0, value: data.map(item => item.average_waterIntake), label: 'Sleeping'},
                    //{id:0, value: data.map(item => item.average_waterIntake), label: 'Normal'},
                    //{id:0, value: data.map(item => item.average_waterIntake), label: 'Eating'},
                    //{id:0, value: data.map(item => item.average_waterIntake), label: 'Walking'},
                  ]
                },
              ]}
              width={1000}
              height={400}
            />

          </div>
          <div>
            <Footer/>
          </div>

    </main>
  );
}
