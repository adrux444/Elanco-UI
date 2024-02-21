"use client";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './calories.css';
import { BarChart } from '@mui/x-charts';
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import url from 'url'
import querystring from 'querystring'
interface DataItem {
  Id: number; // Adjust the type based on your actual data structure
  Date: string
  average_calorieBurn: number;
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
        const response = await axios.get<DataItem[]>('http://localhost:4000/averageEachDay'+dogNum);
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
      const adr = new URL('http://localhost:3000/calories');
      adr.searchParams.append('dog', dog);
      window.location.href = adr.toString();
    }
  }, [dog]);


  const dogLabel = dog || "Select Dog";

  if (loading) return <p>Loading...</p>
  
  const chartData = data.map(item => ({
    name: item.Date,
    value: item.average_calorieBurn
  }));

  return (
    <main>
        <div>
          <NavBar/>
          </div>
          <div> <h1> Calories Page </h1>
          <div>
            <Box sx={{ maxWidth: '20%' }}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{dogLabel}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dogLabel}
                    label="Dog"
                    onChange={handleChange}
                  >
                    <MenuItem value={'canineone'}>Canine 1</MenuItem>
                    <MenuItem value={'caninetwo'}>Canine 2</MenuItem>
                    <MenuItem value={'caninethree'}>Canine 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          <BarChart
              xAxis={[{ scaleType: 'band', data: data.map(item => item.Date) }]}
              series={[
                {
                  data: data.map(item => item.average_calorieBurn),
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