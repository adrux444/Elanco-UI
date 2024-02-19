"use client";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './activity.css';
import * as React from 'react';
import { BarChart } from '@mui/x-charts';

export default function Login() {
  return (
    <main>
        <div>
          <NavBar/>
          </div>
          <div> <h1> Activity Page </h1>
          
          <BarChart
              xAxis={[{ scaleType: 'band', data: ['Canine 1', 'Canine 2', 'Canine 3'] }]}
              series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
              width={500}
              height={300}
            />
          
          </div>
          <div>
            <Footer/>
          </div>

    </main>
  );
}
