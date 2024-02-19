"use client";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './weight.css';
import * as React from 'react';
import { LineChart } from '@mui/x-charts';

export default function Login() {
  return (
    <main>
        <div>
          <NavBar/>
          </div>
          <div> <h1> Weight Page </h1>
          
          <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[{data: [2, 5.5, 2, 8.5, 1.5, 5],color: '#e15759',curve: "linear"},]}
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
