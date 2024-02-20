"use client";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './activity.css';
import { BarChart } from '@mui/x-charts';
interface DataItem {
  Id: number; // Adjust the type based on your actual data structure
  average_activityLevelSteps: number;
  average_calorieBurn: number;
  // Add other properties as needed
}
export default function Login() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState();

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

  if (loading) return <p>Loading...</p>
  

  return (
    <main>
        <div>
          <NavBar/>
          </div>
          <div> <h1> Activity Page </h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {data.map((item) => (
                <li key={item.Id}>
                  {item.average_activityLevelSteps}, {item.average_calorieBurn}
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Canine 1', 'Canine 2', 'Canine 3'] }]}
                    series={[
                      { data: [item.average_activityLevelSteps, 3, 5] },
                      { data: [1, 6, 3] },
                      { data: [2, 5, 6] }
                    ]}
                    width={500}
                    height={300}
                  />
                </li>
))}
              
            </ul>

            
          )}
          
          
          
          
          </div>
          <div>
            <Footer/>
          </div>

    </main>
  );
}
