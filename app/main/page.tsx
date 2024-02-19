"use client";
import "./main.css";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import Link from "next/link";
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from "react";
export default function Main() {
  
  const [dog] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    var url = require('url');
    const adr = new URL('http://localhost:3000/main');
    adr.searchParams.append('dog', event.target.value);
    history.pushState({
      id: 'about-me',
      source: 'web'
      }, 'home', adr)
  };
  return (
    <main>
        <div>
          <NavBar/>
          <div className="title">
            <h1>Welcome </h1>
            <div>
              <Box sx={{ maxWidth: '20%' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose Dog</InputLabel>
                <Select
                  labelId="dog-choice"
                  label="Choose Dog"
                  value={dog}
                  id='Dog'
                  onChange= {handleChange} >
                <MenuItem value={'canine1'}>Canine 1</MenuItem>
                <MenuItem value={'canine2'}>Canine 2</MenuItem>
                <MenuItem value={'canine3'}>Canine 3</MenuItem>
                </Select>
              </FormControl>
              </Box>
              </div>
              
              <h1><div style={{fontWeight: 'lighter'}}>Your pet's health at a glance</div></h1>
          </div>
          <div className="cards">
            <div className="card">
              Activity Level 
              <Link href={'/activity'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x steps a day</p>
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
              Barking
              <Link href={'/barking'}><div className="viewmore">View more {">"}</div></Link>
              <br/>
              <p>Average x frequency</p>
            </div>
          </div>
          <br />
        </div>
        <Footer/>
    </main>
  );
}