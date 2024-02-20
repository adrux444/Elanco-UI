"use client";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './water.css';
import { BarChart } from '@mui/x-charts';

interface DataItem {
    Id: number; // Adjust the type based on your actual data structure
    Date: string
    average_waterIntake: number;
    // Add other properties as needed
  }
  
    
    export default function Login() {
      const [data, setData] = useState<DataItem[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
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
          <div> <h1> Water Page </h1>
          
          <BarChart
              xAxis={[{ scaleType: 'band', data: data.map(item => item.Date) }]}
              series={[
                {
                  data: data.map(item => item.average_waterIntake),
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
