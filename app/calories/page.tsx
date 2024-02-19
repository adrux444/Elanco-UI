"use client";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './calories.css';
import * as React from 'react';
import { BarChart } from '@mui/x-charts';


export default function Login() {
  return (
    <main>
        <div>
          <NavBar/>
          </div>
          <div> <h1> Calories Page </h1>
          
            <BarChart
              series={[
                { data: [3, 4, 1, 6, 5], stack: 'A', label: 'C1 intake' },
                { data: [4, 3, 1, 5, 8], stack: 'A', label: 'C1 burned' },
                { data: [4, 2, 5, 4, 1], stack: 'B', label: 'C2 intake' },
                { data: [2, 8, 1, 3, 1], stack: 'B', label: 'C2 burned' },
                { data: [4, 2, 5, 4, 1], stack: 'C', label: 'C3 intake' },
                { data: [2, 8, 1, 3, 1], stack: 'C', label: 'C3 burned' },
              ]}
              width={600}
              height={350}
            />

          </div>
          <div>
            <Footer/>
          </div>

    </main>
  );
}
