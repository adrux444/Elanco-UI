"use client";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './sleep.css';
import * as React from 'react';
import { PieChart } from '@mui/x-charts';

export default function Login() {
  return (
    <main>
        <div>
          <NavBar/>
          </div>
          <div> <h1> Sleep Page </h1>
          
            <PieChart
              series={[{
                data: [
                { id: 0, value: 10, label: 'Sleeping' },
                { id: 1, value: 15, label: 'Normal' },
                { id: 2, value: 20, label: 'Eating' },
                { id: 2, value: 20, label: 'Walking' },
                ],
              },]}
              width={400}
              height={200}
            />
          
          </div>
          <div>
            <Footer/>
          </div>

    </main>
  );
}
