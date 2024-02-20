"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./main.css";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import Link from "next/link";
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// interface Data {
//   average_activityLevelSteps: number; // Adjust the type accordingly
//   // Add other properties as needed
// }
interface DataItem {
  Id: number; // Adjust the type based on your actual data structure
  average_activityLevelSteps: number;
  average_calorieBurn: number;
  // Add other properties as needed
}


export default function Main() {

  // const [data, setData] = useState([]);


  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:4000/average');
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

  // const [data, setData] = useState<Data | null>(null);

  // async function getData() {
  //   try {
  //     const res = await fetch(`http://localhost:4000/average`);
  //     const jsonData: Data = await res.json();
  //     console.log("Received data:", jsonData);
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  
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


  const dogLabel = dog || "Select Dog";
  
  
  // useEffect(() => {
  //   getData();
  // }, []);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/average');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);



  return (
    <main>
        <div>
          <NavBar/>
          <div className="title">
            <h1>Welcome </h1>
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
                    <MenuItem value={'canine1'}>Canine 1</MenuItem>
                    <MenuItem value={'canine2'}>Canine 2</MenuItem>
                    <MenuItem value={'canine3'}>Canine 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
              
            <h1><div style={{fontWeight: 'lighter'}}>Your pet's health at a glance</div></h1>

            {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {data.map((item) => (
                <li key={item.Id}>{item.average_activityLevelSteps}, {item.average_calorieBurn}</li>
              ))}
            </ul>



//                 <li key={item.Id}>{item.average_calorieBurn}</li>

          )}

          </div>
          <div className="cards">
            <div className="card">
              Activity Level 
              <Link href={'/activity'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              {/* {data && (
        <p>Average {data.average_activityLevelSteps} steps a day</p>
      )} */}
            </div>
            <div className="card">
              Calories 
              <Link href={'/calories'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x calories burned a day</p>
            </div>
            <div className="card">
              Sleep 
              <Link href={'/sleep'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x hours a day</p>
            </div>
            <div className="card">
              Water Intake 
              <Link href={'/water'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x ml a day</p>
            </div>
            <div className="card">
              Heart Rate 
              <Link href={'/heart'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x beats per minute</p>
            </div>
            <div className="card">
              Breathing Rate 
              <Link href={'/breathing'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x breaths per minute</p>
            </div>
            <div className="card">
              Temperature 
              <Link href={'/temp'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x°c</p>
            </div>
            <div className="card">
              Weight 
              <Link href={'/weight'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average xkg</p>
            </div>
            <div className="card">
              Extra card 
              <Link href={'/activity'}><div className="viewmore">View more {">"}</div></Link>
            </div>
          </div>
          <br />
        </div>
        <Footer/>
    </main>
  );
}